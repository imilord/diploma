<template>
  <section class="img-picker">
    <button @click="$emit('close-img-picker')">X</button>
    <input type="file" @change="addImg" />
  </section>
</template>

<script>
export default {
  name: "img-picker",
  methods: {
    async addImg(ev) {
      const url = await this.$store.dispatch({
        type: "uploadImg",
        ev
      });

      this.$emit("update-img", url);
    }
  }
};
</script>