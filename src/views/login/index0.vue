<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-width="80px"
      size="medium"
      autocomplete="on"
      label-position="right"
    >
      <div class="title-container">
        <h2 class="title" title="Login Form" />
        <h3 class="login_title">{{ $t('public.login.login') }}</h3>
      </div>

      <el-form-item prop="username" :label="$t('public.login.username')">
        <!-- <span class="svg-container"><svg-icon icon-class="user" /></span> -->
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="getPlaceholderMsg($t('public.login.username'))"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password" :label="$t('public.login.password')">
          <!-- <span class="svg-container"><svg-icon icon-class="password" /></span> -->
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="getPlaceholderMsg($t('public.login.password'))"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="renderPassword"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /></span>
        </el-form-item>
      </el-tooltip>

      <el-form-item prop="verifyCode" :label="$t('public.login.code')">
        <!-- <span class="svg-container">
          <i class="el-icon-key" />
        </span> -->
        <el-input
          ref="verifyCode"
          v-model="loginForm.verifyCode"
          type="text"
          :placeholder="getPlaceholderMsg($t('public.login.code'))"
          name="verifyCode"
          tabindex="3"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="getLonginCodeData">
          <img class="code-img" :src="code_url">
        </span>

      </el-form-item>

      <el-button
        :loading="loading"
        size="medium"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >{{ $t('public.login.login') }}</el-button>

      <!-- <div style="position:relative">
        <div class="tips">
          <span>username : admin</span>
          <span>Password : any</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">username : editor</span>
          <span>Password : any</span>
        </div>

        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          Or connect with
        </el-button>
      </div> -->
    </el-form>

    <!-- <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog> -->
  </div>
</template>

<script>
// import { validusername } from '@/utils/validate'
import { getLonginCode, getVerificationWay } from '@/api/login/user.js'
import { isType, isInclude } from '@/utils'
import { getPlaceholderMsg } from '@/utils/i18Util.js'
import { encodepwdSM3 } from '@/utils/crypto-js.js'
import { validateForm,validateItem } from '@/utils/form-validate.js'
import {reg_exp} from '@/utils/reg.js'
// import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  // components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback, name, reg, ErrorMsg) => {
      console.log(ErrorMsg)
      // if (!validusername(value)) {
      //   callback(new Error('Please enter the correct user name'))
      // } else {
      callback()
      // }
    }
    const validatePassword = (rule, value, callback, name, reg, ErrorMsg) => {
      console.log(ErrorMsg)
      callback()
    }
    return {
      loginForm: {
        username: '',
        password: '',
        verifyCode: ''
      },
      code_url: '',
      loginRules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            validateForm(rule, value, callback, this.$t('public.login.username'),"",this.$t('public.login.userErr'),validateUsername)
          }
        }],
        password: [
          { required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            validateForm(rule, value, callback, this.$t('public.login.password'),"",this.$t('public.login.passErr'),validatePassword)
          }
        }],
        verifyCode: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              validateForm(rule, value, callback, this.$t('public.login.code'),reg_exp.verifyCode,this.$t('public.login.codeErr'),validateItem)
            }
          }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan,false)
    this.getLonginCodeData()
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan,false)
  },
  methods: {
    getPlaceholderMsg(msg) {
      return getPlaceholderMsg(msg)
    },
    // 获取验证码
    getLonginCodeData() {
      getLonginCode({}).then(response => {
        if (isInclude(response, 'verifyCode') && isType.isString(response.verifyCode)) {
          this.code_url = `data:image/png;base64,${response.verifyCode}`
        }
      }).catch(e => {
        this.$handleError('获取验证码失败！')
      })
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 密码加密
    renderPassword() {
      this.capsTooltip = false
      this.loginForm.password = encodepwdSM3(this.loginForm.password)
    },
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const data = { apiUserId: this.loginForm.username }
          getVerificationWay(data).then(res => {
            if (isInclude(res, 'ways') && isType.isObject(res.ways) && isInclude(res.ways, 'rule')) {
              const data = Object.assign({ rule: res.ways.rule }, this.loginForm)
              this.loading = true
              this.$store.dispatch('user/login', data).then(async() => {
                this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                this.loading = false
              }).catch(() => {
                this.loginForm.verifyCode=''; // 解决验证码输入错误,enter会持续触发问题 liuhan
                this.getLonginCodeData()
                this.loading = false
              })
            } else if(isInclude(res, 'ways') && isType.isObject(res.ways) && !isInclude(res.ways, 'rule')){
              this.$handleError("用户未授权，请联系管理员!");
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #fff;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      border-radius: 0px;
      color: #606266;
      // padding: 12px 5px 12px 15px;
      // caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #606266 !important;
      }
    }
  }

  .el-form-item {
    .el-form-item__label{
      font-weight: normal;
    }
    .el-form-item__content{
      border: 1px solid #DCDFE6;
      border-radius: 5px;
      color: #454545;
    }
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
  background: url("../../assets/images/login_bg.png") no-repeat center center;
  background-size: cover;
  background-color: $bg;
  overflow: hidden;
  position: relative;

  .login-form {
    position: absolute;
    width: 640px;
    padding: 85px 125px 175px;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    box-shadow: 2px 0 13px 0 rgba(134,150,206,0.63);
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0 5px 0 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      width: 182px;
      height: 62px;
      text-align: center;
      font-weight: bold;
      background: url(../../assets/images/logo/logo_large.png) no-repeat center center;
      background-size: contain;
    }
    .login_title{
      font-size: 28px;
      color: #666;
      text-align: center;
      margin: 0px auto 20px auto;
    }
  }

  .show-pwd {
    position: absolute;
    right: 5px;
    top: 0;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
