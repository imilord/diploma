<template>
  <section class="main-nav container">
    <div class="logo">WorkFlow</div>
    <ul>
      <li>
        <router-link to="/">Boards</router-link>
      </li>
      <li><router-link to="/auth">Login</router-link></li>
      <li>User setting</li>
      <li @click="$emit('logout')">Logout</li>
    </ul>
  </section>
</template>