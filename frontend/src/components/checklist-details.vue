<template>
  <section class="checlist-details">
    <div>{{checklist.name}}</div>
    <button @click="removeChecklist">X</button>

    <div class="todos" v-for="todo in checklist.todos" :key="todo.id">
      <label>
        <input type="checkbox" v-model="todo.isDone" @change="updateTodo" />
        {{todo.text}}
      </label>
    </div>

    <div v-if="!isAddTodo" @click="toggleAddTodo">Add an item</div>
    <div v-else>
      <input type="text" placeholder="Add an item" v-model="todo.text" />
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
      todo: { text: "", isDone: false }
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
        JSON.parse(JSON.stringify(this.todo))
      );
    },
    updateTodo() {}
  }
};
</script>