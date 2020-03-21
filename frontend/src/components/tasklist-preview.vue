<template>
  <section class="tasklist-preview">
    <header>
      <h4>{{taskList.name}}</h4>
      <button>...</button>
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
      list: this.taskList
    };
  },
  methods: {
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
    taskList
  }
};
</script>