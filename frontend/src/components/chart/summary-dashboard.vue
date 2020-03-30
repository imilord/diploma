<template>
  <section class="summary-dashboard">
    <div class="info-container">
      <div class="icon-container members">
        <font-awesome-icon icon="users" class="icon" />
      </div>
      <div class="info">
        <span>members</span>
        <span>{{memberCount}}</span>
      </div>
    </div>

    <div class="info-container">
      <div class="icon-container tasks">
        <font-awesome-icon icon="tasks" class="icon" />
      </div>
      <div class="info">
        <span>tasks</span>
        <span>{{tasksCount}}</span>
      </div>
    </div>

    <div class="info-container">
      <div class="icon-container completed">
        <font-awesome-icon icon="check" class="icon" />
      </div>
      <div class="info">
        <span>completed tasks</span>
        <span>{{completedTasksCount}}</span>
      </div>
    </div>

    <div class="info-container">
      <div class="icon-container incompleted">
        <font-awesome-icon icon="times" class="icon" />
      </div>
      <div class="info">
        <span>incompleted tasks</span>
        <span>{{tasksCount - completedTasksCount}}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    memberCount: Number,
    tasksCount: Number,
    completedTasksCount: Number
  }
};
</script>