<template>
  <section class="checklist-details">
    <div class="checklist-header">
      <h4
        class="checklist-name"
        v-if="!isOpenChangeName"
        @click="toggleChangeName"
      >{{checklist.name}}</h4>
      <div v-else class="change-checklist-name">
        <input class="task" type="text" v-model="checklist.name" />
        <button @click="changeChecklistName">Save</button>
        <button @click="toggleChangeName">X</button>
      </div>
      <button class="remove-checklist-btn" @click="removeChecklist">Delete</button>
    </div>

    <el-progress :class="{ 'done': progress===100 }" :percentage="progress"></el-progress>

    <div class="todos" v-for="todo in checklist.todos" :key="todo.id">
      <div>
        <el-checkbox v-model="todo.isDone" @change="updateTodo(todo)"></el-checkbox>
        <div
          class="checklist-todo"
          v-if="currTodoId !== todo.id"
          @click="setCurrTodoId(todo)"
        >{{todo.text}}</div>
        <div class="checklist-todo" v-if="currTodoId === todo.id">
          <input class="task" type="text" v-model="todo.text" />
          <button @click="changeTodoName(todo)">Save</button>
          <button @click="setCurrTodoId()">X</button>
        </div>
      </div>
      <button class="remove-todo el-icon-close icon" v-if="!currTodoId" @click="removeTodo(todo)"></button>
    </div>

    <div class="edit-area add-item" v-if="!isAddTodo" @click="toggleAddTodo">Add an item</div>
    <div v-else>
      <input class="task" type="text" placeholder="Add an item" v-model="newTodo.text" />
    </div>
    <div v-if="isAddTodo">
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
      isOpenChangeName: false,
      isOpenChangeText: false,
      newTodo: { text: "", isDone: false },
      todoText: "",
      currTodoId: ""
    };
  },
  methods: {
    toggleAddTodo() {
      this.isAddTodo = !this.isAddTodo;
    },
    toggleChangeName() {
      this.isOpenChangeName = !this.isOpenChangeName;
    },
    setCurrTodoId(todo) {
      if (todo) {
        this.currTodoId = todo.id;
        this.todoText = todo.text;
      } else {
        var foundTodo = this.checklist.todos.find(
          currTodo => currTodo.id === this.currTodoId
        );
        foundTodo.text = this.todoText;
        this.currTodoId = "";
      }
    },
    changeChecklistName() {
      this.$emit("update-checklist", this.checklist);
      this.toggleChangeName();
    },
    removeChecklist() {
      this.$emit("remove-checklist", this.checklist.id);
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
    changeTodoName(todo) {
      this.updateTodo(todo);
      this.setCurrTodoId();
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