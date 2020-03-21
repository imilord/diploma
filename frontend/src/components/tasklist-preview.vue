<template>
  <section class="tasklist-preview">
    <header>
      <h4>{{taskList.name}}</h4>
      <button>...</button>
    </header>
    <main>
      <task-list
        class="task-list"
        :allTasks="taskList.tasks"
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
export default {
  name: "tasklist-preview",
  props: {
    taskList: Object,
    boardId: String
  },
  data() {
    return {
      isAddTaskOpen: false,
      newTask: null,
      newTaskList: this.taskList
    };
  },
  methods: {
    async addTask() {
      const taskData = { newTask: this.newTask, taskListId: this.taskList.id };
      const board = await this.$store.dispatch({
        type: "addTask",
        taskData
      });
      this.getEmptyTask();
      this.isAddTaskOpen = !this.isAddTaskOpen;
      this.$emit("update-board", board);
    },
    getEmptyTask() {
      this.newTask = JSON.parse(
        JSON.stringify(this.$store.getters.getEmptyTask)
      );
    },
    updateTasks(tasks) {
      this.newTaskList.tasks = tasks;
      this.$emit("update-list", this.newTaskList);
    }
  },
  created() {
    this.getEmptyTask();
  },
  components: {
    taskList
  }
};
</script>