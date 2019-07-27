<template>
  <div class="login">
        <div class="login-form">
      <div class="logo">
        <img src="../assets/images/logo-login.png" alt />
      </div>
      <div class="inputs">
        <div class="text-input">
          <custom-input v-model="password" :placeholder="'Enter password'" :type="'password'"></custom-input>
        </div>
        <div class="submit-button">
          <input type="button" value="Submit" v-on:click="login()" />
        </div>
        <div id="firebaseui-auth-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import 'firebase/auth';
import "../../node_modules/firebaseui/dist/firebaseui.css";

import CustomInput from "../components/controls/custom-input.vue";
export default {
  components: { CustomInput },
  name: "Login",
  data() {
    return {
      password: ""
    };
  },
  mounted() {
    let uiConfig = {
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult() {
          localStorage.setItem("authenticated", true);
          window.location.href = "/";
        }
      }
    };
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    ui.start("#firebaseui-auth-container", uiConfig);
  },
  methods: {
    login() {
      if (this.password != "") {
        if (this.password == "test") {
          localStorage.setItem('authenticated', false)
          this.$emit("authenticated", true);
          this.$router.replace({ name: "home" });
        } else {
          console.log("The username and / or password is incorrect");
        }
      } else {
        console.log("A username and password must be present");
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/style/custom.scss";
.login {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url(../assets/images/bg-login.jpg);
  background-size: cover;
}
.login-form {
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 44px 86px 0px rgba(0, 0, 0, 0.31);
  & > .logo > img {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
}
.inputs {
  padding: 58px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  & > .submit-button {
    width: 100%;
    margin-top: 40px;
    & > * {
      width: 100%;
      background-color: #31b9f1;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 15px 0;
      color: #fff;
      font-size: 24px;
      border-radius: 4px;
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.3);
      &:hover {
        background-color: #35c4ff;
      }
    }
  }
  & > .text-input {
    position: relative;
    width: 100%;
  }
}
</style>