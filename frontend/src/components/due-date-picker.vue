<template>
  <section>
    <header>
      <h2>Change Due Date</h2>
      <button class="close-btn" @click="$emit('close-due-date')">
        <font-awesome-icon icon="times" />
      </button>
    </header>

    <v-date-picker class="calender" v-model="selectedDate" mode="single" is-inline />

    <div class="btn-container">
      <button class="add-btn" @click="saveDate">Save</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "due-date-picker",
  props: {
    dueDate: Number
  },
  data() {
    return {
      selectedDate: null
    };
  },
  methods: {
    saveDate() {
      const date = new Date(this.selectedDate).getTime();
      this.$emit("date-change", JSON.parse(JSON.stringify(date)));
    }
  },
  created() {
    this.selectedDate = new Date(this.dueDate);
  }
};
</script>