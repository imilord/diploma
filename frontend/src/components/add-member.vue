<template>
  <section class="add-member">
    <header>
      <button class="close-btn" @click="$emit('close-add-member')">
        <font-awesome-icon icon="times" />
      </button>
      <h2>Invite To Board</h2>
    </header>
    <main>
      <input
        class="task"
        type="text"
        placeholder="Email address or name"
        v-model="search"
        @input="searchUser"
      />
      <div class="users">
        <div v-for="user in searchedUsers" :key="user._id" @click="updateUser(user)">
          <div class="user">
            <div>
              <img v-if="user.imgUrl" :src="user.imgUrl" class="member-img" />
              <avatar v-else :username="user.username" class="member"></avatar>
            </div>
            <div>
              <span class="username">{{user.username}}</span>
              <span v-if="isUserJoined(user._id)" class="joined">(Joined)</span>
            </div>
          </div>
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
      search: "",
      searchedUsers: this.users
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
    },
    searchUser() {
      this.searchedUsers = this.users.filter(currUser => {
        const userName = currUser.username.toLowerCase();
        const searchUser = this.search.toLowerCase();
        return userName.includes(searchUser);
      });
    }
  },
  watch: {
    users: function(newVal) {
      this.searchedUsers = newVal;
    }
  },
  components: {
    avatar
  }
};
</script>