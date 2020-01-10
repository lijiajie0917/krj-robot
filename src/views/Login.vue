<template>
  <div class="body">
    <div class="bodyBox">
      <!-- <p class="headerName">科瑞杰云平台</p> -->
      <div class="wrapBox">
        <div class="leftBox">
          <img class="login1left" src="../assets/icon/login1.png" alt="">
          <img class="login2left" src="../assets/icon/login2.png" alt="">
          <p class="leftBoxtitle">光伏板清扫机器人平台监控系统</p>
        </div>
        <div class="box">
      		<form :model="form" autocomplete="off" v-show="flag">
            <h4 class="rightBox">登 录/Login</h4>
            <p>
              <input type="text" v-model="form.username" @keyup="show()" @keyup.enter="onSubmit" placeholder="账号" name="username" class="name" required="required" />
            </p>
            <p>
              <input type="text" v-model="form.password" @keyup="show()" @keyup.enter="onSubmit" onfocus="this.type='password'" autocomplete="off" placeholder="密码" name="password" class="password" required="required" />
            </p>
            <div>
              <span @click="help" class="help">忘记密码?</span>
              <button @click="onSubmit" v-if="loginTag" type="button" class="login_button" v-preventReClick>登&nbsp;&nbsp;录</button>
              <button @click="onSubmit" v-else type="button" class="wraplogin login_button" v-preventReClick>登&nbsp;&nbsp;录</button>
              <div class="autologin">
                <input type="checkbox" name="" value="">下次自动登录
              </div>
            </div>
          </form>
          <div v-show="helpBox" class="helpBox">
            <p>如需要帮助，请致电 <span>010-81133843</span> </p>
            <p>或者发送问题到 <span>service@krjrobot.com</span> </p>
            <p>技术人员会24小时内与您联系。</p>
            <p @click="userLogin" class="userLogin"> <span>已有账号</span>&nbsp;马上登录 </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'
import $ from 'jquery'
import {saveUserInfo} from '@/assets/js/auth'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      helpBox:false,
      flag:true,
      loginTag:true,
    }
  },
  methods: {
    async onSubmit () {
      // console.log(this.form.username);
      if (this.form.username=='' || this.form.password =='') {
        this.$message({
          message: '请输入用户名或密码',
          type: 'error'
        })
      } else {
        // 将对象序列化成URL的形式，以&进行拼接
        const form = Qs.stringify(this.form)
        const res = await this.$http.post('/signIn', form, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log('登录页面跳转')
        const data = res.data

        if (data.status === '200') {
          saveUserInfo(data.msg)

          var storage=window.localStorage;
          storage.access=data.data.access;
          storage.username=data.data.username;

          localStorage.setItem('pros',JSON.stringify(data.data.pros));

          const {redirect} = this.$route.query
          // 如果查询字符串中有redirect字段，则直接跳转到这里
          if (redirect) {
            this.$router.push(redirect.substr(1))
          } else {
            if (data.data.pros[0].hasGroup == 0) {
              this.$router.push({
                name: 'User'
              })
            } else if (data.data.pros[0].hasGroup == 1) {
              this.$router.push({
                name: 'Home'
              })
            }
          }
        } else if (data.status === '500') {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          // console.log(data);
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      }
    },
    show:function(){
      if (this.form.username != '' && this.form.password != '') {
        this.loginTag = false;
      } else {
        this.loginTag = true;
      }
    },
    help : function () {
      this.flag = false;
      this.helpBox = true;
    },
    userLogin : function () {
      this.flag = true;
      this.helpBox = false;
    }
  }
}
</script>
<style>
html,body{
  height: 100%;
}
.body{
  height: 100%;
  background: linear-gradient(#31374C, #2E475D);
}
.bodyBox{
  height: 100%;
  padding-top: 0.1px;
}
.wrapBox{
  position: absolute;
  top: 32%;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%);
}
.box{
    float: left;
    padding-left: 80px;
}
.leftBox{
  float: left;
  height: 207px;
  border-right: 1px solid #686D80;
  padding-top: 28px;
}
.leftBox .leftBoxtitle{
  font-size: 18px;
  color: #fff;
  margin-top: 65px;
}
.leftBox .login1left{
  margin: 0 29px 0 14px;
}
.leftBox .login2left{
  margin-right: 96px;
}
.box form{
  width: 302px;
  margin: 0 auto;
}
.box form .rightBox{
  font-size: 20px;
  color: #fff;
  font-weight: 400;
  margin: 11px 0 18px 0;
}
.box form p{
  margin-bottom: 20px;
  position: relative;
}
.box form div{
  margin-bottom: 20px;
  position: relative;
}
.box form div .help{
  float: right;
  margin-top: -5px;
  cursor:pointer;
  color: #C1C9D6;
}
.box form p .help{
  float: right;
  margin-top: -5px;
  cursor:pointer;
  color: #C1C9D6;
}
.box form p img{
  position: absolute;
  top: 11px;
  left: 26px;
}
.box form p input{
  border: none;
  width:302px;
  height:35px;
  background:transparent;
  color: #fff;
  border-bottom: 1px solid #686D80;
}
.box .password{
  color: #C1C9D6;
}
/* centered columns styles */
.row-centered {
    text-align:center;
}
.col-centered {
    display:inline-block;
    float:none;
    text-align:left;
    margin-right:-4px;
}
input {
    outline: none;
}
.login {
    width: 240px;
    background-color: rgba(255,255,255,.15);
    position: relative;
    top: 20px;
    padding: 10px 20px;
    border-radius: 6px;
    text-align: center;
}
.login_button {
    width: 304px;
    height: 37px;
    border: none;
    color: #fff;
    margin-top:15px;
    background: transparent;
    background-image: url('../assets/icon/loginBtn.png');
    outline: none;
    cursor: pointer;
    font-size: 16px;
    color: #31374C;
}
.wraplogin{
  width: 304px;
  height: 37px;
  background: transparent;
  background-image: url('../assets/icon/oklogin.png');
  border: none;
  color: #31374C;
  margin-top: 15px;
  outline: none;
  font-size: 16px;
  cursor: pointer;
}
.helpBox{
  padding-top: 64px;
  margin: 0 auto;
  width: 255px;
  font-size: 14px;
  color: #C5E3FD;
  text-align: center;
}
.helpBox p span{
  color: #FEFFFF;
  cursor: pointer;
}
.helpBox .userLogin{
  margin-top: 45px;
  cursor: pointer;
}
.autologin{
  padding-top: 20px;
  text-align: center;
  color: #C5E3FD;
  opacity: 0.5;
}
.autologin input{
  position: relative;
  top: 2.3px;
  right: 5px;
}
</style>
