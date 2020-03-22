<template>
  <section class="task-details" v-if="task">
    <div class="header">
      <button class="close-btn" @click="closeTaskEdit">X</button>
      <div v-if="coverUrl">
        <img class="cover-img" :src="coverUrl" />
        <button @click="removeCover">Remove cover</button>
      </div>
    </div>
    <div class="details-container">
      <section class="task-data">
        <h2 v-if="!isOpenName" @click="toggelName">{{task.name}}</h2>
        <input v-else type="text" v-model="task.name" @blur="saveName" />
        <div class="list-name">In list {{list.name}}</div>
        <div class="main-data">
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
            <h4>Members</h4>
            <div>
              <avatar v-for="member in task.members" :key="member.id" :username="member.name"></avatar>
            </div>
          </div>
          <div class="description-content">
            <h4>Description</h4>
            <div
              v-if="!isOpenDescription"
              class="description-txt"
              @click="toggelDescription"
            >{{(task.description) ? task.description : 'Add a more detailed description'}}</div>
            <div v-else class="edit-description">
              <textarea class="description" rows="4" cols="50" v-model="task.description"></textarea>
              <div class="description-btns">
                <button @click="saveDescription">Save</button>
                <button @click="toggelDescription">X</button>
              </div>
            </div>
          </div>
          <div v-if="task.createdAt" class="created-at">Created at: {{task.createdAt | dueDate}}</div>
          <div v-if="task.dueDate" class="due-date">Due date: {{task.dueDate | dueDate}}</div>
        </div>
      </section>
      <section class="task-buttons">
        <h4>Add to task</h4>
        <div class="main-buttons">
          <div>
            <button v-if="!isLabelsSelected" class="main-btn" @click="toggelLabelPicker">
              <i class="el-icon-price-tag"></i> Labels
            </button>
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
            <button v-if="!isDueToSelected" class="main-btn" @click="toggelDueDate">
              <i class="el-icon-time"></i> Due to
            </button>
            <due-date-picker
              v-else
              :dueDate="task.dueDate"
              @close-due-date="toggelDueDate"
              @date-change="changeDate"
            ></due-date-picker>
          </div>
          <div>
            <button v-if="!isOpenCover" class="main-btn" @click="toggelCover">
              <i class="el-icon-picture-outline"></i> Cover
            </button>
            <cover-picker v-else @update-cover="updateCover" @close-cover-picker="toggelCover"></cover-picker>
          </div>
          <div>
            <button v-if="!isOpenChecklist" class="main-btn" @click="toggelChecklist">
              <i class="el-icon-document-checked"></i> Checklist
            </button>
            <checklist-picker v-else @add-checklist="addChecklist"></checklist-picker>
          </div>
          <div>
            <button class="main-btn" @click="toggelColorPicker">
              <i class="el-icon-edit"></i> Change color
            </button>
            <color-picker-medium v-if="isColorPickerOpen" @set-color="setColor"></color-picker-medium>
          </div>
          <div>
            <button class="main-btn" @click="deleteTask()">
              <i class="el-icon-delete"></i> Delete
            </button>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
<script>
import labelPicker from "../components/label-picker.vue";
import dueDatePicker from "../components/due-date-picker.vue";
import coverPicker from "../components/cover-picker.vue";
import checklistPicker from "../components/checklist-picker.vue";
import colorPickerMedium from "../components/‏‏color-picker-medium.vue";
import avatar from "vue-avatar";

export default {
  name: "task-details",
  data() {
    return {
      task: null,
      list: null,
      isLabelsSelected: false,
      isDueToSelected: false,
      isOpenDescription: false,
      isOpenName: false,
      isOpenCover: false,
      isOpenChecklist: false,
      isColorPickerOpen: false,
      coverUrl: ""
    };
  },
  methods: {
    getListAndTask(taskId) {
      this.$store.commit({
        type: "setListAndTask",
        taskId
      });

      this.task = JSON.parse(JSON.stringify(this.$store.getters.currTask));
      this.list = JSON.parse(JSON.stringify(this.$store.getters.currList));
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
    toggelDescription() {
      this.isOpenDescription = !this.isOpenDescription;
    },
    toggelName() {
      this.isOpenName = !this.isOpenName;
    },
    toggelCover() {
      this.isOpenCover = !this.isOpenCover;
    },
    toggelChecklist() {
      this.isOpenChecklist = !this.isOpenChecklist;
    },
    toggelColorPicker() {
      this.isColorPickerOpen = !this.isColorPickerOpen;
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
    async deleteTask() {
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
    },
    closeTaskEdit() {
      const boardId = this.$route.params.id;
      this.$router.push(`/board/${boardId}`);
    },
    saveDescription() {
      this.saveTask();
      this.toggelDescription();
    },
    saveName() {
      this.saveTask();
      this.toggelName();
    },
    updateCover(url) {
      this.coverUrl = url;
    },
    removeCover() {
      this.coverUrl = "";
    },
    addChecklist() {
      this.toggelChecklist();
    },
    setColor(color) {
      this.task.backgroundColor = color;
      this.saveTask();
    }
  },
  created() {
    const taskId = this.$route.params.taskId;
    this.getListAndTask(taskId);
  },
  components: {
    labelPicker,
    dueDatePicker,
    coverPicker,
    checklistPicker,
    colorPickerMedium,
    avatar
  }
};
</script>