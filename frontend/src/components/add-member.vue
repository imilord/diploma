<template>
  <section class="add-member">
    <header>
      <button>
        <font-awesome-icon icon="times" />
      </button>
      <h2>Invite To Board</h2>
    </header>
    <main>
      <input
        type="text"
        placeholder="Email address or name"
        v-model="search"
        @keyup.enter="addUser"
      />
      <div class="users">
        <div v-for="user in users" :key="user._id" @click="updateUser(user)">
          <div>
            <img v-if="user.imgUrl" :src="user.imgUrl" class="member-img" />
            <avatar v-else :username="user.username" class="avatar"></avatar>
          </div>
          <span>{{user.username}}</span>
          <span v-if="isUserJoined(user._id)">(Joined)</span>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import avatar from "vue-avatar";
export default {
  name: "add-member",
  props: {
    users: Array,
    members: Array
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {
    isUserJoined(userId) {
      const member = this.members.find(currMember => currMember._id === userId);
      if (member) return true;
      else return false;
    },
    updateUser(user) {
      const isMember = this.isUserJoined(user._id);

      if (isMember) {
        this.$emit("remove-member", user);
      } else {
        this.$emit("add-new-member", user);
      }
    }
  },
  components: {
    avatar
  }
};
</script>