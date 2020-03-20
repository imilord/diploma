<template>
  <section class="task-lists">
    <ul>
      <li v-for="taskList in taskLists" :key="taskList.id">
        <tasklist-preview :taskList="taskList" :boardId="boardId" @update-board="updateBoard"></tasklist-preview>
      </li>
    </ul>
  </section>
</template>

<script>
import tasklistPreview from "./tasklist-preview.vue";

export default {
  name: "task-lists",
  props: {
    taskLists: Array,
    boardId: String
  },
  data() {
    return {};
  },
  methods: {
    updateBoard(board) {
      this.$emit("update-board", board);
    }
  },
  components: {
    tasklistPreview
  }
};
</script>