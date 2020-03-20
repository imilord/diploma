<template>
  <section class="task-details" v-if="task">
      {{task}}
  </section>
</template>
<script>
export default {
  name: "task-details",
  data() {
    return {
      task: {}
    };
  },
  methods: {
    getTaskById(taskId) {
      this.$store.commit({
        type: "setCurrTask",
        taskId: taskId
      });

      this.task = JSON.parse(JSON.stringify(this.$store.getters.currTask));
    }
  },
  created() {
    const taskId = this.$route.params.taskId;
    this.getTaskById(taskId);
  }
};
</script>