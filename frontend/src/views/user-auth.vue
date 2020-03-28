<template>
  <section class="user-auth">
    <div class="login" v-if="isLogin">
      <h4>Welcome Back</h4>
      <form @submit.prevent="doLogin">
        <input type="email" v-model="loginCred.email" placeholder="Email" />
        <br />
        <input type="password" v-model="loginCred.password" placeholder="Password" />
        <br />
        <button class="add-btn">Login</button>
        <div class="msg">{{msg}}</div>
      </form>
      <button @click="isLogin=false" class="not-member">
        Not a member? Create your account
        <span>here</span>
      </button>
    </div>

    <div class="signup" v-else>
      <h4>Hello, nice meeting you</h4>
      <form @submit.prevent="doSignup">
        <input type="email" v-model="signupCred.email" placeholder="Email" />
        <br />
        <input type="password" v-model="signupCred.password" placeholder="Password" />
        <br />
        <input type="text" v-model="signupCred.username" placeholder="Username" />
        <br />
        <label for="add-img">
          <div>
            <i class="el-icon-picture-outline"></i>
            <span>Add image</span>
          </div>
          <input id="add-img" type="file" @change="addImg" class="img-input" />
        </label>
        <button class="add-btn">Signup</button>
        <div class="msg">{{msg}}</div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "user-auth",
  data() {
    return {
      isLogin: true,
      signupCred: {},
      loginCred: {},
      msg: ""
    };
  },
  methods: {
    async doLogin() {
      const credential = this.loginCred;
      if (!credential.email || !credential.password) {
        return (this.msg = "Please enter user/password");
      }

      const user = await this.$store.dispatch({
        type: "login",
        userCred: credential
      });

      if (user) {
        this.$router.push("/");
      } else {
        this.msg = "Email address or password is incorrect";
      }
      this.loginCred = {};
    },
    async doSignup() {
      if (!this.signupCred.imgUrl) {
        this.signupCred.imgUrl = "";
      }
      const credential = this.signupCred;
      if (!credential.email || !credential.password || !credential.username) {
        return (this.msg = "Please fill up the form");
      }

      const user = await this.$store.dispatch({
        type: "signup",
        userCred: credential
      });
      this.signupCred = {};

      if (user) {
        this.$router.push("/");
      } else {
        this.msg = "Email Address is Already Registered";
      }
    },
    async addImg(ev) {
      const url = await this.$store.dispatch({
        type: "uploadImg",
        ev
      });

      this.signupCred.imgUrl = url;
    }
  }
};
</script>

<style scoped>
.img-input {
  display: block;
  visibility: hidden;
  width: 0;
  height: 0;
}
</style>

