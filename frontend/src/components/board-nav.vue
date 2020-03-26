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
      <li v-if="members">
        <avatar
          v-for="member in members"
          :key="member._id"
          :username="member.username"
          class="member"
        ></avatar>
      </li>
      <li>{{dueDate | dueDate}}</li>
    </ul>
    <div>
      <button @click="$emit('toggle-settings')">Settings</button>
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
      newBoardName: ""
    };
  },
  methods: {
    changeName() {
      this.titleClicked = false;
      this.$emit(
        "update-boardname",
        JSON.parse(JSON.stringify(this.newBoardName))
      );
    }
  },
  created() {
    this.newBoardName = this.boardName;
  },
  components: {
    avatar
  }
};
</script>