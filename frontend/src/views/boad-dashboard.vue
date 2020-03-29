<template>
  <div
    class="board-dashboard container board-details"
    v-if="board"
    :style="{background: boardStyle}"
  >
    <div class="title">
      Management Dashboard |
      <button @click="$router.push(`/board/${boardId}`)">Back to board</button>
    </div>
    <div class="charts">
      <div class="chart">
        <h4>Tasks count per lists (total and completed):</h4>
        <pai-chart v-if="loaded" :chartdata="paiChartdata"></pai-chart>
      </div>
      <div class="chart">
        <h4>Tasks status per member:</h4>
        <bar-chart v-if="loaded" :chartdata="lineChartdata" :options="options"></bar-chart>
      </div>
    </div>
  </div>
</template>

<script>
import paiChart from "../components/chart/pai-chart.vue";
import barChart from "../components/chart/bar-chart.vue";
import { utilService } from "../services/util.service.js";

export default {
  name: "PaiChartContainer",
  components: { paiChart, barChart },
  data() {
    return {
      loaded: false,
      board: null,
      boardId: null,
      paiChartdata: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: []
          },
          {
            backgroundColor: [],
            data: []
          }
        ]
      },
      lineChartdata: {
        labels: [],
        datasets: [
          {
            label: "Completed Tasks ",
            backgroundColor: [],
            data: []
          },
          {
            label: "Incompleted Tasks ",
            data: []
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
                min: 0
              }
            }
          ],
          xAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
                categoryPercentage: 0.5,
                barPercentage: 1
              }
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  computed: {
    boardStyle() {
      var style;
      if (this.board.style.color) style = this.board.style.color;
      else if (this.board.style.url)
        style = `url("${this.board.style.url}") no-repeat fixed 100%`;
      return style;
    }
  },
  async mounted() {
    (async () => {
      this.loaded = false;
      try {
        const boardId = this.$route.params.id;
        const board = await this.$store.dispatch({
          type: "loadBoard",
          boardId
        });
        this.boardId = boardId;
        this.board = board;

        let mapMembersTasks = [];
        let tasksCount = 0;
        let completedTasksCount = 0;
        board.members.forEach(member => {
          mapMembersTasks.push({
            username: member.username,
            allTasks: 0,
            doneTasks: 0
          });
        });

        board.taskLists.forEach(list => {
          this.paiChartdata.labels.push(list.name);
          this.paiChartdata.datasets[0].data.push(list.tasks.length);
          var color = utilService.getRandomColor();
          this.paiChartdata.datasets[0].backgroundColor.push(color);
          this.paiChartdata.datasets[1].backgroundColor.push(color);

          let countDoneTasks = 0;
          list.tasks.forEach(task => {
            tasksCount++;
            if (task.status.isDone) countDoneTasks++;
            if (task.members.length > 0) {
              task.members.forEach(member => {
                mapMembersTasks.forEach(mapMember => {
                  if (mapMember.username === member.username)
                    mapMember.allTasks++;
                });
                if (task.status.isDone) {
                  mapMembersTasks.forEach(mapMember => {
                    if (mapMember.username === task.status.member.username) {
                      mapMember.doneTasks++;
                      completedTasksCount++;
                    }
                  });
                }
              });
            }
          });
          this.paiChartdata.datasets[1].data.push(countDoneTasks);
        });

        const color = utilService.getRandomColor();
        mapMembersTasks.forEach(member => {
          this.lineChartdata.labels.push(member.username);
          this.lineChartdata.datasets[0].backgroundColor.push(color);

          this.lineChartdata.datasets[0].data.push(member.doneTasks);
          this.lineChartdata.datasets[1].data.push(
            member.allTasks - member.doneTasks
          );
        });
        this.lineChartdata.datasets[0].label += `(${completedTasksCount})`;
        this.lineChartdata.datasets[1].label += `(${tasksCount -
          completedTasksCount})`;

        this.loaded = true;
      } catch (e) {
        // console.error(e);
      }
    })();
  }
};
</script>