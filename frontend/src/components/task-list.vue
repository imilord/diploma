<template>
  <section class="task-list">
    <container :get-child-payload="getChildPayload" group-name="column" @drop="onDrop">
      <draggable v-for="task in tasks" :key="task.index">
        <task-preview :task="task" :boardId="boardId"></task-preview>
      </draggable>
    </container>
  </section>
</template>

<script>
import taskPreview from "./task-preview.vue";
import container from "../vue-smooth-dnd/container.vue";
import draggable from "../vue-smooth-dnd/draggable.vue";
import { applyDrag } from "../vue-smooth-dnd/utils.js";
export default {
  name: "task-list",
  props: {
    allTasks: Array,
    boardId: String
  },
  data() {
    return {
      tasks: this.allTasks
    };
  },
  methods: {
    onDrop(dropResult) {
      this.tasks = applyDrag(this.tasks, dropResult);
      this.$emit("update-tasks", this.tasks);
    },
    getChildPayload(index) {
      return this.tasks[index];
    }
  },
  components: {
    taskPreview,
    container,
    draggable
  }
};
</script>