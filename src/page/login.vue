<template>
    <div class="login">
      <div class="login-header">
        <img :src="zlinklogo" alt="" class="zlyun">
        <img :src="channel" alt="" class="zlysxy">
      </div>
      <div class="login-body">
        <div class="login-animate">
          <img :src="tu" alt="" class="loginleftImg">
        </div>
        <div class="login-form">
          <div class="loginbox">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
                <h1>欢迎登录</h1>
                <el-form-item prop="name" class="form-group">
                  <label class="iconfont nameicon"></label>
                  <el-input v-model="ruleForm.name" placeholder="请输入登录名" @keyup.enter.native="doLogin('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="pass" class="form-group">
                  <label class="iconfont mimaicon"></label>
                  <el-input v-model="ruleForm.pass" placeholder="请输入密码" :type="pwdType" @keyup.enter.native="doLogin('ruleForm')"></el-input>
                  <p class="ischange" @click="changeType()">
                    <i v-if="iconSH" class="iconfont biyan"></i>
                    <i v-else class="iconfont yanjing "></i>
                  </p>
                </el-form-item>
                <el-form-item prop="verification" class="form-group">
                  <label class="iconfont yzmicon" ></label>
                  <el-input v-model="ruleForm.verification" placeholder="请输入验证码" style="width: 60%;" @keyup.enter.native="doLogin('ruleForm')"></el-input>
                  <img :src="verifyImg" alt="" class="verifyImg" @click="changeCodeImg()">
                </el-form-item>
                <el-checkbox v-model="checked" class="checkInfo">记住密码</el-checkbox>
                <button type="button" name="button" class="loginBtn" @click="submitForm('ruleForm')">登  录</button>
            </el-form>
          </div>
        </div>
      </div>
      <div class="login-footer">
           <p> Copyright© 2017 &nbsp;zlinkyun.com All rights reserved.&nbsp;智链云（江苏）信息科技有限公司 版权所有 苏ICP备 17041712号-1</p>
      </div>
    </div>
</template>

<script>
import zlinklogo from '@/assets/image/zlinklogo.png'
import channel from '@/assets/image/channel.png'
import tu from '@/assets/image/tu.png'
import ytuichakan from '@/assets/image/ytuichakan.png'
import ytuiguanbi from '@/assets/image/ytuiguanbi.png'
import ytuimm from '@/assets/image/ytuimm.png'
import ytuimmxz from '@/assets/image/ytuimmxz.png'
import ytuiyh from '@/assets/image/ytuiyh.png'
import ytuiyhxz from '@/assets/image/ytuiyhxz.png'
import ytuiyz from '@/assets/image/ytuiyz.png'
import ytuiyzxz from '@/assets/image/ytuiyzxz.png'

export default {
  data(){
    function trim(str)
    {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    var validatePass = (rule, value, callback) => {
       if (value === '') {
         callback(new Error('请输入密码'));
       } else {
         if (value.length < 6) {
           callback(new Error('密码不能低于6位'));
         } else{
           callback();
         }
       }
     }
    return{
      zlinklogo: zlinklogo,
      channel:channel,
      tu:tu,
      checked: true,
      pwdType:"password",
      iconSH:true,
      verifyImg:"/channelcenter-pcapis/login/image",
      // 用户登录信息
      username:"",
      password:"",
      verifyCode:"",
      ruleForm: {
          name: '',
          pass: '',
          verification:''
      },
      rules: {
        name: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        verification: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    document.title = "渠道中心管理";
    var user = this.$getCookie("UserNames");
    this.ruleForm.name = user
  },
  methods: {
    // 切换验证码
     changeCodeImg:function(){
       this.verifyImg = '/channelcenter-pcapis/login/image?r='+Math.random();
　　 },
     submitForm(formName) {
       var that =this
       that.$refs[formName].validate((valid) => {
         if (valid) {
           that.$post("/channelcenter-pcapis/login/go",{
             account:this.ruleForm.name,
             pwd:this.ruleForm.pass,
             code:this.ruleForm.verification
           }).then((response) => {
            if(response.code == 200){
              var userID = response.AppendData
              if(that.checked ==false){
                that.$setCookie("UserNames",'',-1);
              }else{
                that.$setCookie("UserNames",this.ruleForm.name,2);
              }
              that.$router.push({
                path: '/home',
              })
            }else{
              that.$message.error(response.message)
            }
          }).catch(err => {
            that.$message.error('请求出错');
          })
         } else {
           return false;
         }
       });
     },
     changeType(){
       this.pwdType = this.pwdType==='password'?'text':'password';
       this.iconSH = !this.iconSH
     },
     doLogin(formName){
       this.submitForm(formName)
     }
   }
}
</script>

<style lang="less">
  body, html {
    .biyan{
      width:28px;
      height:20px;
      background: url("../assets/image/ytuiguanbi.png");
      background-size: 28px 20px;
      display: inline-block;

    }
    .yanjing{
      width:28px;
      height:20px;
      background: url("../assets/image/ytuichakan.png");
      background-size: 28px 20px;
        display: inline-block;
    }
      margin: 0;
      padding: 0;
      // background: #4e546c;
      height: 100%;
      font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
      font-weight: 400;
      overflow: hidden !important;
      -webkit-font-smoothing: antialiased;
  }
  #app{
    height: 100%;
    min-height: 100%;
    overflow-y: auto;
  }
  input::-webkit-input-placeholder{
      color:#a7b6c3;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
      color:#a7b6c3;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
      color:#a7b6c3;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
      color:#a7b6c3;
  }

  .login{
    .el-checkbox__label {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
  }
    .el-checkbox__inner {

      border: 2px solid #00a0e9;
    }
    background: url("https://zyunadmin.oss-cn-hangzhou.aliyuncs.com/businessbg.png") no-repeat;

    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    .login-header{
      background-color: #fff;
      height: 100px;
      .zlyun{
        width: 66px;
        height: 42px;
        margin-top: 29px;
        margin-left: 44px;
        margin-right: 23px;
      }
      .zlysxy{
  	      height: 35px;
      }
    }
    .login-body{
      position:relative;
      min-height: 650px;
      height: calc(100% - 200px);
      .loginleftImg{
        position: absolute;
        width: 34%;
        left: 10%;
        top: 50%;
        transform: translate(0,-50%);
        min-width: 450px;
      }

      .login-form{
        position: absolute;
        right: 10%;
        top: 50%;
        width: 27%;
        transform: translate(0,-50%);
        padding-bottom: 60px;
        min-width: 350px;
        max-width: 480px;
      	// height: 600px;
      	background-color: #ffffff;
      	box-shadow: 0px 0px 20px 0px rgba(0, 160, 233, 0.5);
      	border-radius: 10px;
        img{
          width: 100%;
          height: 100%;
          position: absolute;
        }
        .loginbox{
          position:relative;
          form{
            .el-form-item__error {
              color: #f15369;
              line-height: 36px;
              padding-top: 4px;
              position: absolute;
              top: 40px;
              left: 53px;
              height: 36px;
            	background-color: #ffbec7;
            	border-radius: 4px;
            	border: solid 1px #f15369;
              font-size: 14px;
              padding: 0 10px;
              padding-left: 34px;
              box-sizing: border-box;
              &:after{
                content: '';
                position: absolute;
                width:18px;
                height:18px;
                top: 9px;
                left: 10px;
                background: url('https://yuntui.oss-cn-shanghai.aliyuncs.com/pc/cuowu.png') no-repeat center center;
              }
              &:before{
                content: '';
                position: absolute;
                width:12px;
                height:6px;
                top: -4px;
                left:12px;
                background: url('https://yuntui.oss-cn-shanghai.aliyuncs.com/pc/noticezs.png') no-repeat center center;
              }
            }
            padding: 0 10%;
            h1{
              text-align: center;
              color:#2dd1ac;
              margin: 60px 0 50px 0;
              font-family: MicrosoftYaHei-Bold;
            	font-size: 36px;
            	color: #00a0e9;
              line-height: 1;
            }
            .form-group{
              width: 100%;
              margin: 0 auto;
              margin-bottom: 36px;
              position: relative;
              label{
                position: absolute;
                top: 50%;
                margin-top: -11px;
                left: 14px;
                margin-right: 10px;
                z-index: 99;
                width:22px;
                height:24px;
                display: inline-block;
              }
              .nameicon{
                &:before{
                  position:absolute;
                  width:22px;
                  height:24px;
                  content: '';
                  background-image: url("../assets/image/ytuiyh.png");
                  background-size: 22px 24px;
                }
              }
              .mimaicon{
                &:before{
                  position:absolute;
                  width:22px;
                  height:24px;
                  content: '';
                  background-image: url("../assets/image/ytuimm.png");
                  background-size: 22px 24px;
                }
              }
            .yzmicon{
              &:before{
                position:absolute;
                width:22px;
                height:24px;
                content: '';
                background-image: url("../assets/image/ytuiyz.png");
                  background-size: 22px 24px;
              }
            }
              p{
                margin: 0;
                position: absolute;
                top: 50%;
                 margin-top: -14px;

                right: 14px;
                z-index: 99;
                i{
                  font-size: 26px;
                color: #a7b6c3;
                }
                .icon-yanjing{
                  color:#00a0e9;
                }
              }
              .ischange{
                width:28px;
                height:20px;


              }
              input{
                height: 50px;
                width: 100%;
                color: #a7b6c3;
                padding-left: 46px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                outline: none;

font-size: 14px;
border-radius: 4px;


              }
              .el-input__inner{
                border: solid 2px #d2d2d2;
              }
              .verifyImg{
                width: 35%;
                height: 50px;
                background: #a7b6c3;
                position: absolute;
                right: 0;
                top: 0;
                border-radius: 4px;
              }
            }
            .el-checkbox{
              color: #00a0e9;
            }
            .checkInfo{
              margin-bottom: 36px;
              .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
                background-color: #00a0e9;
              }

              .el-checkbox__input.is-checked+.el-checkbox__label{
	font-size: 14px;
	color: #00a0e9;
              }
            }
            .loginBtn{
              font-family: MicrosoftYaHei;
	color: #ffffff;
              width: 100%;
              outline: none;
              cursor: pointer;
              font-size: 20px;

        box-sizing: border-box;
             -webkit-box-sizing: border-box;
	height: 60px;
	background-color: #00a0e9;
	border-radius: 4px;
	border: solid 4px #d3edfb;
              &:hover{
                // background: #27ad8f;
              }
            }
            .el-form-item.is-success .el-input__inner,
            .el-form-item.is-success .el-input__inner:focus,
            .el-form-item.is-success .el-textarea__inner,
            .el-form-item.is-success .el-textarea__inner:focus{
                border-color: #00a0e9 !important;
            }
            .el-form-item.is-error .el-input__inner,
            .el-form-item.is-error .el-input__inner:focus,
            .el-form-item.is-error .el-textarea__inner,
            .el-form-item.is-error .el-textarea__inner:focus,
            .el-message-box__input input.invalid,
            .el-message-box__input input.invalid:focus{
                border-color: #00a0e9 !important;
            }
            .el-form-item.is-success label{
              color: #00a0e9;
            }
            .el-form-item.is-success .nameicon{
                &:before{
                  position:absolute;
                  width:24px;
                  height:26px;
                  content: '';
                    background-image: url("../assets/image/ytuiyhxz.png");
                      background-size: 24px 26px;
                }

            }
          .el-form-item.is-success .mimaicon{
              &:before{
                position:absolute;
                width:24px;
                height:26px;
                content: '';
                  background-image: url("../assets/image/ytuimmxz.png");
                    background-size: 24px 26px;
              }
            }
            .el-form-item.is-success .yzmicon{
              &:before{
                position:absolute;
                width:24px;
                height:26px;
                content: '';
                  background-image: url("../assets/image/ytuiyzxz.png");
                    background-size: 24px 26px;
              }
            }
          }
        }
      }
    }
    .login-footer{
      width: 100%;
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 14px;
      color:#4E546C;
      background:#fff;
      p{
        margin-top: 0;
      }
    }
  }
  @media screen and (max-width: 1000px) {

  }
  @media screen and (min-width: 1000px) and (max-width:1200px){

  }

  @media screen and (min-width: 1200px) and (max-width: 1300px){

  }

  @media screen and (min-width: 1300px) and (max-width: 1460px){

  }
  @media screen and (min-width: 1460px){

  }

</style>
