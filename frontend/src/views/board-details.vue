<template>
  <section class="board-details" v-if="board">
    <board-nav
      :boardName="board.name"
      :members="board.members"
      :dueDate="board.dueDate"
      :creator="board.creator"
    ></board-nav>
    <tasklist-list :taskLists="board.taskLists" :boardId="board._id" @update-board="updateBoard"></tasklist-list>
    <router-view></router-view>
  </section>
</template>

<script>
import boardNav from "../components/board-nav.vue";
import tasklistList from "../components/tasklists-list.vue";

export default {
  name: "board-details",
  data() {
    return {
      board: null,
      isTaskOpen: false
    };
  },
  methods: {
    updateBoard(board) {
      this.board = board;
    }
  },
  async created() {
    const boardId = this.$route.params.id;
    const board = await this.$store.dispatch({
      type: "loadBoard",
      boardId
    });
    this.board = JSON.parse(JSON.stringify(board));
  },
  components: {
    boardNav,
    tasklistList
  }
};
</script>