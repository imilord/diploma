<template>
  <section class="board-nav container">
    <ul>
      <li
        class="board-name"
        v-if="!titleClicked"
        @click.stop="titleClicked = !titleClicked"
      >{{boardName}}</li>
      <li class="board-name" v-if="titleClicked">
        <input type="text" placeholder="boardName" v-model="newBoardName" />
      </li>
      <li>
        <ul>
          <li class="member" v-for="member in members" :key="member.id">{{member.name}}</li>
        </ul>
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
  }
};
</script>