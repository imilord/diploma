<template>
  <section class="tasklist-preview" :style="{backgroundColor: taskList.bakegroundColor}">
    <header>
      <h4>{{taskList.name}}</h4>
      <button class="settings-btn" @click="isSettingsOpen=!isSettingsOpen">
        <i class="el-icon-more"></i>
      </button>
      <list-settings
        v-if="isSettingsOpen"
        :listName="taskList.name"
        @close-settings="isSettingsOpen=!isSettingsOpen"
        @update-list-name="updateListName"
        @open-add-task="(isAddTaskOpen=true) && (isSettingsOpen=false)"
        @delete-list="deleteList"
        @set-color="setColor"
        @set-sort="setSort"
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
      <button v-if="!isAddTaskOpen" @click="isAddTaskOpen=!isAddTaskOpen">
        <i class="el-icon-plus"></i> Add new task
      </button>
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
    async deleteList() {
      const board = await this.$store.dispatch({
        type: "deleteList",
        listId: this.taskList.id
      });
      this.isSettingsOpen = !this.isSettingsOpen;
      this.$emit("update-board", board);
    },
    async addTask() {
      if (!this.newTask.name) return;
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
    async getEmptyTask() {
      await this.$store.commit({
        type: "setEmptyTask"
      });

      this.newTask = JSON.parse(JSON.stringify(this.$store.getters.currTask));
    },
    updateTasks(tasks) {
      this.list.tasks = tasks;
      this.$emit("update-list", this.list);
    },
    updateListName(name) {
      this.list.name = name;
      this.$emit("update-list", this.list);
    },
    setColor(color) {
      this.list.bakegroundColor = color;
      this.$emit("update-list", this.list);
    },
    setSort(sortBy) {
      this.list.sortBy = sortBy;
      if (sortBy === "name") {
        this.list.tasks.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          else if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          else return 0;
        });
      } else if (sortBy === "new") {
        this.list.tasks.sort((a, b) => b.createdAt - a.createdAt);
      } else if (sortBy === "old") {
        this.list.tasks.sort((a, b) => a.createdAt - b.createdAt);
      } else if (sortBy === "due-date") {
        const withoutDueDate = this.list.tasks.filter(task => !task.dueDate);
        const withDueDate = this.list.tasks.filter(task => task.dueDate);
        withDueDate.sort((a, b) => a.dueDate - b.dueDate);
        const tasks = [...withDueDate, ...withoutDueDate];
        this.list.tasks = tasks;
        console.log(this.list.tasks);
        // this.list.tasks.sort((a, b) => {
        //   if (!a.dueDate || !b.dueDate) return -1;
        //   else return a.dueDate - b.dueDate;
        // });
      }
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