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
      <li v-if="creator.name">
        <div :key="creator._id">
          <img v-if="creator.imgUrl" :src="creator.imgUrl" class="member-img" />
          <avatar v-else :username="creator.username" class="member"></avatar>
        </div>
      </li>
      <li v-if="members" class="members">
        <div v-for="member in members" :key="member._id">
          <img v-if="member.imgUrl" :src="member.imgUrl" class="member-img" />
          <avatar v-else :username="member.username" class="member"></avatar>
        </div>
        <span class="add-member-btn" @click="$emit('add-member')">
          <font-awesome-icon class="new-add-btn" icon="plus" />
        </span>
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