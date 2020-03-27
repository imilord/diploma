<template>
  <section class="checklist-picker">
    <button class="close-btn" @click="$emit('close-checklist-picker')">X</button>
    <h2>Add Checklist</h2>
    <label>
      <div>Title</div>
      <input class="task" type="text" ref="input" :placeholder="title" v-model="title" />
    </label>
    <button class="add-btn" @click="saveTitle">Add</button>
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
  },
  mounted() {
    this.$refs.input.focus();
    this.$refs.input.setSelectionRange(0, this.title.length);
  }
};
</script>