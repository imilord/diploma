<template>
  <section class="board-details" v-if="board" :key="reload">
    <board-nav
      :boardName="board.name"
      :members="board.members"
      :dueDate="board.dueDate"
      :creator="board.creator"
    ></board-nav>
    <tasklist-list
      :taskLists="board.taskLists"
      :boardId="board._id"
      @update-board="updateLocalBoard"
      @update-lists="updateLists"
    ></tasklist-list>
    <router-view></router-view>
  </section>
</template>

<script>
import boardNav from "../components/board-nav.vue";
import tasklistList from "../components/tasklists-list.vue";
import socketService from "../services/socket.service.js";

export default {
  name: "board-details",
  data() {
    return {
      board: null,
      isTaskOpen: false,
      reload: 0
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
    },
    updateLists(lists) {
      this.board.taskLists = lists;
      this.updateBoard();
    },
    loadBoard(board) {
      this.board = board;
      this.$store.dispatch({
        type: "updateBoard",
        board
      });
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
    socketService.on("topic-loaded", this.loadBoard);
    socketService.on("update newBoard", this.loadBoard);
  },
  watch: {
    "$route.params": async function() {
      const boardId = this.$route.params.id;
      const board = await this.$store.dispatch({
        type: "loadBoard",
        boardId
      });
      this.board = JSON.parse(JSON.stringify(board));
      this.reload += 1;
    }
  },
  components: {
    boardNav,
    tasklistList
  }
};
</script>