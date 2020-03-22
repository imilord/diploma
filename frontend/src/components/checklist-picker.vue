<template>
  <section class="checklist-picker">
    <button class="close-btn" @click="$emit('close-checklist-picker')">X</button>
    <div>Add Checklist</div>
    <input type="text" :placeholder="title" v-model="title" />
    <button @click="saveTitle">Add</button>
  </section>
</template>

<script>
export default {
  name: "checklist-picker",
  data() {
    return {
      title: "Checklist"
    };
  },
  methods: {
    saveTitle() {
      this.$emit("add-checklist", JSON.parse(JSON.stringify(this.title)));
    }
  }
};
</script>