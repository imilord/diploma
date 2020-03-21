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
        <button v-if="!isLabelsSelected" @click="toggelLabelPicker">Labels</button>
        <label-picker
          v-else
          :selectedLabels="task.labels"
          @add-label="addLabel"
          @remove-label="removeLabel"
          @update-label="updateLabel"
          @close-labels="toggelLabelPicker"
        ></label-picker>
      </div>
      <div>
        <button v-if="!isDueToSelected" @click="toggelDueDate">Due to</button>
        <due-date-picker
          v-else
          :dueDate="task.dueDate"
          @close-due-date="toggelDueDate"
          @date-change="changeDate"
        ></due-date-picker>
      </div>
      <div>
        <button>Cover</button>
      </div>
      <div>
        <button @click="deleteTask()">Delete</button>
      </div>
    </section>
  </section>
</template>
<script>
import labelPicker from "../components/label-picker.vue";
import dueDatePicker from "../components/due-date-picker.vue";
export default {
  name: "task-details",
  data() {
    return {
      task: null,
      isLabelsSelected: false,
      isDueToSelected: false
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
       this.saveTask();
    },
    async removeLabel(labelToRemove) {
      const labelIndex = this.task.labels.findIndex(
        label => label.color === labelToRemove.color
      );
      this.task.labels.splice(labelIndex, 1);
       this.saveTask();
    },
    async updateLabel(labelToUpdate) {
      console.log(labelToUpdate.title);
      const labelIndex = this.task.labels.findIndex(
        label => label.color === labelToUpdate.color
      );

      if (labelIndex !== -1) {
        this.task.labels.splice(labelIndex, 1, labelToUpdate);
      } else {
        this.addLabel(labelToUpdate);
      }

       this.saveTask();
    },
    toggelLabelPicker() {
      this.isLabelsSelected = !this.isLabelsSelected;
    },
    toggelDueDate() {
      this.isDueToSelected = !this.isDueToSelected;
    },
    changeDate(newDate) {
      this.task.dueDate = newDate;
      this.saveTask();
    },
    async saveTask() {
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
    async deleteTask(){
      try {
        await this.$store.dispatch({
          type: "deleteTask",
          task: this.task
        });

        const boardId = this.$route.params.id;
        this.$router.push(`/board/${boardId}`);
      } catch (err) {
        console.log("Err in deleteTask");
      }
    }
  },
  created() {
    const taskId = this.$route.params.taskId;
    this.getTaskById(taskId);
  },
  components: {
    labelPicker,
    dueDatePicker
  }
};
</script>