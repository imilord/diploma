<template>
  <div class="board-settings">
    <header>
      <p>Board Actions</p>
      <button class="settings-btn" @click="$emit('toggle-settings')">
        <i class="el-icon-close icon"></i>
      </button>
    </header>

    <main>
      <button @click="isNameEditorOpen=!isNameEditorOpen">Change board name</button>
      <button @click="isColorPickerOpen=!isColorPickerOpen">Change background</button>
      <button>Search tasks</button>
      <button @click="isDeleteQuestOpen=!isDeleteQuestOpen">Delete board</button>
    </main>

    <section>
      <color-picker-large v-if="isColorPickerOpen" @set-bgc="setBgc"></color-picker-large>
      <div class="name-editor" v-if="isNameEditorOpen">
        <input type="text" v-model="name" :placeholder="board.name" />
        <button>Save</button>
      </div>
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

export default {
  props: {
    board: Object
  },
  data() {
    return {
      isColorPickerOpen: false,
      isNameEditorOpen: false,
      isDeleteQuestOpen: false
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
    }
  },
  components: {
    colorPickerLarge
  }
};
</script>