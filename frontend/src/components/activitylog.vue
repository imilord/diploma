<template>
  <section>
    <transition name="fade">
      <div v-if="isLoaded">
        <header v-if="isMain">
          <h2 class="activity-title">
            <font-awesome-icon icon="tasks" class="activities-icon" />
            <span>Activity</span>
          </h2>
          <button @click="closeActivitylog" class="close-btn">
            <font-awesome-icon icon="times" />
          </button>
        </header>
        <ul class="activities">
          <li v-for="(activity,idx) in activitieslog" :key="idx" class="activity">
            <div>
              <img v-if="activity.user.imgUrl" :src="activity.user.imgUrl" class="member-img" />
              <avatar v-else :username="activity.user.username" class="avatar"></avatar>
            </div>
            <div>
              <span class="username">{{activity.user.username}}</span>
              {{activity.txt}}
              <div class="due-date">{{activity.createdAt | fromDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </section>
</template>

<script>
import avatar from "vue-avatar";
export default {
  name: "acivitylog",
  props: {
    activitieslog: Array,
    isMain: Boolean
  },
  data() {
    return {
      isLoaded: false
    };
  },
  methods: {
    closeActivitylog() {
      this.isLoaded = false;
      setTimeout(() => {
        this.$emit("close-activitylog");
      }, 100);
    }
  },
  created() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  },
  components: {
    avatar
  }
};
</script>