<template>
  <section class="label-picker">
    <header>
      <h2>Labels</h2>
      <button>X</button>
    </header>
    <main>
      <section>
        <input type="text" placeholder="Search labels..." />
      </section>
      <section>
        <h4>Labels</h4>
        <div>
          <span
            class="label"
            :style="{backgroundColor:labelColor}"
            v-for="(labelColor,idx) in labelColors"
            :key="idx"
            @click="updateLabels(labelColor)"
          >
            <span v-if="isSelectedLabel(labelColor)">V</span>
            <span v-if="isSelectedLabel(labelColor) && selectedLabel">{{selectedLabel.title}}</span>
          </span>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
export default {
  name: "label-picker",
  props: {
    labels: Array
  },
  data() {
    return {
      labelColors: ["red", "blue", "green", "yellow", "pink"],
      selectedLabels: null,
      selectedLabel: null
    };
  },
  created() {
    this.setSelectedLabels();
  },
  methods: {
    setSelectedLabels() {
      this.selectedLabels = this.labels;
    },
    isSelectedLabel(labelColor) {
      for (var i = 0; i < this.selectedLabels.length; i++) {
        if (this.selectedLabels[i].color === labelColor) {
          this.selectedLabel = this.selectedLabels[i];
          return true;
        }
      }

      return false;
    },
    updateLabels(labelColor) {
      let lableExist = false;

      this.selectedLabels.forEach(selectedLabel => {
        if (selectedLabel.color === labelColor) {
          lableExist = true;
          this.$emit("remove-label", selectedLabel);
          this.setSelectedLabels();
        }
      });

      if (!lableExist) {
        const newSelectedLabel = {
          color: labelColor,
          title: ""
        };
        this.$emit("add-label", newSelectedLabel);
        this.setSelectedLabels();
      }
    }
  }
};
</script>

<style scoped>
.label {
  width: 300px;
  height: 20px;
  display: inline-block;
}
</style>