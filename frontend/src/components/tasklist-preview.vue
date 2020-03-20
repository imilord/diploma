<template>
  <section class="task-list-preview">
    <header>
      <h2>{{taskList.name}}</h2>
      <button>...</button>
    </header>
    <main>
      <task-list :tasks="taskList.tasks" :boardId="boardId"></task-list>
    </main>
    <footer>
      <button v-if="!isAddTaskOpen" @click="isAddTaskOpen=!isAddTaskOpen">Add task</button>
      <div v-else>
        <form @submit.prevent="addTask">
          <input type="text" placeholder="Enter new task" v-model="newTask.name" />
          <button>Add task</button>
        </form>
        <button @click="isAddTaskOpen=!isAddTaskOpen">X</button>
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
      newTask: null
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