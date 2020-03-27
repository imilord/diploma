<template>
  <section>
    <main-nav :user="user" @logout="doLogout"></main-nav>
    <router-view></router-view>
  </section>
</template>

<script>
import mainNav from "./components/main-nav.vue";

export default {
  data() {
    return {
      user: JSON.parse(JSON.stringify(this.$store.getters.loggedinUser))
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
    "$route.params": function() {
      this.user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));
    }
  },
  components: {
    mainNav
  }
};
</script>
