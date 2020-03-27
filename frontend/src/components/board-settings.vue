<template>
  <div class="board-settings">
    <header>
      <p>Board Actions</p>
      <button class="close-btn" @click="$emit('toggle-settings')">
        <font-awesome-icon icon="times" />
      </button>
    </header>

    <main>
      <button @click="isNameEditorOpen=!isNameEditorOpen">Change board name</button>
      <button @click="isColorPickerOpen=!isColorPickerOpen">Change background</button>
      <button @click="isDueDateOpen=!isDueDateOpen">Change due date</button>
      <button>Search tasks</button>
      <button @click="isDeleteQuestOpen=!isDeleteQuestOpen">Delete board</button>
    </main>

    <section>
      <color-picker-large v-if="isColorPickerOpen" @set-bgc="setBgc"></color-picker-large>
      <div class="name-editor" v-if="isNameEditorOpen">
        <input type="text" v-model="newName" :placeholder="board.name" />
        <button @click="changeName">Save</button>
      </div>
      <due-date-picker
        class="due-date-picker-board"
        v-if="isDueDateOpen"
        :dueDate="board.dueDate"
        @close-due-date="isDeleteQuestOpen=!isDeleteQuestOpen"
        @date-change="changeDate"
      ></due-date-picker>
      <div v-if="isDeleteQuestOpen">
        <div>Are you sure?</div>
        <button @click="isDeleteQuestOpen=!isDeleteQuestOpen">No</button>
        <button @click="deleteBoard">Yes, delete this board</button>
      </div>
    </section>
  </div>
</template>

<script>
import colorPickerLarge from "./color-picker-large.vue";
import dueDatePicker from "./due-date-picker.vue";

export default {
  props: {
    board: Object
  },
  data() {
    return {
      isColorPickerOpen: false,
      isNameEditorOpen: false,
      isDeleteQuestOpen: false,
      isDueDateOpen: false,
      newName: ""
    };
  },
  methods: {
    closeSettings() {
      this.$emit("close-settings");
    },
    setBgc(bgc) {
      this.$emit("set-bgc", bgc);
    },
    deleteBoard() {
      this.$emit("delete-board");
    },
    changeDate(newDate) {
      this.$emit("change-date", newDate);
    },
    changeName() {
      this.$emit("update-boardname", this.newName);
    }
  },
  components: {
    colorPickerLarge,
    dueDatePicker
  }
};
</script>