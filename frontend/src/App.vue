<template>
  <section>
    <main-nav></main-nav>
    <router-view></router-view>
  </section>
</template>

<script>
import mainNav from "./components/main-nav.vue";

export default {
  components: {
    mainNav
  }
};
</script>
