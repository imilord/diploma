<template>
  <section class="tasklist-preview" :style="{backgroundColor: taskList.backgroundColor}">
    <header>
      <h4>{{taskList.name}}</h4>
      <button class="settings-btn" @click="isSettingsOpen=!isSettingsOpen">
        <i class="el-icon-more icon"></i>
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
    <main :class="{'mobile-mode': isMobile}">
      <task-list
        class="task-list"
        :allTasks="list.tasks"
        :boardId="boardId"
        @update-tasks="updateTasks"
        @upadte-activitylog="upadteActivitylog"
      ></task-list>
    </main>
    <footer :class="{'hover-class': !isAddTaskOpen}">
      <button v-if="!isAddTaskOpen" @click="toggleAddTask" class="new-add-btn">
        <font-awesome-icon class="new-add-btn" icon="plus" />Add new task
      </button>
      <div v-else>
        <form @submit.prevent="addTask">
          <input
            ref="title"
            type="text"
            placeholder="Enter new task"
            v-model="newTask.name"
            class="board"
          />
          <br />
          <div class="add-control-btns">
            <button class="add-btn">Add Task</button>
            <button @click.stop="isAddTaskOpen=!isAddTaskOpen" class="close-btn">
              <font-awesome-icon icon="times" />
            </button>
          </div>
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
      isMobile: false,
      isSettingsOpen: false,
      isAddTaskOpen: false,
      newTask: null,
      list: this.taskList
    };
  },
  methods: {
    async deleteList() {
      const activitylog = this.createActivitylog(
        `removed list ${this.list.name}`
      );

      this.$store.commit({
        type: "updateActivitieslog",
        activitylog
      });

      const board = await this.$store.dispatch({
        type: "deleteList",
        listId: this.list.id
      });
      this.isSettingsOpen = !this.isSettingsOpen;
      this.$emit("update-board", board);
    },
    toggleAddTask() {
      this.isAddTaskOpen = !this.isAddTaskOpen;
      setTimeout(() => {
        this.$refs.title.focus();
      }, 50);
    },
    async addTask() {
      if (!this.newTask.name) return;

      const activitylog = this.createActivitylog(
        `added task ${this.newTask.name} to ${this.list.name}`
      );

      this.$store.commit({
        type: "updateActivitieslog",
        activitylog
      });

      const taskData = { newTask: this.newTask, taskListId: this.list.id };
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
      this.$store.commit({
        type: "setEmptyTask"
      });

      this.newTask = JSON.parse(JSON.stringify(this.$store.getters.currTask));
    },
    updateTasks(tasks) {
      this.list.tasks = tasks;
      this.$emit("update-list", this.list);
    },
    updateListName(name) {
      const activitylog = this.createActivitylog(
        `updated list name from ${this.list.name} to ${name}`
      );

      this.$store.commit({
        type: "updateActivitieslog",
        activitylog
      });
      this.list.name = name;
      this.$emit("update-list", this.list);
    },
    setColor(color) {
      const activitylog = this.createActivitylog(
        `changed the background of ${this.list.name}`
      );

      this.$store.commit({
        type: "updateActivitieslog",
        activitylog
      });

      this.list.backgroundColor = color;
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
        for (var i = 0; i < tasks.length; i++) {
          this.list.tasks.splice(i, 1, tasks[i]);
        }
      }
      this.$emit("update-list", this.list);
    },
    upadteActivitylog(taskId) {
      this.$emit("upadte-activitylog", taskId, this.list.name);
    },
    createActivitylog(txt) {
      return {
        txt,
        createdAt: Date.now()
      };
    },
    isMobileDevice() {
      return (
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1
      );
    }
  },
  watch: {
    taskList: function(newVal) {
      this.list = newVal;
    }
  },
  created() {
    this.getEmptyTask();
    this.isMobile = this.isMobileDevice();
  },
  components: {
    taskList,
    listSettings
  }
};
</script>