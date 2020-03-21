<template>
  <div class="list-settings">
    <header>
      <p>List Actions</p>
      <button class="settings-btn" @click="closeSettings">
        <i class="el-icon-close"></i>
      </button>
    </header>
    <hr />
    <main>
      <button>Change list name</button>
      <button>Change list color</button>
      <button @click="addTask">Add task to this list</button>
      <button>Sort list by</button>
      <button @click="deleteList">Delete list</button>
    </main>
  </div>
</template>

<script>
export default {
  name: "list-settings",
  props: {
    listId: String
  },
  methods: {
    closeSettings() {
      this.$emit("close-settings");
    },
    addTask() {
      this.$emit("add-task");
    },
    deleteList() {
      this.$emit("delete-list", this.listId);
    }
  }
};
</script>