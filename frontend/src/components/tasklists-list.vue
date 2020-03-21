<template>
  <section class="tasklist-list container">
    <container
      orientation="horizontal"
      @drop="onDrop"
      :get-child-payload="getChildPayload"
      :drop-placeholder="dropPlaceholderOptions"
    >
      <draggable v-for="list in lists" :key="list.id">
        <tasklist-preview
          :taskList="list"
          :boardId="boardId"
          @update-board="updateBoard"
          @update-list="updateList"
        ></tasklist-preview>
      </draggable>
      <div class="tasklist-preview">
        <button v-if="!isAddListOpen" @click="isAddListOpen=!isAddListOpen">Add new list</button>
        <div v-else>
          <form @submit.prevent="addList">
            <input type="text" placeholder="Add list title" v-model="newList.name" />
            <br />
            <button>Add List</button>
            <button @click.stop="isAddListOpen=!isAddListOpen">X</button>
          </form>
        </div>
      </div>
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
      isAddListOpen: false,
      newList: null,
      dropPlaceholderOptions: {
        className: "tasklist-preview",
        animationDuration: "150",
        showOnTop: true
      }
    };
  },
  methods: {
    updateBoard(board) {
      this.lists = board.taskLists;
      this.$emit("update-board", board);
    },
    onDrop(dropResult) {
      this.lists = applyDrag(this.lists, dropResult);
      this.updateList();
    },
    async addList() {
      const board = await this.$store.dispatch({
        type: "addTasksList",
        listData: this.newList
      });
      this.lists = board.taskLists;
      this.getEmptyList();
      this.isAddListOpen = !this.isAddListOpen;
      this.updateBoard(board);
    },
    getEmptyList() {
      this.newList = JSON.parse(
        JSON.stringify(this.$store.getters.getEmptyTasksList)
      );
    },
    updateList() {
      this.$emit("update-lists", this.lists);
    },
    getChildPayload(index) {
      return this.taskLists[index];
    }
  },
  created() {
    this.getEmptyList();
  },
  components: {
    tasklistPreview,
    draggable,
    container
  }
};
</script>