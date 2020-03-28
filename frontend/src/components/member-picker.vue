<template>
  <section class="member-picker">
    <header>
      <button class="close-btn" @click="$emit('close-member-picker')">
        <font-awesome-icon icon="times" />
      </button>
      <h2 class="member-title">Members</h2>
    </header>

    <h3 class="board-member-title">Board members</h3>
    <ul class="members">
      <li
        v-for="member in members"
        :key="member._id"
        class="member-content"
        @click="updateMember(member)"
      >
        <div>
          <img v-if="member.imgUrl" :src="member.imgUrl" class="member-img" />
          <avatar v-else :username="member.username" class="member"></avatar>
        </div>
        <div>{{member.username}}</div>
      </li>
    </ul>
  </section>
</template>

<script>
import avatar from "vue-avatar";
export default {
  name: "member-picker",
  props: {
    members: Array
  },
  methods: {
    updateMember(member) {
      const newMember = JSON.parse(JSON.stringify(member));
      this.$emit("update-member", newMember);
    }
  },
  components: {
    avatar
  }
};
</script>