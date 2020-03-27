<template>
  <section class="tasklist-list container">
    <container
      orientation="horizontal"
      @drop="onDrop"
      :get-child-payload="getChildPayload"
      :drop-placeholder="dropPlaceholderOptions"
    >
      <draggable
        v-for="list in lists"
        :key="list.id"
        @update-board="updateBoard"
        @update-list="updateList"
      >
        <tasklist-preview
          :taskList="list"
          :boardId="boardId"
          @upadte-activitylog="upadteActivitylog"
        ></tasklist-preview>
      </draggable>
      <div class="tasklist-preview">
        <button v-if="!isAddListOpen" @click="isAddListOpen=!isAddListOpen" class="new-add-btn">
          <font-awesome-icon class="new-add-btn" icon="plus" />Add new list
        </button>
        <div v-else>
          <form @submit.prevent="addList">
            <input type="text" placeholder="Add list title" v-model="newList.name" class="board" />
            <br />
            <button class="add-btn">Add List</button>
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
        className: "tasklist-preview-placeholder",
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
      if (!this.newList.name) return;
      const activitylog = this.createActivitylog(
        `added list ${this.newList.name} to this board`
      );

      this.$store.commit({
        type: "updateActivitieslog",
        activitylog
      });

      const board = await this.$store.dispatch({
        type: "addTasksList",
        listData: this.newList
      });

      this.lists = board.taskLists;
      this.getEmptyList();
      this.isAddListOpen = !this.isAddListOpen;
      this.updateBoard(board);
    },
    async getEmptyList() {
      await this.$store.commit({
        type: "setEmptyTasksList"
      });

      this.newList = JSON.parse(JSON.stringify(this.$store.getters.currList));
    },
    updateList() {
      this.$emit("update-lists", this.lists);
    },
    getChildPayload(index) {
      return this.lists[index];
    },
    upadteActivitylog(taskId, fromList) {
      this.lists.forEach(list => {
        const task = list.tasks.find(task => task.id === taskId);

        if (task) {
          const activitylog = this.createActivitylog(
            `move task ${task.name} from list ${fromList} to ${list.name}`,
            taskId
          );

          this.$emit("upadte-activitylog", activitylog);
        }
      });
    },
    createActivitylog(txt, taskId) {
      return {
        txt,
        createdAt: Date.now(),
        taskId
      };
    }
  },
  created() {
    this.getEmptyList();
  },
  watch: {
    taskLists: function(newVal) {
      this.isDrop = true;
      this.lists = newVal;
    }
  },
  components: {
    tasklistPreview,
    draggable,
    container
  }
};
</script>