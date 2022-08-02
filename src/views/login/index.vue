<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
    <img src="../../assets/logo.595745bd.png" class="login-img" />

      <el-form-item prop="loginName">
        <span class="el-icon-mobile-phone" />
        <el-input
          ref="loginName"
          v-model="loginForm.loginName"
          placeholder="loginName"
          name="loginName"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item prop="code" class="code">
        <span class="svg-container">
          <svg-icon icon-class="yanzhengma" />
        </span>
        <el-input
          ref="code"
          v-model="loginForm.code"
          placeholder="请输入验证码"
          name="code"
          type="text"
          tabindex="3"
          @keyup.enter.native="handleLogin"
        />
        <div class="code-img" @click="getCodePic()">
          <img :src="codeImg" />
        </div>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        class="login-btn"
        @click.native.prevent="handleLogin"
        >登陆</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { getCodePic} from "@/api/user";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        loginName: "admin",
        password: "admin",
        code: "",
      },
      loginRules: {
        loginName: [
          { required: true, trigger: "blur", message: "请输入用户名" },
          // { pattern: /^[a-zA-Z]*$/, trigger: "blur", message: "用户名不正确" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      },
      clientToken: Math.random(),
      codeImg: '',
      loading: false,
      passwordType: "password",
    };
  },
  created() {
    this.getCodePic();
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const data = {
            ...this.loginForm,
            clientToken: this.clientToken,
            loginType: 0
          }
         await this.$store.dispatch("user/getToken", data)
         this.loading = false
        } else {
          console.log("error submit!!");
          return false;
        }

      });
    },
    // 图片验证码
    async getCodePic() {
      const res = await getCodePic(this.clientToken)
      this.codeImg = window.URL.createObjectURL(res)
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #ccc;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  // background: url('../../assets/background.be4fae7d.png') no-repeat;
  background-image: url("../../assets/background.be4fae7d.png");
  background-repeat: no-repeat;
  background-size: cover;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #999;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #889aa4 !important;
      }
    }
  }

  .el-form-item {
    width: 100%;
    height: 52px;
    margin-bottom: 24px;
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;

  .login-form {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
  }

  .login-img {
    position: absolute;
    left: 50%;
    margin-left: -48px;
    top: -45px;
    width: 96px;
    height: 96px;
  }

  .code {
    ::v-deep .el-form-item__content {
      display: flex;
    }
  }

  .login-btn {
    width: 100%;
    height: 52px;
    background: linear-gradient(262deg, #2e50e1, #6878f0);
    opacity: 0.91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf;
    margin-top: 10px;
  }

  .svg-container,
  .el-icon-mobile-phone,
  .el-icon-folder-checked {
    padding: 6px 5px 6px 15px;
    color: #ccc;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
