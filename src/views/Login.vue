<template>
    <div class="login">
        <div class="login-form">
            <div class="logo">
                <img src="../assets/images/logo-login.png" alt="">
            </div>
            <div class="inputs">
                <div class="text-input">
                    <custom-input
                            v-model="password"
                            :placeholder="'Enter password'"
                            :type="'password'">
                    </custom-input>
                </div>
                <div class="submit-button">
                    <input type="button" value="Submit">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import CustomInput from '../components/controls/custom-input.vue'
  export default {
    components: {CustomInput}, name: 'Login',
    data() {
      return {
        password: ''
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/style/custom.scss";
    .login {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        height: 100%;
        background: url(../assets/images/bg-login.png);
    }
    .login-form {
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0px 44px 86px 0px rgba(0, 0, 0, 0.31);
        & > .logo > img{
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