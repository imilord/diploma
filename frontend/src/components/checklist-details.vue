<template>
  <section class="checklist-details">
    <div class="checklist-header">
      <h4
        v-if="!isOpenChangeName"
        class="checklist-name"
        @click="toggleChangeName"
      >{{checklist.name}}</h4>
      <div v-else class="change-checklist-name">
        <input type="text" v-model="checklist.name" />
        <button @click="changeChecklistName">Save</button>
        <button @click="toggleChangeName">X</button>
      </div>
      <button class="remove-checklist-btn" @click="removeChecklist">Delete</button>
    </div>

    <el-progress :class="{ 'done': progress===100 }" :percentage="progress"></el-progress>

    <div class="todos" v-for="todo in checklist.todos" :key="todo.id">
      <label>
        <input type="checkbox" v-model="todo.isDone" @change="updateTodo(todo)" />
        {{todo.text}}
      </label>
      <button class="remove-todo el-icon-close icon" @click="removeTodo(todo)"></button>
    </div>

    <div class="edit-area add-item" v-if="!isAddTodo" @click="toggleAddTodo">Add an item</div>
    <div v-else>
      <input type="text" placeholder="Add an item" v-model="newTodo.text" />
      <button @click="addTodo">Add</button>
      <button @click="toggleAddTodo">X</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "checklist-details",
  props: {
    checklist: Object
  },
  data() {
    return {
      isAddTodo: false,
      newTodo: { text: "", isDone: false },
      isOpenChangeName: false
    };
  },
  methods: {
    toggleAddTodo() {
      this.isAddTodo = !this.isAddTodo;
    },
    removeChecklist() {
      this.$emit("remove-checklist", this.checklist.id);
    },
    toggleChangeName() {
      this.isOpenChangeName = !this.isOpenChangeName;
    },
    addTodo() {
      this.$emit(
        "add-todo",
        this.checklist.id,
        JSON.parse(JSON.stringify(this.newTodo))
      );
      this.newTodo = { text: "", isDone: false };
    },
    updateTodo(todo) {
      this.$emit(
        "update-todo",
        this.checklist.id,
        JSON.parse(JSON.stringify(todo))
      );
    },
    removeTodo(todo) {
      const todoIndex = this.checklist.todos.findIndex(
        currTodo => currTodo.id === todo.id
      );
      this.checklist.todos.splice(todoIndex, 1);
      this.$emit("update-checklist", this.checklist);
    },
    changeChecklistName() {
      this.$emit("update-checklist", this.checklist);
      this.toggleChangeName();
    }
  },
  computed: {
    progress() {
      const todos = this.checklist.todos.length;
      if (todos !== 0) {
        const doneTodos = this.checklist.todos.filter(todo => todo.isDone);
        return Math.round((doneTodos.length / todos) * 100);
      } else return 0;
    }
  }
};
</script>