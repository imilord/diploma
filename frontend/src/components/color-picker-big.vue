<template>
  <div class="color-picker-big">
    <div class="options" v-if="!isOptionOpen" @click="setBgc">
      <div class="option" @click="openImgOption">
        <div class="img photos-img"></div>
        <div class="title">Photos</div>
      </div>
      <div class="option" @click="openColorOption">
        <div class="img colors-img"></div>
        <div class="title">Colors</div>
      </div>
    </div>

    <div class="options-color" v-if="isOptionColorOpen">
      <!-- <button>Back</button> -->
      <div
        class="color"
        v-for="color in colors"
        :key="color"
        :style="{backgroundColor: color}"
        @click="setBgc('color',color)"
      ></div>
    </div>

    <div class="options-color" v-if="isOptionImgOpen">
      <!-- <button>Back</button> -->
      <div
        class="color"
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
    setBgc(type, value) {
      if (type === "color") this.currBgc.color = value;
      if (type === "img") this.currBgc.url = value;
      this.$emit("set-bgc", this.currBgc);
    }
  }
};
</script>

<style scoped>
.color-picker-big .options {
  display: flex;
  justify-content: space-evenly;
}

.color-picker-big .options .option {
  width: 45%;
  cursor: pointer;
}

.color-picker-big .options .option .img {
  border-radius: 8px;
  height: 96px;
  width: 100%;
  background-size: cover;
}

.color-picker-big .options .option .photos-img {
  background-image: url(https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.48948499e309aef794d7.jpg);
}

.color-picker-big .colors-img {
  background-image: url(https://a.trellocdn.com/prgb/dist/images/colors@2x.864f4df15d825e89e199.jpg);
}

.color-picker-big .options-color {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.color-picker-big .options-color .color {
  border-radius: 8px;
  height: 96px;
  width: 47%;
  background-size: cover;
  margin: 3px 0;
}
</style>