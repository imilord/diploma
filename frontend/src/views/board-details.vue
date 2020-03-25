<template>
  <section class="board-details" v-if="board" :style="{background: boardStyle}">
    <board-nav
      :boardName="board.name"
      :members="board.members"
      :dueDate="board.dueDate"
      :creator="board.creator"
      @toggle-activitylog="toggleActivitylog"
      @toggle-settings="toggleSettings"
    ></board-nav>
    <board-settings
      v-if="isOpenBoardSetting"
      :board="board"
      @toggle-settings="toggleSettings"
      @set-bgc="setBgc"
    ></board-settings>
    <activitylog
      v-if="isOpenActivitylog"
      class="main-activitylog"
      :activitieslog="board.activitieslog"
      @close-activitylog="toggleActivitylog"
    ></activitylog>
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
import activitylog from "../components/activitylog.vue";
import boardSettings from "../components/board-settings.vue";
import socketService from "../services/socket.service.js";

export default {
  name: "board-details",
  data() {
    return {
      board: null,
      isTaskOpen: false,
      isDrop: true,
      isOpenActivitylog: false,
      isOpenBoardSetting: false
    };
  },
  computed: {
    boardStyle() {
      var style;
      if (this.board.style.color) style = this.board.style.color;
      else if (this.board.style.url)
        style = `url("${this.board.style.url}") top left/cover top left `;
      return style;
    }
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
    },
    toggleSettings() {
      this.isOpenBoardSetting = !this.isOpenBoardSetting;
    },
    setBgc(bgc) {
      this.board.style = bgc;
      console.log(this.board);
      this.updateBoard();
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
    socketService.off("update newBoard", this.updateLocalBoard);
    socketService.terminate();
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
    activitylog,
    boardSettings
  }
};
</script>