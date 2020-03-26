<template>
  <section class="task-preview" :style="{background: task.backgroundColor}">
    <router-link :to="`/board/${boardId}/task-details/${task.id}`" class="task-container">
      <div>
        <div class="cover-img-container">
          <img v-if="task.cover" class="cover-img" :src="task.cover" />
        </div>
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

        <div class="task-name">{{task.name}}</div>

        <div class="due-date" v-if="task.dueDate">
          <span class="due-date-icon el-icon-time"></span>
          <span v-if="task.dueDate">{{task.dueDate | dueDate}}</span>
        </div>

        <div class="checklist" v-if="task.checklists.length>0">
          <span class="checklist-icon el-icon-document-checked"></span>
          <span>{{doneTodosAmount}}</span>
          <span>/</span>
          <span>{{todosAmount}}</span>
        </div>

        <div class="members" v-if="task.members">
          <div v-for="member in task.members" :key="member._id">
            <img v-if="member.imgUrl" :src="member.imgUrl" class="member-img"/>
            <avatar v-else :username="member.username" class="member"></avatar>
          </div>
        </div>
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
  computed: {
    doneTodosAmount() {
      var doneTodos = 0;
      this.task.checklists.forEach(checklist => {
        doneTodos += checklist.todos.filter(todo => todo.isDone).length;
      });

      return doneTodos;
    },
    todosAmount() {
      var todos = 0;
      this.task.checklists.forEach(checklist => {
        todos += checklist.todos.length;
      });

      return todos;
    }
  },
  components: {
    avatar
  }
};
</script>