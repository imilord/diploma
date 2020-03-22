<template>
  <section class="label-picker">
    <header>
      <button class="close-btn" @click="$emit('close-labels')">X</button>
      <h2>Labels</h2>
    </header>
    <main>
      <section v-if="!isAddTitle">
        <div class="label-content" v-for="labelColor in Object.keys(allLabelsMap)" :key="labelColor">
          <span
            class="label"
            :style="{backgroundColor:labelColor}"
            @click="updateLabels(labelColor)"
          >
            <span v-if="isSelectedLabel(labelColor)">V</span>
            <span v-if="allLabelsMap[labelColor]">{{allLabelsMap[labelColor]}}</span>
          </span>
          <button @click="toggleAddTitle(labelColor)">Add title</button>
        </div>
      </section>
      <form v-else @submit.prevent="saveTitle">
        <input type="text" placeholder="Enter title..." v-model="allLabelsMap[currLabelColor]" />
        <button>Save</button>
      </form>
    </main>
  </section>
</template>

<script>
export default {
  name: "label-picker",
  props: {
    selectedLabels: Array
  },
  data() {
    return {
      allLabelsMap: {
        red: "",
        blue: "",
        green: "",
        yellow: "",
        pink: ""
      },
      isAddTitle: false,
      currLabelColor: null
    };
  },
  methods: {
    isSelectedLabel(labelColor) {
      const label = this.selectedLabels.find(
        selectedLabel => selectedLabel.color === labelColor
      );
      if (label) {
        this.allLabelsMap[labelColor] = label.title;

        return true;
      }

      return false;
    },
    updateLabels(labelColor) {
      let lableExist = false;

      this.selectedLabels.forEach(selectedLabel => {
        if (selectedLabel.color === labelColor) {
          lableExist = true;
          this.allLabelsMap[labelColor] = "";
          this.$emit("remove-label", selectedLabel);
        }
      });

      if (!lableExist) {
        const newSelectedLabel = {
          color: labelColor,
          title: ""
        };

        this.$emit("add-label", newSelectedLabel);
      }
    },
    toggleAddTitle(labelColor) {
      this.isAddTitle = !this.isAddTitle;
      this.currLabelColor = labelColor;
    },
    saveTitle() {
      const label = {
        color: this.currLabelColor,
        title: JSON.parse(
          JSON.stringify(this.allLabelsMap[this.currLabelColor])
        )
      };
      this.$emit("update-label", label);

      this.isAddTitle = !this.isAddTitle;
    }
  }
};
</script>