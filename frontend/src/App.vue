<template>
  <section>
    <main-nav @logout="doLogout"></main-nav>
    <router-view></router-view>
  </section>
</template>

<script>
import mainNav from "./components/main-nav.vue";

export default {
  methods:{
    doLogout() {
      this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    },
  },
  components: {
    mainNav
  }
};
</script>
