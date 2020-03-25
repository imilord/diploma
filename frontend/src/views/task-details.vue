<template>
  <section class="task-details" v-if="task">
    <div class="header">
      <button class="close-btn" @click="closeTaskEdit">X</button>
      <div v-if="task.cover">
        <img class="cover-img" :src="task.cover" />
        <button @click="removeCover">Remove cover</button>
      </div>
    </div>
    <div class="details-container">
      <section class="task-data">
        <h2 v-if="!isOpenName" @click="toggleName">{{task.name}}</h2>
        <input v-else type="text" v-model="task.name" @blur="saveName" />
        <div class="list-name">In list {{list.name}}</div>
        <div class="main-data">
          <div v-if="task.labels.length > 0" class="labels">
            <span
              v-for="label in task.labels"
              :key="label.id"
              :style="{backgroundColor:label.color}"
              class="label"
              @click="toggleLabelPicker"
            >
              <span class="label-title" v-if="label.title">{{label.title}}</span>
            </span>
          </div>
          <div class="members">
            <h4>Members</h4>
            <div>
              <avatar
                v-for="member in task.members"
                :key="member.id"
                :username="member.name"
                class="member"
              ></avatar>
            </div>
          </div>
          <div class="description-content">
            <h4>Description</h4>
            <div
              v-if="!isOpenDescription"
              class="description-txt"
              @click="toggleDescription"
            >{{(task.description) ? task.description : 'Add a more detailed description'}}</div>
            <div v-else class="edit-description">
              <textarea class="description" rows="4" cols="50" v-model="task.description"></textarea>
              <div class="description-btns">
                <button @click="saveDescription">Save</button>
                <button @click="toggleDescription">X</button>
              </div>
            </div>
          </div>
          <div class="checklists-content">
            <checklist-details
              v-for="checklist in task.checklists"
              :key="checklist.id"
              :checklist="checklist"
              @remove-checklist="removeChecklist"
              @add-todo="addTodo"
              @update-todo="updateTodo"
            ></checklist-details>
          </div>
          <div v-if="task.createdAt" class="created-at">Created at: {{task.createdAt | dueDate}}</div>
          <div v-if="task.dueDate" class="due-date">Due date: {{task.dueDate | dueDate}}</div>
        </div>
        <div>
          <button class="main-btn" @click="toggleActivitylog">Show details</button>
          <activitylog v-if="isOpenActivitylog" :activitieslog="activitieslog"></activitylog>
        </div>
      </section>
      <section class="task-buttons">
        <h4>Add to task</h4>
        <div class="main-buttons">
          <div>
            <button class="main-btn" @click="toggleLabelPicker">
              <i class="el-icon-price-tag"></i> Labels
            </button>
            <label-picker
              v-if="isLabelsSelected"
              :selectedLabels="task.labels"
              @add-label="addLabel"
              @remove-label="removeLabel"
              @update-label="updateLabel"
              @close-labels="toggleLabelPicker"
            ></label-picker>
          </div>
          <div>
            <button class="main-btn" @click="toggleDueDate">
              <i class="el-icon-time"></i> Due to
            </button>
            <due-date-picker
              v-if="isDueToSelected"
              :dueDate="task.dueDate"
              @close-due-date="toggleDueDate"
              @date-change="changeDate"
            ></due-date-picker>
          </div>
          <div>
            <button class="main-btn" @click="toggleCover">
              <i class="el-icon-picture-outline"></i> Cover
            </button>
            <cover-picker
              v-if="isOpenCover"
              @update-cover="updateCover"
              @close-cover-picker="toggleCover"
            ></cover-picker>
          </div>
          <button class="main-btn" @click="copyTask">Copy</button>
          <div>
            <button class="main-btn" @click="toggleChecklist">
              <i class="el-icon-document-checked"></i> Checklist
            </button>
            <checklist-picker
              v-if="isOpenChecklist"
              @add-checklist="addChecklist"
              @close-checklist-picker="toggleChecklist"
            ></checklist-picker>
          </div>
          <div>
            <button class="main-btn" @click="toggleColorPicker">
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
import checklistDetails from "../components/checklist-details.vue";
import activitylog from "../components/activitylog.vue";
import socketService from "../services/socket.service.js";
import moment from "moment";

export default {
  name: "task-details",
  data() {
    return {
      task: null,
      list: null,
      activitieslog: null,
      isLabelsSelected: false,
      isDueToSelected: false,
      isOpenDescription: false,
      isOpenName: false,
      isOpenCover: false,
      isOpenChecklist: false,
      isColorPickerOpen: false,
      isOpenActivitylog: false,
      newChecklist: null
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
    getTaskActivitylog() {
      this.$store.commit({
        type: "getTaskActivitylog",
        taskId: this.task.id
      });

      this.activitieslog = JSON.parse(
        JSON.stringify(this.$store.getters.currActivitylog)
      );
    },
    async addLabel(newLabel) {
      this.task.labels.push(newLabel);
      const activitylog = this.createActivitylog(
        `added label to ${this.task.name}`
      );

      socketService.emit("add activitylog", activitylog);
      this.saveTask(activitylog);
      this.getTaskActivitylog();
    },
    async removeLabel(labelToRemove) {
      const labelIndex = this.task.labels.findIndex(
        label => label.color === labelToRemove.color
      );
      this.task.labels.splice(labelIndex, 1);
      const activitylog = this.createActivitylog(
        `removed label from ${this.task.name}`
      );
      socketService.emit("add activitylog", activitylog);
      this.saveTask(activitylog);
      this.getTaskActivitylog();
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

      const activitylog = this.createActivitylog(
        `updated label in ${this.task.name}`
      );

      socketService.emit("add activitylog", activitylog);
      this.saveTask(activitylog);
      this.getTaskActivitylog();
    },
    toggleLabelPicker() {
      this.isLabelsSelected = !this.isLabelsSelected;
    },
    toggleDueDate() {
      this.isDueToSelected = !this.isDueToSelected;
    },
    toggleDescription() {
      this.isOpenDescription = !this.isOpenDescription;
    },
    toggleName() {
      this.isOpenName = !this.isOpenName;
    },
    toggleCover() {
      this.isOpenCover = !this.isOpenCover;
    },
    toggleChecklist() {
      if (!this.isOpenChecklist) {
        this.getEmptyChecklist();
      }

      this.isOpenChecklist = !this.isOpenChecklist;
    },
    toggleColorPicker() {
      this.isColorPickerOpen = !this.isColorPickerOpen;
    },
    toggleActivitylog() {
      this.isOpenActivitylog = !this.isOpenActivitylog;
    },
    changeDate(newDate) {
      this.task.dueDate = newDate;
      const dueDate = moment(new Date(this.task.dueDate)).format("MMM Do YY");
      const activitylog = this.createActivitylog(
        `changed the due date of ${this.task.name} to ${dueDate}`
      );

      socketService.emit("add activitylog", activitylog);
      this.saveTask(activitylog);
      this.getTaskActivitylog();
    },
    async saveTask(activitylog = null) {
      if (activitylog) {
        this.$store.commit({
          type: "updateActivitieslog",
          activitylog
        });
      }

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
        const activitylog = this.createActivitylog(
          `removed task ${this.task.name}`
        );
        this.$store.commit({
          type: "updateActivitieslog",
          activitylog
        });
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
      const activitylog = this.createActivitylog(
        `updated description in ${this.task.name} to ${this.task.description}`
      );

      socketService.emit("add activitylog", activitylog);
      this.saveTask(activitylog);
      this.toggleDescription();
      this.getTaskActivitylog();
    },
    saveName() {
      const activitylog = this.createActivitylog(
        `updated task name to ${this.task.name}`
      );

      socketService.emit("add activitylog", activitylog);
      this.saveTask(activitylog);
      this.toggleName();
      this.getTaskActivitylog();
    },
    updateCover(url) {
      const activitylog = this.createActivitylog(
        `added cover in ${this.task.name}`
      );

      this.task.cover = url;
      socketService.emit("add activitylog", activitylog);
      this.saveTask(activitylog);
      this.getTaskActivitylog();
    },
    removeCover() {
      const activitylog = this.createActivitylog(
        `removed cover in ${this.task.name}`
      );

      this.task.cover = "";
      socketService.emit("add activitylog", activitylog);
      this.saveTask(activitylog);
      this.getTaskActivitylog();
    },
    async copyTask() {
      const activitylog = this.createActivitylog(`copy task ${this.task.name}`);

      this.$store.commit({
        type: "updateActivitieslog",
        activitylog
      });

      const task = JSON.parse(JSON.stringify(this.task));
      const taskData = { newTask: task, taskListId: this.list.id };
      try {
        await this.$store.dispatch({
          type: "copyTask",
          taskData
        });
      } catch (err) {
        console.log("Err in copyTask");
      }

      this.getTaskActivitylog();
    },
    async addChecklist(title) {
      if (!title) return;
      this.newChecklist.name = title;
      const checklist = this.newChecklist;
      this.task.checklists.push(checklist);
      const activitylog = this.createActivitylog(
        `added checklist in ${this.task.name}`
      );

      socketService.emit("add activitylog", activitylog);
      this.saveTask(activitylog);
      this.toggleChecklist();
      this.getTaskActivitylog();
    },
    async getEmptyChecklist() {
      try {
        this.$store.commit({
          type: "setEmptyChecklist"
        });

        this.newChecklist = JSON.parse(
          JSON.stringify(this.$store.getters.currChecklist)
        );
      } catch (err) {
        console.log("Err in getEmptyChecklist");
      }
    },
    removeChecklist(checklistId) {
      const checklistIndex = this.task.checklists.findIndex(
        checklist => checklist.id === checklistId
      );
      this.task.checklists.splice(checklistIndex, 1);
      const activitylog = this.createActivitylog(
        `removed checklist from ${this.task.name}`
      );

      socketService.emit("add activitylog", activitylog);
      this.saveTask(activitylog);
      this.getTaskActivitylog();
    },
    addTodo(checklistId, todo) {
      this.$store.commit({
        type: "getId"
      });
      const newId = this.$store.getters.currId;
      todo.id = newId;

      const checklistIndex = this.task.checklists.findIndex(
        checklist => checklist.id === checklistId
      );
      this.task.checklists[checklistIndex].todos.push(todo);

      const activitylog = this.createActivitylog(
        `added item to checklist in ${this.task.name}`
      );

      socketService.emit("add activitylog", activitylog);
      this.saveTask(activitylog);
      this.getTaskActivitylog();
    },
    updateTodo(checklistId, currTodo) {
      const checklistIndex = this.task.checklists.findIndex(
        checklist => checklist.id === checklistId
      );
      const todos = this.task.checklists[checklistIndex].todos;
      const todoIndex = todos.findIndex(todo => todo.id === currTodo.id);

      this.task.checklists[checklistIndex].todos.splice(todoIndex, 1, currTodo);

      let activitylog;

      if (currTodo.isDone) {
        activitylog = this.createActivitylog(
          `completed ${currTodo.text} on ${this.task.name}`
        );
      } else {
        activitylog = this.createActivitylog(
          `incomplete ${currTodo.text} on ${this.task.name}`
        );
      }

      socketService.emit("add activitylog", activitylog);
      this.saveTask(activitylog);
      this.getTaskActivitylog();
    },
    setColor(color) {
      this.task.backgroundColor = color;

      const activitylog = this.createActivitylog(
        `changed the background of ${this.task.name}`
      );

      socketService.emit("add activitylog", activitylog);
      this.saveTask(activitylog);
      this.getTaskActivitylog();
    },
    createActivitylog(txt) {
      return {
        txt,
        createdAt: Date.now(),
        taskId: this.task.id
      };
    },
    addActivity(newActivitylog) {
      this.saveTask(newActivitylog);
      this.getTaskActivitylog();
    }
  },
  created() {
    const taskId = this.$route.params.taskId;
    this.getListAndTask(taskId);
    this.getTaskActivitylog();

    socketService.setup();
    socketService.emit("task topic", this.task.id);
    socketService.on("activitylog updated", this.addActivity);
  },
  destroyed() {
    // socketService.terminate();
    // socketService.off("activitylog updated", this.addActivity);
  },
  components: {
    labelPicker,
    dueDatePicker,
    coverPicker,
    checklistPicker,
    avatar,
    checklistDetails,
    colorPickerMedium,
    activitylog
  }
};
</script>