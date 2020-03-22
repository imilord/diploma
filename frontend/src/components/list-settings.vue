<template>
  <div class="list-settings">
    <header>
      <p>List Actions</p>
      <button class="settings-btn" @click="closeSettings">
        <i class="el-icon-close"></i>
      </button>
    </header>

    <main>
      <button @click="isNameEditorOpen = !isNameEditorOpen">Change list name</button>
      <div class="nameEditor" v-if="isNameEditorOpen">
        <input type="text" v-model="name" @change="updateListName" />
      </div>

      <button @click="isColorPickerOpen=!isColorPickerOpen">Change list color</button>
      <color-picker v-if="isColorPickerOpen" @set-color="setColor"></color-picker>

      <button @click="addTask">Add task to this list</button>

      <button>Sort list by</button>

      <button @click="deleteList">Delete list</button>
    </main>
  </div>
</template>

<script>
import colorPicker from "./color-picker.vue";

export default {
  name: "list-settings",
  props: {
    // listId: String,
    listName: String
  },
  data() {
    return {
      name: this.listName,
      isNameEditorOpen: false,
      isColorPickerOpen: false
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
    }
  },
  components: {
    colorPicker
  }
};
</script>