<template>
  <div class="login">
      <!-- 背景登陆页开始 -->
    <div class="login_bag">
      <img src="~@/assets/images/logTop.png" alt="">
      <h1>欢迎登陆</h1>
      <img src="~@/assets/images/xb.png" alt="" class="img_xb">
      <!-- 登陆表单开始 -->
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-width="77px" hide-required-asterisk size="small">
      <el-form-item prop="username" label="用户名" style="width:80%;" size="small">
           <el-input v-model="loginForm.username" type="text" auto-complete="off" size="small" class="user_input_a">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码" style="width:80%;">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密 码"
          @keyup.enter.native="handleLogin"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaOnOff">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 6px 19px;">记住密码</el-checkbox>        
      <!-- 协议按钮开始 -->
            <el-button class="btn_service" type="text" @click="dialogVisible = true">登陆即表示同意《用户协议》
            </el-button>
         <!-- 协议按钮结束 -->
      <el-form-item style="width:100%;" class="loginbar">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:78%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!-- 登陆表单结束 -->
    <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <span>这是一段信息</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
      <!-- shangip开始 -->
      <div class="keywords"><img src="~@/assets/images/wenzi.png" alt="" ></div>
      <!-- shangip结束 -->
    </div>
      <!-- 背景登陆页结束 -->
     <!-- 底部  -->
    <div class="el-login-footer">
      <span>Copyright © <a style="color: #0075C1;">尚谷科技（天津）有限公司</a> All rights reserved.备案号: <a href="" style="color: #0075C1;">津ICP备17001294号</a> </span>
    </div>
  </div>
</template>
<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",
  data() {
    return {
        dialogVisible: false,
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "admin",
        password: "admin123",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      },
      loading: false,
      // 验证码开关
      captchaOnOff: true,
      // 注册开关
      register: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
        // console.log(this.redirect);
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    getCode() {
      getCodeImg().then(res => {
        // console.log(res);
        this.captchaOnOff = res.captchaOnOff === undefined ? true : res.captchaOnOff;
        // console.log(res);
        if (this.captchaOnOff) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
          // console.log(this.loginForm.uuid);
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
            // var parentId = [[${@permission.getPrincipalProperty('parentId')}]];
            // console.log('='+parentId);
          }).catch(() => {
            this.loading = false;
            if (this.captchaOnOff) {
              this.getCode();
            }
          });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
   *{
     margin: 0;
     padding: 0;
   }
   .login{
      width: 100%;
      height: 100%;
      position: relative;
      margin: 0;
      padding: 0;
      background-color:#3988CE;
      background-image: url(~@/assets/images/bg_right.png);
      background-size: 55% 100%;
      background-position: 100% 100%;
      background-repeat: no-repeat;
      z-index: 1;
   }
 
.login_bag{
    height: 100%;
    width: 100%;
    img{
      margin-top: 10px;
      // margin-top: 1%;
      margin-left: 75px;
    }
    h1{
      color: #F3F2F9;
      margin-left: 110px;
      margin-top: 70px;

    }
    .img_xb{
       width: 160px;
       height: 235px;
       transform: rotate(30deg);
       margin-left: 430px;
       margin-top: -30px;

    }
}

.login-form {
  position: absolute;
  top: 230px;
  left: 110px;
  border-radius: 10px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 50px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-form-item__label{
  color: #6aaee2;
  font-size: 17px;
}
.el-form-item__content{
  margin-left: 80px !important;
}
.el-login-footer {
  height: 50px;
  line-height: 50px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #a3a3a3;
  font-family: Arial;
  font-size: 15px;
  letter-spacing: 1px;
}

.el-form-item--small.el-form-item {
    margin-bottom: 16px;
}

// wenzi
.keywords{
  margin-top: 80px;
  margin-left: 28px;
}

.bg_right{
  position: absolute;
  top: 0;
  right: 0;
  }

  .loginbar .el-form-item__content{
    margin-left: 50px !important;
  }

  .el-button--primary{
    background-color: #82BC46;
    border: 0px solid #82BC46;
  }

   .btn_service{
     margin-left: 40px;
     font-size: 8px;
   }

</style>
