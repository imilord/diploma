<template>
  <section>
    <container
      :get-child-payload="getChildPayload"
      group-name="column"
      @drop="onDrop"
      drag-class="card-gohst"
      drop-class="card-ghost-drop"
      :drop-placeholder="dropPlaceholderOptions"
    >
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
      tasks: this.allTasks,
      dropPlaceholderOptions: {
        className: "task-preview-placeholder",
        animationDuration: "150",
        showOnTop: true
      }
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

<style>
.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg);
}

.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg);
}
</style>