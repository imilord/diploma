<template>
  <section>
    <main-nav :user="user" @logout="doLogout" :class="{ isTaskOpen: isTaskOpen }"></main-nav>
    <router-view :key="reload"></router-view>
  </section>
</template>

<script>
import mainNav from "./components/main-nav.vue";

export default {
  data() {
    return {
      user: JSON.parse(JSON.stringify(this.$store.getters.loggedinUser)),
      isTaskOpen: false,
      reload: 0
    };
  },
  methods: {
    async doLogout() {
      await this.$store.dispatch({ type: "logout" });
      this.user = this.$store.getters.loggedinUser;
      if (this.$route.params.id) {
        this.$router.push("/");
      } else {
        this.reload += 1;
      }
    }
  },
  watch: {
    "$route.params": function(newVal) {
      if (newVal.taskId) this.isTaskOpen = true;
      if (!newVal.taskId) this.isTaskOpen = false;
      this.user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));
    }
  },
  components: {
    mainNav
  }
};
</script>

<style scoped>
.isTaskOpen {
  display: none;
}
</style>