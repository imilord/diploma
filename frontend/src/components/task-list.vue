<template>
  <section class="task-list">
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <task-preview :task="task" :boardId="boardId"></task-preview>
      </li>
    </ul>
  </section>
</template>

<script>
import taskPreview from "./task-preview.vue";

export default {
  name: "task-list",
  props: {
    tasks: Array,
    boardId: String
  },
  data() {
    return {};
  },
  components: {
    taskPreview
  }
};
</script>