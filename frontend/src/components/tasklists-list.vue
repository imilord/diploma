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
      <div class="tasklist">
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
      newList: null
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
    async addList() {
      const board = await this.$store.dispatch({
        type: "addTasksList",
        listData: this.newList
      });
      this.getEmptyList();
      this.isAddListOpen = !this.isAddListOpen;
      this.updateBoard(board);
      this.lists = board.taskLists;
    },
    getEmptyList() {
      this.newList = JSON.parse(
        JSON.stringify(this.$store.getters.getEmptyTasksList)
      );
    },
    updateList() {
      this.$emit("update-lists", this.lists);
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