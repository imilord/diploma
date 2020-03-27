<template>
  <div class="list-settings">
    <header>
      <p>List Actions</p>
      <button class="settings-btn" @click="closeSettings">
        <font-awesome-icon icon="times" />
      </button>
    </header>

    <main>
      <button @click="isNameEditorOpen = !isNameEditorOpen">Change list name</button>
      <div class="name-editor" v-if="isNameEditorOpen">
        <input type="text" v-model="name" @change="updateListName" />
      </div>

      <button @click="isColorPickerOpen=!isColorPickerOpen">Change list color</button>
      <color-picker-small v-if="isColorPickerOpen" @set-color="setColor"></color-picker-small>

      <button @click="addTask">Add task to this list</button>

      <button @click="isSortByOpen = !isSortByOpen">Sort list by</button>
      <div class="sort-by" v-if="isSortByOpen">
        <div @click="sortBy('new')">Newest tasks first</div>
        <div @click="sortBy('old')">Oldest tasks first</div>
        <div @click="sortBy('due-date')">Due date</div>
        <div @click="sortBy('name')">Task name</div>
      </div>

      <button @click="deleteList">Delete list</button>
    </main>
  </div>
</template>

<script>
import colorPickerSmall from "./color-picker-small.vue";

export default {
  name: "list-settings",
  props: {
    listName: String
  },
  data() {
    return {
      name: this.listName,
      isNameEditorOpen: false,
      isColorPickerOpen: false,
      isSortByOpen: false
    };
  },
  methods: {
    closeSettings() {
      this.$emit("close-settings");
    },
    updateListName() {
      this.$emit("update-list-name", this.name);
    },
    addTask() {
      this.$emit("open-add-task");
    },
    deleteList() {
      this.$emit("delete-list");
    },
    setColor(color) {
      this.$emit("set-color", color);
    },
    sortBy(sortBy) {
      this.$emit("set-sort", sortBy);
    }
  },
  components: {
    colorPickerSmall
  }
};
</script>