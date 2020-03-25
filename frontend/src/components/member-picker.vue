<template>
  <section class="member-picker">
      {{members}}
    <header>
      <h2 class="member-title">Board members</h2>
    </header>
    <h3 class="member-title">Members</h3>
    <ul>
      <li v-for="member in members" :key="member._id">
          <div>{{member.username}}</div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "member-picker",
  props: {
    members: Array
  }
};
</script>