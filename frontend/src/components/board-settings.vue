<template>
  <div class="board-settings">
    <header>
      <div>
        <font-awesome-icon :icon="[ 'fab', 'trello' ]" />
        <span>Board Actions</span>
      </div>
      <button class="close-btn" @click="$emit('toggle-settings')">
        <font-awesome-icon icon="times" />
      </button>
    </header>

    <section v-if="isMobile" class="mobile-mode">
      <!-- <div v-if="board.creator.name">
        <div :key="board.creator._id">
          <img v-if="board.creator.img" :src="board.creator.img" class="member-img" />
          <avatar v-else :username="board.creator.name" class="member"></avatar>
        </div>
      </div>-->
      <div v-if="board.members">
        <div v-for="member in board.members" :key="member._id">
          <img v-if="member.imgUrl" :src="member.imgUrl" class="member-img" />
          <avatar v-else :username="member.username" class="member"></avatar>
        </div>
      </div>
      <div v-if="board.dueDate">{{board.dueDate | dueDate}}</div>
    </section>

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
import avatar from "vue-avatar";
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
      isMobile: false,
      newName: ""
    };
  },
  methods: {
    isMobileDevice() {
      return window.innerWidth < 500;
    },
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
  created() {
    this.isMobile = this.isMobileDevice();
  },
  components: {
    avatar,
    colorPickerLarge,
    dueDatePicker
  }
};
</script>