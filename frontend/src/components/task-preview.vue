<template>
  <section class="task-preview">
    <router-link :to="`/board/${boardId}/task-details/${task.id}`">
      <div>
        <img v-if="task.cover" :src="task.cover" />
        <div>{{task.name}}</div>
      </div>
    </router-link>
  </section>
</template>

<script>
export default {
  name: "task-list",
  props: {
    task: Object,
    boardId: String
  },
  data() {
    return {};
  }
};
</script>