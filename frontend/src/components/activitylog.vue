<template>
  <section v-if="activitieslog">
    <header>
    <h2 class="activity-title">
      <font-awesome-icon icon="tasks" />
      <span>Activity</span>
    </h2>
    <button @click="$emit('close-activitylog')" class="close-activitylog">X</button>
    </header>
    <ul class="activities">
      <li v-for="(activity,idx) in activitieslog" :key="idx" class="activity">
        <div>
        <avatar
          :username="activity.user.username"
          class="avatar"
        ></avatar>
        </div>
        <div>
        <span class="username">{{activity.user.username}}</span>
        {{activity.txt}}
        <div class="due-date">{{activity.createdAt | fromDate}}</div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import avatar from "vue-avatar";
export default {
  name: "acivitylog",
  props: {
    activitieslog: Array
  },
  components: {
    avatar
  }
};
</script>