<template>
  <section class="checklist-picker">
    <div>Add Checklist</div>
    <input type="text" placeholder="Checklist title" v-model="title" />
    <button @click="saveTitle">Add</button>
  </section>
</template>

<script>
export default {
  name: "checklist-picker",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    saveTitle() {
      //   this.$emit("add-checklist", title);
    }
  }
};
</script>