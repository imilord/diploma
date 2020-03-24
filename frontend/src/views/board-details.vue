<template>
  <section class="board-details" v-if="board">
    <board-nav
      :boardName="board.name"
      :members="board.members"
      :dueDate="board.dueDate"
      :creator="board.creator"
      @open-activitylog="toggleActivitylog"
    ></board-nav>
    <activitylog v-if="isOpenActivitylog" :activitieslog="board.activitieslog"></activitylog>
    <tasklist-list
      :taskLists="board.taskLists"
      :boardId="board._id"
      @update-board="updateLocalBoard"
      @update-lists="updateLists"
      @upadte-activitylog="upadteActivitylog"
    ></tasklist-list>
    <router-view></router-view>
  </section>
</template>

<script>
import boardNav from "../components/board-nav.vue";
import tasklistList from "../components/tasklists-list.vue";
import activitylog from '../components/activitylog.vue';
import socketService from "../services/socket.service.js";

export default {
  name: "board-details",
  data() {
    return {
      board: null,
      isTaskOpen: false,
      isDrop: true,
      isOpenActivitylog: false
    };
  },
  methods: {
    updateLocalBoard(board) {
      this.board = board;
    },
    async updateBoard() {
      const board = JSON.parse(JSON.stringify(this.board));
      await this.$store.dispatch({
        type: "updateBoard",
        board
      });
      socketService.emit(
        "update board",
        JSON.parse(JSON.stringify(this.board))
      );
    },
    updateLists(lists) {
      this.board.taskLists = lists;
      this.updateBoard();
    },
    upadteActivitylog(activitylog) {
      this.$store.commit({
        type: "updateActivitieslog",
        activitylog
      });

      this.board.activitieslog.unshift(activitylog);
      this.updateBoard();
    },
    toggleActivitylog() {
      this.isOpenActivitylog = !this.isOpenActivitylog;
    }
  },
  async created() {
    const boardId = this.$route.params.id;
    const board = await this.$store.dispatch({
      type: "loadBoard",
      boardId
    });
    this.board = JSON.parse(JSON.stringify(board));
    socketService.setup();
    socketService.emit("board topic", this.board._id);
    socketService.on("update newBoard", this.updateLocalBoard);
  },
  destroyed() {
    socketService.terminate();
    socketService.off("update newBoard", this.updateLocalBoard);
  },
  watch: {
    "$route.params": async function() {
      const boardId = this.$route.params.id;
      const board = await this.$store.dispatch({
        type: "loadBoard",
        boardId
      });
      this.board = JSON.parse(JSON.stringify(board));
      socketService.emit("board topic", boardId);
    }
  },
  components: {
    boardNav,
    tasklistList,
    activitylog
  }
};
</script>