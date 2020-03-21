<template>
  <section class="tasklist-preview">
    <header>
      <h4>{{taskList.name}}</h4>
      <button class="settings-btn" @click="isSettingsOpen=!isSettingsOpen">
        <i class="el-icon-more"></i>
      </button>
      <list-settings
        v-if="isSettingsOpen"
        :listId="taskList.id"
        @close-settings="isSettingsOpen=!isSettingsOpen"
        @add-task="add-task"
        @delete-list="deleteList"
      ></list-settings>
    </header>
    <main>
      <task-list
        class="task-list"
        :allTasks="list.tasks"
        :boardId="boardId"
        @update-tasks="updateTasks"
      ></task-list>
    </main>
    <footer>
      <button v-if="!isAddTaskOpen" @click="isAddTaskOpen=!isAddTaskOpen">Add task</button>
      <div v-else>
        <form @submit.prevent="addTask">
          <input type="text" placeholder="Enter new task" v-model="newTask.name" />
          <br />
          <button>Add task</button>
          <button @click.stop="isAddTaskOpen=!isAddTaskOpen">X</button>
        </form>
      </div>
    </footer>
  </section>
</template>

<script>
import taskList from "./task-list.vue";
import listSettings from "./list-settings.vue";

export default {
  name: "tasklist-preview",
  props: {
    taskList: Object,
    boardId: String
  },
  data() {
    return {
      isSettingsOpen: false,
      isAddTaskOpen: false,
      newTask: null,
      list: this.taskList
    };
  },
  methods: {
    async deleteList(listId) {
      const board = await this.$store.dispatch({
        type: "deleteList",
        listId
      });
      this.isSettingsOpen = !this.isSettingsOpen;
      this.$emit("update-board", board);
    },
    async addTask() {
      const taskData = { newTask: this.newTask, taskListId: this.taskList.id };
      const board = await this.$store.dispatch({
        type: "addTask",
        taskData
      });
      this.list.tasks.push(this.newTask);
      this.$emit("update-board", board);
      this.getEmptyTask();
      this.isAddTaskOpen = !this.isAddTaskOpen;
    },
    getEmptyTask() {
      this.newTask = JSON.parse(
        JSON.stringify(this.$store.getters.getEmptyTask)
      );
    },
    updateTasks(tasks) {
      this.list.tasks = tasks;
      this.$emit("update-list", this.list);
    }
  },
  created() {
    this.getEmptyTask();
  },
  components: {
    taskList,
    listSettings
  }
};
</script>