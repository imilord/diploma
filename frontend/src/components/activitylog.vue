<template>
  <section v-if="activitieslog">
    <ul>
        <li v-for="(activity,idx) in activitieslog" :key="idx">
            <span>{{activity.user.username}}</span> {{activity.txt}}
            <div>{{activity.createdAt | fromDate}}</div>
        </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "acivitylog",
  props: {
    activitieslog: Array
  }
};
</script>