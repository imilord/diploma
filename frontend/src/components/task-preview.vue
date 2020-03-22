<template>
  <section class="task-preview">
    <router-link :to="`/board/${boardId}/task-details/${task.id}`" class="task-container">
      <div>
        <div class="cover-img-container">
          <img v-if="task.cover" class="cover-img" :src="task.cover" />
        </div>
        <div class="tesk-name">{{task.name}}</div>
        <div v-if="task.labels.length > 0" class="labels">
            <span
              v-for="label in task.labels"
              :key="label.id"
              :style="{backgroundColor:label.color}"
              class="label"
            >
              <span class="label-title" v-if="label.title">{{label.title}}</span>
            </span>
          </div>
        <div class="members">
          <avatar
            v-for="member in task.members"
            :key="member.id"
            :username="member.name"
            class="member"
          ></avatar>
        </div>
        <div v-if="task.dueDate" class="due-date">{{task.dueDate | dueDate}}</div>
      </div>
    </router-link>
  </section>
</template>

<script>
import avatar from "vue-avatar";
export default {
  name: "task-list",
  props: {
    task: Object,
    boardId: String
  },
  components: {
    avatar
  }
};
</script>