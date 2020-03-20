<template>
  <section class="board-nav container">
    <ul>
      <li>{{boardName}}</li>
      <li>
        <ul>
          <li class="member" v-for="member in members" :key="member.id">{{member.name}}</li>
        </ul>
      </li>
      <li>{{dueDate | dueDate}}</li>
    </ul>
    <div>
      <button>Settings</button>
      <button>Activity Log</button>
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
  }
};
</script>