<template>
  <section class="main-nav container">
    <div class="logo">WorkFlow</div>
    <ul>
      <li>Boards</li>
      <li>Login</li>
      <li>Sign Up</li>
      <li>User setting</li>
      <li @click="$emit('logout')">Logout</li>
    </ul>
  </section>
</template>