<template>
  <section class="due-to-picker">
    <header>
      <h2>Change due date</h2>
      <button @click="$emit('close-due-date')">X</button>
    </header>
    <v-date-picker v-model="selectedDate" mode="single" is-inline />
    <button @click="saveDate">Save</button>
  </section>
</template>

<script>
export default {
  name: "due-to-picker",
  props: {
    dueDate: Number
  },
  data() {
    return {
      selectedDate: null
    };
  },
  methods:{
    saveDate(){
      const date = new Date(this.selectedDate).getTime();
      this.$emit('date-change', JSON.parse(JSON.stringify(date)));
    }
  },
  created() {
    this.selectedDate = new Date(this.dueDate);
  }
};
</script>