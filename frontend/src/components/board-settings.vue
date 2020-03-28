<template>
  <div class="board-settings">
    <transition name="fade">
      <div v-if="isLoaded">
        <header>
          <div>
            <font-awesome-icon :icon="[ 'fab', 'trello' ]" />
            <span>Board Actions</span>
          </div>
          <button class="close-btn" @click="closeSettings">
            <font-awesome-icon icon="times" />
          </button>
        </header>

        <section v-if="isMobile" class="mobile-mode">
          <div class="members" v-if="board.members">
            <div v-for="member in board.members" :key="member._id">
              <img v-if="member.imgUrl" :src="member.imgUrl" class="member-img" />
              <avatar v-else :username="member.username" class="member"></avatar>
            </div>
            <span class="add-member-btn" @click="addMember">
              <font-awesome-icon class="new-add-btn" icon="plus" />
            </span>
          </div>
          <div v-if="board.dueDate">{{board.dueDate | dueDate}}</div>
        </section>

        <add-member
          v-if="isAddMember"
          :users="users"
          :members="board.members"
          @add-new-member="addNewMember"
          @remove-member="removeMember"
          @close-add-member="isAddMember=false"
        ></add-member>

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
            :dueDate="board.dueDate ? board.dueDate : Date.now()"
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
    </transition>
  </div>
</template>

<script>
import avatar from "vue-avatar";
import colorPickerLarge from "./color-picker-large.vue";
import dueDatePicker from "./due-date-picker.vue";
import addMember from './add-member.vue';

export default {
  props: {
    board: Object
  },
  data() {
    return {
      isLoaded: false,
      isColorPickerOpen: false,
      isNameEditorOpen: false,
      isDeleteQuestOpen: false,
      isDueDateOpen: false,
      isMobile: false,
      isAddMember: false,
      users: [],
      newName: ""
    };
  },
  methods: {
    isMobileDevice() {
      return window.innerWidth < 550;
    },
    closeSettings() {
      this.isLoaded = false;
      setTimeout(() => {
        this.$emit("toggle-settings");
      }, 100);
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
    },
    async addMember() {
      const users = await this.$store.dispatch({
        type: "getUsers"
      });

      this.isAddMember = true;
      this.users = users;
    },
    async addNewMember(user) {
      const member = {
        _id: user._id,
        username: user.username,
        imgUrl: user.imgUrl
      };

      this.board.members.push(member);

      await this.$store.dispatch({
        type: "updateBoard",
        board: this.board
      });
    },
    async removeMember(member) {
      const memberIdx = this.board.members.findIndex(
        currMember => currMember._id === member._id
      );

      this.board.members.splice(memberIdx, 1);

      await this.$store.dispatch({
        type: "updateBoard",
        board: this.board
      });
    }
  },
  created() {
    this.isMobile = this.isMobileDevice();
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  },
  components: {
    avatar,
    colorPickerLarge,
    dueDatePicker,
    addMember
  }
};
</script>