<template>
  <section class="container">
    <container
      class="tasklist-list"
      orientation="horizontal"
      @drop="onDrop"
      :get-child-payload="getChildPayload"
      :drop-placeholder="dropPlaceholderOptions"
    >
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
      lists: this.taskLists,
      dropPlaceholderOptions: {
        className: "tasklist",
        animationDuration: "150",
        showOnTop: true
      }
    };
  },
  methods: {
    updateBoard(board) {
      this.$emit("update-board", board);
    },
    onDrop(dropResult) {
      this.lists = applyDrag(this.lists, dropResult);
      this.updateList();
    },
    updateList() {
      this.$emit("update-lists", this.lists);
    },
    getChildPayload(index) {
      return this.taskLists[index];
    }
  },
  components: {
    tasklistPreview,
    draggable,
    container
  }
};
</script>