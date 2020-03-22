<template>
  <section class="cover-picker">
    <button @click="$emit('close-cover-picker')">X</button>
    <input type="file" @change="addCover" />
  </section>
</template>

<script>
export default {
  name: "cover-picker",
  methods: {
    async addCover(ev) {
      const url = await this.$store.dispatch({
        type: "uploadImg",
        ev
      });

      this.$emit("update-cover", url);
    }
  }
};
</script>