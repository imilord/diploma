<template>
  <section>
    <container
      :get-child-payload="getChildPayload"
      group-name="column"
      @drop="onDrop"
      drag-class="card-ghost"
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
    async onDrop(dropResult) {
      this.tasks = applyDrag(this.tasks, dropResult);
      if (
        (dropResult.removedIndex >= 0 && dropResult.removedIndex !== null) ||
        (dropResult.addedIndex >= 0 && dropResult.addedIndex !== null)
      ) {
        await this.$emit("update-tasks", this.tasks);
        if (dropResult.removedIndex >= 0 && dropResult.removedIndex !== null) {
          this.$emit("upadte-activitylog", dropResult.payload.id);
        }
      }
    },
    getChildPayload(index) {
      return this.tasks[index];
    }
  },
  watch: {
    allTasks: function(newVal) {
      this.tasks = newVal;
    }
  },
  components: {
    taskPreview,
    container,
    draggable
  }
};
</script>