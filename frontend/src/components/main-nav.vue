<template>
  <section class="main-nav container">
    <div class="logo">WorkFlow</div>
    <ul>
      <li>
        <router-link to="/">Boards</router-link>
      </li>
      <li v-if="user.username === 'guest'">
        <router-link to="/auth">Login</router-link>
      </li>
      <li v-if="user.username !== 'guest'">My profile</li>
      <li v-if="user.username !== 'guest'" @click="$emit('logout')">Logout</li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    user: Object
  }
};
</script>