<template>
  <section>
    <!-- <div v-if="isTaskOpen" class="screen"></div> -->
    <main-nav :user="user" @logout="doLogout"></main-nav>
    <router-view></router-view>
  </section>
</template>

<script>
import mainNav from "./components/main-nav.vue";

export default {
  data() {
    return {
      user: JSON.parse(JSON.stringify(this.$store.getters.loggedinUser)),
      isTaskOpen: false
    };
  },
  methods: {
    doLogout() {
      this.$store.dispatch({ type: "logout" });
      this.user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));
      this.$router.push("/");
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
.screen {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 40;
  top: 0;
  overflow-y: auto;
}
</style>