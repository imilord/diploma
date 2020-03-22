<template>
  <div class="color-picker-medium">
    <div
      v-for="color in colors"
      :style="{background: color}"
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
        "linear-gradient(-225deg, rgb(105, 234, 203) 0%, rgb(234, 204, 248) 48%, rgb(102, 84, 241) 100%)",
        "linear-gradient(to top, rgb(213, 222, 231) 0%, rgb(255, 175, 189) 0%, rgb(201, 255, 191) 100%)",
        "linear-gradient(to right, rgb(247, 140, 160) 0%, rgb(249, 116, 143) 19%, rgb(253, 134, 140) 60%, rgb(254, 154, 139) 100%)",
        "linear-gradient(to top, rgb(210, 153, 194) 0%, rgb(254, 249, 215) 100%)",
        "linear-gradient(to top, rgb(251, 194, 235) 0%, rgb(166, 193, 238) 100%)",
        "linear-gradient(120deg, rgb(246, 211, 101) 0%, rgb(253, 160, 133) 100%)",
        "linear-gradient(0.25turn, rgb(63, 135, 166), rgb(235, 248, 225), rgb(246, 157, 60))",
        "rgb(174, 212, 255)",
        "rgb(175, 238, 238)",
        "rgb(221, 170, 255)",
        "rgb(255, 198, 198)",
        "rgb(255, 127, 80)",
        "rgb(254, 255, 174)",
        "rgb(183, 255, 174)",
        "#ebecf0",
        "#fff"
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