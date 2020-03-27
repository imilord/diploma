<template>
  <section>
    <font-awesome-icon icon="user-secret" />
    <main-nav :user="user" @logout="doLogout" :class="{ isTaskOpen: isTaskOpen }"></main-nav>
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
.isTaskOpen {
  display: none;
}
</style>