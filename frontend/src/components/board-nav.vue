<template>
  <section class="board-nav container">
    <ul>
      <li
        class="board-name"
        v-if="!titleClicked"
        @click.stop="titleClicked = !titleClicked"
      >{{boardName}}</li>
      <li class="board-name" v-if="titleClicked">
        <input type="text" v-model="newBoardName" @blur="changeName" @keyup.enter="changeName" />
      </li>
      <li v-if="members && !isMobile" class="members">
        <div v-for="member in members" :key="member._id">
          <img
            v-if="member.imgUrl"
            :src="member.imgUrl"
            class="member-img"
            :title="member.username"
          />
          <avatar v-else :username="member.username" class="member" :title="member.username"></avatar>
        </div>
        <span class="add-member-btn" @click="$emit('add-member')" title="Add member">
          <font-awesome-icon class="new-add-btn" icon="plus" />
        </span>
      </li>
    </ul>
    <div>
      <button @click="$emit('toggle-settings')">Menu</button>
      <button @click="$emit('toggle-activitylog')">Activity Log</button>
    </div>
  </section>
</template>

<script>
import avatar from "vue-avatar";
export default {
  name: "board-nav",
  props: {
    boardName: String,
    members: Array,
    dueDate: Number,
    creator: Object
  },
  data() {
    return {
      titleClicked: false,
      newBoardName: "",
      isMobile: false
    };
  },
  methods: {
    changeName() {
      this.titleClicked = false;
      this.$emit(
        "update-boardname",
        JSON.parse(JSON.stringify(this.newBoardName))
      );
    },
    isMobileDevice() {
      return window.innerWidth < 550;
    }
  },
  created() {
    this.newBoardName = this.boardName;
    this.isMobile = this.isMobileDevice();
  },
  components: {
    avatar
  }
};
</script>