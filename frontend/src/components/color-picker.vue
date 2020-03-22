<template>
  <div class="color-picker">
    <div
      v-for="color in colors"
      :style="{backgroundColor: color}"
      :class="{'active': color === currColor}"
      :key="color"
      class="color"
      @click="setColor(color)"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        "rgb(174, 212, 255)",
        "rgb(221, 170, 255)",
        "rgb(255, 198, 198)",
        "rgb(254, 255, 174)",
        "rgb(183, 255, 174)",
        "hsla(0,0%,100%,.3)"
      ],
      currColor: ""
    };
  },
  methods: {
    setColor(color) {
      this.currColor = color;
      this.$emit("set-color", this.currColor);
    }
  }
};
</script>