<template>
  <div class="color-picker-large">
    <div class="options" v-if="!isOptionOpen">
      <div class="option" @click="openImgOption">
        <div class="img photos-img"></div>
        <div class="title">Photos</div>
      </div>
      <div class="option" @click="openColorOption">
        <div class="img colors-img"></div>
        <div class="title">Colors</div>
      </div>
    </div>

    <button v-if="isOptionOpen" @click="backToOptions">Back</button>
    <div class="options-bgc" v-if="isOptionColorOpen">
      <div
        class="bgc"
        v-for="color in colors"
        :key="color"
        :style="{backgroundColor: color}"
        @click="setBgc('color',color)"
      ></div>
    </div>

    <div class="options-bgc" v-if="isOptionImgOpen">
      <div
        class="bgc"
        v-for="img in imgs"
        :key="img"
        :style="{ 'background-image': 'url(' + img + ')' }"
        @click="setBgc('img', img)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        "rgb(0, 121, 191)",
        "rgb(0, 174, 204)",
        "rgb(174, 212, 255)",
        "rgb(137, 96, 158)",
        "rgb(221, 170, 255)",
        "rgb(255, 198, 198)",
        "rgb(205, 90, 145)",
        "rgb(176, 70, 50)",
        "rgb(210, 144, 52)",
        "rgb(254, 255, 174)",
        "rgb(81, 152, 57)",
        "rgb(75, 191, 107)",
        "rgb(183, 255, 174)",
        "rgb(131, 140, 145)",
        "#ebecf0",
        "#111"
      ],
      imgs: [
        "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg",
        "https://images.unsplash.com/photo-1474540412665-1cdae210ae6b",
        "https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/01/08/11/57/butterfly-1127666_960_720.jpg",
        "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg",
        "https://cdn.pixabay.com/photo/2016/07/11/21/23/water-lily-1510707_960_720.jpg",
        "https://cdn.pixabay.com/photo/2014/04/14/20/11/japanese-cherry-trees-324175_960_720.jpg",
        "https://cdn.pixabay.com/photo/2020/03/20/10/18/mountains-4950252_960_720.jpg"
      ],
      isOptionOpen: false,
      isOptionColorOpen: false,
      isOptionImgOpen: false,
      currBgc: {
        color: "",
        url: ""
      }
    };
  },
  methods: {
    openColorOption() {
      this.isOptionOpen = true;
      this.isOptionColorOpen = true;
      this.isOptionImgOpen = false;
    },
    openImgOption() {
      this.isOptionOpen = true;
      this.isOptionColorOpen = false;
      this.isOptionImgOpen = true;
    },
    backToOptions() {
      this.isOptionOpen = false;
      this.isOptionColorOpen = false;
      this.isOptionImgOpen = false;
    },
    setBgc(type, value) {
      if (type === "color") this.currBgc.color = value;
      if (type === "img") this.currBgc.url = value;
      this.$emit("set-bgc", this.currBgc);
    }
  }
};
</script>