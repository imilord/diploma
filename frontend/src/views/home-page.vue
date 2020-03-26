<template>
  <section class="home-page">
    <header>HOME PAGE</header>
    <main v-if="boards">
      <div>
        <input type="text" placeholder="Search board" v-model="searchKeyword" />
      </div>
      <div
        class="board-preview"
        v-for="board in boardBySearch"
        :key="board._id"
        :style="{background: board.style.color || 'url(' + board.style.url + ')'}"
      >
        <router-link :to="'/board/' + board._id ">
          <button>{{board.name}}</button>
        </router-link>
      </div>
      <div class="board-preview">
        <button @click="addNewBoard">Create new board</button>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  name: "home-page",
  data() {
    return {
      boards: null,
      searchKeyword: ""
    };
  },
  computed: {
    boardBySearch() {
      if (!this.searchKeyword) return this.boards;
      else
        return this.boards.filter(board =>
          board.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
        );
    }
  },
  async created() {
    const boards = await this.$store.dispatch({
      type: "loadBoards"
    });
    this.boards = JSON.parse(JSON.stringify(boards));

    await this.$store.commit({
      type: "setEmptyBoard"
    });
  },
  methods: {
    async addNewBoard() {
      const boardId = await this.$store.dispatch({
        type: "addNewBoard"
      });
      this.$router.push(`/board/${boardId}`);
    }
  }
};
</script>