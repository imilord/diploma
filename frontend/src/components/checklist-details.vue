<template>
  <section class="checlist-details">
    <div>{{checklist.name}}</div>
    <button @click="removeChecklist">X</button>

    <el-progress :percentage="progress"></el-progress>

    <div class="todos" v-for="todo in checklist.todos" :key="todo.id">
      <label>
        <input type="checkbox" v-model="todo.isDone" @change="updateTodo(todo)" />
        {{todo.text}}
      </label>
    </div>

    <div v-if="!isAddTodo" @click="toggleAddTodo">Add an item</div>
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
      newTodo: { text: "", isDone: false }
    };
  },
  methods: {
    toggleAddTodo() {
      this.isAddTodo = !this.isAddTodo;
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