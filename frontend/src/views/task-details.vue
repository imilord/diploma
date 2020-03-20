<template>
  <section class="task-details" v-if="task">
    <section class="task-data">
      <h2>{{task.name}}</h2>
      <div>
        <h4>Members</h4>
        <ul>
          <li v-for="member in task.members" :key="member.id">{{member.name}}</li>
        </ul>
      </div>
      <div>
        <h4>Description</h4>
        <div>{{task.description}}</div>
      </div>
      <div>Created at: {{task.dueDate | dueDate}}</div>
    </section>
    <section class="task-buttons">
      <h4>Add to task</h4>
      <div>
        <button v-if="!isLabelsSelected" @click="isLabelsSelected=!isLabelsSelected">Labels</button>
        <label-picker
          v-else
          :labels="task.labels"
          @add-label="addLabel"
          @remove-label="removeLabel"
        ></label-picker>
      </div>
      <div>
        <button>Due to</button>
      </div>
      <div>
        <button>Cover</button>
      </div>
      <div>
        <button>Delete</button>
      </div>
    </section>
  </section>
</template>
<script>
import labelPicker from "../components/label-picker.vue";
export default {
  name: "task-details",
  data() {
    return {
      task: null,
      isLabelsSelected: false
    };
  },
  methods: {
    getTaskById(taskId) {
      this.$store.commit({
        type: "setCurrTask",
        taskId
      });

      this.task = JSON.parse(JSON.stringify(this.$store.getters.currTask));
    },
    async addLabel(newLabel) {
      this.task.labels.push(newLabel);
      try {
        const task = await this.$store.dispatch({
          type: "updateTask",
          task: this.task
        });

        this.task = JSON.parse(JSON.stringify(task));
      } catch (err) {
        console.log("Err in updateTask");
      }
    },
    async removeLabel(labelToRemove) {
      const labelIndex = this.task.labels.findIndex(
        label => label.color === labelToRemove.color
      );
      this.task.labels.splice(labelIndex, 1);
      try {
        const task = await this.$store.dispatch({
          type: "updateTask",
          task: this.task
        });
        this.task = JSON.parse(JSON.stringify(task));
      } catch (err) {
        console.log("Err in updateTask");
      }
    }
  },
  created() {
    const taskId = this.$route.params.taskId;
    this.getTaskById(taskId);
  },
  components: {
    labelPicker
  }
};
</script>