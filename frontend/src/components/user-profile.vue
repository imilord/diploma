<template>
  <section class="user-profile">
    <header>
      <button class="close-btn" @click="$emit('close-user-profile')">
        <font-awesome-icon icon="times" />
      </button>
      <div>
        <span class="el-icon-user"></span>
        {{user.username}}
      </div>
    </header>

    <main>
      <button @click="toggle('isProfile')">Profile and visibility</button>
      <button>Activity</button>
    </main>

    <section class="profile" v-if="isProfile">
      <div>
        <img v-if="user.imgUrl" :src="user.imgUrl" class="member-img" />
        <avatar v-else :username="user.username" class="member"></avatar>
      </div>

      <label for="add-img">
        <div>{{(user.imgUrl) ? 'Change image' : 'Add image' }}</div>
        <input id="add-img" type="file" @change="addImg" class="img-input" />
      </label>
    </section>
  </section>
</template>

<script>
import avatar from "vue-avatar";
export default {
  name: "user-profile",
  props: {
    user: Object
  },
  data() {
    return {
      isProfile: false
    };
  },
  methods: {
    toggle(type) {
      this[type] = !this[type];
    },
    addImg(ev) {
      this.$emit("change-img", ev);
    }
  },
  components: {
    avatar
  }
};
</script>