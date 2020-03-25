<template>
  <div class="board-settings">
    <header>
      <p>Board Actions</p>
      <button class="settings-btn" @click="$emit('toggle-settings')">
        <i class="el-icon-close icon"></i>
      </button>
    </header>

    <main>
      <button>Change board name</button>
      <!-- <div class="name-editor" v-if="isNameEditorOpen">
        <input type="text" v-model="name" @change="updateListName" />
      </div>-->
      <button @click="isColorPickerOpen=!isColorPickerOpen">Change background</button>
      <button>Search tasks</button>
      <button>Delete board</button>
    </main>

    <section>
      <color-picker-big v-if="isColorPickerOpen"></color-picker-big>
    </section>
  </div>
</template>

<script>
import colorPickerBig from "./color-picker-big.vue";

export default {
  props: {
    board: Object
  },
  data() {
    return {
      isColorPickerOpen: false
    };
  },
  mathods: {
    closeSettings() {
      this.$emit("close-settings");
    },
    setBgc(bgc) {
      console.log(bgc, "fff");
      //   this.$emit("set-bgc", color);
    }
  },
  created() {
    console.log(this.board);
  },
  components: {
    colorPickerBig
  }
};
</script>

<style scoped>
.board-settings {
  position: fixed;
  z-index: 10;
  right: 0;
  top: 40px;
  height: calc(100% - 40px);
  background-color: white;
  width: 340px;
  padding: 5px;
  box-shadow: 0 12px 24px -6px rgba(9, 30, 66, 0.25),
    0 0 0 1px rgba(9, 30, 66, 0.08);
  overflow-y: auto;
}

.board-settings header {
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.board-settings main {
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
</style>