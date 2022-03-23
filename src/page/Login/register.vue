<template>
  <div class="login v2">
    <div class="wrapper">
      <div
        class="dialog dialog-shadow"
        style="display: block; margin-top: -362px"
      >
        <div class="registered">
          <h4>注册 CTGU 账号</h4>
          <div class="content" style="margin-top: 20px">
            <ul class="common-form">



          <el-form 
          :model="ruleForm" 
          status-icon 
          :rules="rules" 
          ref="ruleForm" 
          label-width="100px" 
          class="demo-ruleForm"
          label-position="left"

          >
            
            <el-form-item label="账号" prop="userName">
              <el-input v-model.number="ruleForm.userName"></el-input>
            </el-form-item>
            
            <el-form-item label="密码" prop="userPwd">
              <el-input type="password" v-model="ruleForm.userPwd" autoComplete="off"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autoComplete="off"></el-input>
            </el-form-item>

            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <div>
              <el-input 
              style="width:155px;"
              
              v-model="ruleForm.email"></el-input>
                                &nbsp
                  <el-button 
                  @click="SendEmail"
                  :disabled='isDisabled' 
                  style="width: 70px;"
                  
                  >{{captchaTime}}</el-button>
            </div>
            </el-form-item>

            <el-form-item label="验证码" prop="captcha">
              <el-input v-model="ruleForm.captcha"></el-input>
            </el-form-item>
             

            <!-- <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item> -->

          </el-form>

            </ul>
            <el-checkbox class="agree" v-model="agreement">
              我已阅读并同意遵守
              <a
                @click="
                  open(
                    '法律声明',
                    '此仅为个人练习开源模仿项目，仅供学习参考，承担不起任何法律问题'
                  )
                "
                >法律声明</a
              >
              和
              <a
                @click="
                  open(
                    '隐私条款',
                    '本网站将不会严格遵守有关法律法规和本隐私政策所载明的内容收集、使用您的信息'
                  )
                "
                >隐私条款</a
              >
            </el-checkbox>
            <div style="margin-bottom: 30px">
              <y-button
                :classStyle="
                  ruleForm.userName &&
                  ruleForm.userPwd &&
                  ruleForm.checkPass &&
                  ruleForm.captcha &&
                  registxt === '注册'
                    ? 'main-btn'
                    : 'disabled-btn'
                "
                :text="registxt"
                style="
                  margin: 0;
                  width: 100%;
                  height: 48px;
                  font-size: 18px;
                  line-height: 48px;
                "
                @btnClick="regist"
              >
              </y-button>
            </div>
            <div class="border" style="margin-bottom: 10px"></div>
            <ul class="common-form pr">
              <!-- <li class="pa" style="left: 0;top: 0;margin: 0;color: #d44d44">{{registered.errMsg}}</li> -->
              <li
                style="
                  text-align: center;
                  line-height: 48px;
                  margin-bottom: 0;
                  font-size: 12px;
                  color: #999;
                "
              >
                <span>如果您已拥有 CTGU 账号，则可在此</span>
                <a href="javascript:;" style="margin: 0 5px" @click="toLogin"
                  >登陆</a
                >
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script src="../../../static/geetest/gt.js"></script>
<script>
import YFooter from "/common/footer";
import YButton from "/components/YButton";
import { register, geetest, SendEmailCaptcha } from "/api/index.js";
require("../../../static/geetest/gt.js");
var captcha;
export default {
  data() {
    
      var checkUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }else{
          this.submitValid = true;
          callback()
        }
      };
      var checkCaptcha = (rule, value, callback) => {
        if (!value) {
          this.submitValid = false;
          return callback(new Error('验证码不能为空'));
        }else{
          this.submitValid = true;
          callback()
        }
      };
      
      var checkEmail = (rule, value, callback) => {
        var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/; 
        if (!value) {
          this.submitValid = false;
          return callback(new Error('邮箱不能为空'));
        }
        else{
          this.submitValid = true;
        }
        setTimeout(() => {
          if (!reg.test(value)) {
            this.emailValid = false;
            this.submitValid = false;
            callback(new Error('请输入正确的邮箱格式'));
          } else {
            this.emailValid = true;
            this.submitValid = true;
            callback();
          }
        }, 100);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          this.submitValid = false;
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          this.submitValid = false;
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.userPwd) {
          this.submitValid = false;
          callback(new Error('两次输入密码不一致!'));
        } else {
          this.submitValid = true;
          callback();
        }
      };
    return {
      cart: [],
      // captchaStr: '发送验证码',
      // captchaTime: 60,
      captchaTime: '发送验证码',
      isDisabled: false,
      emailValid: false,
      submitValid: false,
      loginPage: true,
      // ruleForm: {
      //   userName: "",
      //   userPwd: "",
      //   errMsg: "",
      //   email: "",
      // },
      registered: {
        userName: "",
        userPwd: "",
        userPwd2: "",
        errMsg: "",
      },
      agreement: false,
      registxt: "注册",
      statusKey: "",
      timer: null,

      ruleForm: {
        userName: '',
        userPwd: '',
        checkPass: '',
        name: '',
        errMsg: "",
        email: "",
        captcha: '',

      },
      rules: {
        userPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        userName: [
          { validator: checkUserName, trigger: 'blur' }
        ],
        captcha: [
          { validator: checkCaptcha, trigger: 'blur' }
        ],
      }
    };
  },
  computed: {
    count() {
      return this.$store.state.login;
    },
  },
  methods: {
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!');
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // },

    loading(){
      //启动定时器
      this.captchaTime--;  //定时器减1
    },
    clearTimer(){
        //清除定时器
        clearInterval(this.timer);
        this.timer = null;
    },
    SendEmail() {
      if (this.emailValid) {
        // this.messageSuccess('验证码正在发送，请注意查收！')
        this.captchaTime = 60;
        this.isDisabled = true;
        this.loading();  //启动定时器
        this.timer = setInterval(() =>{
              //创建定时器
            if(this.captchaTime === 1){
                this.clearTimer();  //关闭定时器
                // this.skipStep();
                this.isDisabled = false;
                this.captchaTime = '发送验证码'
            }else{
                this.loading();
            }
        },1000);
        SendEmailCaptcha({ to: this.ruleForm.email }).then((res) => {
          if (res.code === 200) {
            // console.log(res);
            // this.messageSuccess();
            this.messageSuccess(res.msg);
            // this.toLogin();
            } 
          if(res.msg === "Invalid Addresses: [456456]"){
            this.message('邮箱格式错误')
          } 
          else {
            // console.log(res);
            this.messageSuccess(res.msg);
            // captcha.reset();
            // this.init_geetest()
            // location.reload()
            // this.registxt = "注册";
            return false;
          }
        });
      }else{
        this.message('邮箱格式错误！')

      }
      

    },
    open(t, m) {
      this.$notify.info({
        title: t,
        message: m,
      });
    },
    messageSuccess(msg) {
      this.$message({
        message: msg,
        type: "success",
      });
    },
    message(m) {
      this.$message.error({
        message: m,
      });
    },
    toLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    regist() {
      this.registxt = "注册中...";
      // let userName = this.registered.userName;
      // let userPwd = this.registered.userPwd;
      // let userPwd2 = this.registered.userPwd2;
      let userName = this.ruleForm.userName;
      let userPwd = this.ruleForm.userPwd;
      let checkPass = this.ruleForm.checkPass;
      let email = this.ruleForm.email;
      let captcha = this.ruleForm.captcha;
      // if (!userName || !userPwd || !userPwd2) {
      //   this.message("账号密码不能为空!");
      //   this.registxt = "注册";
      //   return false;
      // }
      // if (userPwd2 !== userPwd) {
      //   this.message("两次输入的密码不相同!");
      //   this.registxt = "注册";
      //   return false;
      // }
      if (!userName||!userPwd||!checkPass||!email||!captcha||!this.submitValid){
        this.message("请按照提示输入!");
        this.registxt = "注册";
        return false;
      }
      if (!this.agreement) {
        this.message("您未勾选同意我们的相关注册协议!");
        this.registxt = "注册";
        return false;
      }
      // var result = captcha.getValidate();
      // if (!result) {
      //   this.message("请完成验证");
      //   this.registxt = "注册";
      //   return false;
      // }
      let updateData = {
        username: this.ruleForm.userName,
        password: this.ruleForm.userPwd,
        code: this.ruleForm.captcha,
        email: this.ruleForm.email,
        name: this.ruleForm.name,
      };
      window.localStorage.setItem("satoken", "");
      register(updateData).then((res) => {
        if (res.code === 200) {
          // console.log(res);
          this.messageSuccess('恭喜你注册成功，抓紧去登录吧！');
          this.toLogin();
        } else {
          // console.log(res);
          this.message(res.msg);
          // // captcha.reset();
          // // this.init_geetest()
          // // location.reload()
          this.registxt = "注册";
          return false;
        }
      });
    },
    // init_geetest() {
    //   geetest().then((res) => {});
    // },
  },
  mounted() {
    // this.init_geetest();
  },
  components: {
    YFooter,
    YButton,
  },
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
* {
  box-sizing: content-box;
}


.login {
  overflow-x: hidden;
  overflow-y: hidden;


  .input {
    height: 50px;
    display: flex;
    align-items: center;
    input {
      font-size: 16px;
      width: 100%;
      height: 100%;
      padding: 10px 15px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
  }
  .wrapper {
    background: url(/static/images/bg_9b9dcb65ff.png) repeat;
    background-size: 100px;
    min-height: 800px;
    min-width: 630px;
  }
}

.v2 .dialog {
  width: 450px;
  border: 1px solid #dadada;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  margin-left: -225px;
  position: absolute;
  .title {
    background: linear-gradient(#fff, #f5f5f5);
    height: auto;
    overflow: visible;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    position: relative;
    background-image: url(/static/images/smartisan_4ada7fecea.png);
    background-size: 140px;
    background-position: top center;
    background-repeat: no-repeat;
    height: 92px;
    margin: 23px 0 50px;
    padding: 75px 0 0;
    box-shadow: none;
    h4 {
      padding: 0;
      text-align: center;
      color: #666;
      border-bottom: 1px solid #dcdcdc;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      font-weight: 700;
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      margin: 0;
      padding: 0;
      border-bottom: 0;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      line-height: 1em;
      height: auto;
      color: #333;
      font-weight: 400;
    }
  }
  .content {

    padding: 0 40px 22px;
    height: auto;
    .common-form {
      li {
        clear: both;
        margin-bottom: 15px;
        position: relative;
      }
    }
  }
}

.dialog-shadow,
.v2 .bbs .dialog-shadow,
.v2 .dialog-shadow {
  -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
}

@media screen and (min-width: 737px),
  screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) {
  .wrapper {
    background: url(/static/images/con-bg_04f25dbf8e.jpg) repeat-x;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .dialog {
    background: url(/static/images/dialog-gray-bg.png) #fff bottom repeat-x;
    border-radius: 12px;
    display: none;
    margin: -163px 0 0 -218px;
    width: 436px;
    position: fixed;
    left: 50%;
    top: 50%;
  }
  .dialog .title h4 {
    border-bottom: #d1d1d1 solid 1px;
    box-shadow: 0 2px 6px #d1d1d1;
    color: #666;
    font-size: 20px;
    height: 61px;
    line-height: 61px;
    padding: 0 0 0 35px;
  }
  .common-form li {
    clear: both;
    margin-bottom: 15px;
    position: relative;
  }
  .auto-login {
    position: absolute;
    top: 0px;
    left: 2px;
    color: #999;
  }
  .register {
    padding: 1px 10px 0;
    border-right: 1px solid #ccc;
  }
  .border {
    margin-top: 10px;
    border-bottom: 1px solid #ccc;
  }
  .other {
    margin: 20px 5px 0 0;
    width: auto;
    color: #bbb;
    font-size: 12px;
    cursor: default;
    color: #999;
  }
  .footer {
    display: flex;
    flex-direction: row;
  }
  .agree {
    margin-bottom: 30px;
    color: #999;
  }
}

.registered {

  h4 {
    padding: 0;
    text-align: center;
    color: #666;
    border-bottom: 1px solid #dcdcdc;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    font-weight: 700;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
  }
}

#wait {
  text-align: left;
  color: #999;
  margin: 0;
}
</style>
