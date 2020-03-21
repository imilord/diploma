<template>
  <section class="container">
    <container class="tasklist-list" orientation="horizontal" @drop="onDrop">
      <draggable v-for="list in lists" :key="list.id">
        <tasklist-preview
          class="tasklist"
          :taskList="list"
          :boardId="boardId"
          @update-board="updateBoard"
          @update-list="updateList"
        ></tasklist-preview>
      </draggable>
    </container>
  </section>
</template>

<script>
import tasklistPreview from "./tasklist-preview.vue";
import container from "../vue-smooth-dnd/container.vue";
import draggable from "../vue-smooth-dnd/draggable.vue";
import { applyDrag } from "../vue-smooth-dnd/utils.js";

export default {
  name: "tasklist-list",
  props: {
    taskLists: Array,
    boardId: String
  },
  data() {
    return {
      lists: this.taskLists
    };
  },
  methods: {
    updateBoard(board) {
      this.$emit("update-board", board);
    },
    onDrop(dropResult) {
      this.lists = applyDrag(this.lists, dropResult);
      console.log(this.lists);
      this.updateList();
    },
    updateList() {
      this.$emit("update-lists", this.lists);
    }
  },
  components: {
    tasklistPreview,
    draggable,
    container
  }
};
</script>