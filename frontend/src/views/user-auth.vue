<template>
  <section class="user-auth">
    <h2>{{msg}}</h2>
    <form @submit.prevent="doLogin">
      <input type="email" v-model="loginCred.email" placeholder="Email" />
      <br />
      <input type="text" v-model="loginCred.password" placeholder="Password" />
      <br />
      <button>Login</button>
    </form>
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
      <button>Signup</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "user-auth",
  data() {
    return {
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

