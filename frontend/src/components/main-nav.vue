<template>
  <section class="main-nav container">
    <div class="logo-conteiner" @click="moveToHomePage"><img class="logo-img" src="../imgs/logo.png"/></div>
    <ul>
      <li v-if="user.username === 'guest'">
        <router-link to="/auth">Login</router-link>
      </li>
      <li v-if="user.username !== 'guest'" @click="toggleUserProfile">My profile</li>
      <li v-if="user.username !== 'guest'" @click="$emit('logout')">Logout</li>
    </ul>

    <user-profile v-if="isUserProfile" :user="user" @close-user-profile="toggleUserProfile"></user-profile>
  </section>
</template>

<script>
import userProfile from "./user-profile.vue";
export default {
  props: {
    user: Object
  },
  data() {
    return {
      isUserProfile: false
    };
  },
  methods: {
    toggleUserProfile() {
      this.isUserProfile = !this.isUserProfile;
    },
    changeImg(ev) {
      this.$emit("change-img", ev);
    },
    moveToHomePage(){
      this.$router.push('/');
    }
  },
  created() {
  },
  components: {
    userProfile
  }
};
</script>
