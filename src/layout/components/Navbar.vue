<template>
  <div class="navbar">
    <hamburger
      v-if="(meunAsideStyle && meunHeadStyle) || (meunAsideStyle && !meunHeadStyle)"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb :class="!meunAsideStyle && meunHeadStyle ? 'headMenu' : ''" class="breadcrumb-container" />

    <div v-if="!meunHeadStyle" class="right-menu">
      <a
        href="javascript:;"
        class="screen"
        :class="isFullscreen ? 'exit-screen' : 'full-screen'"
        :title="isFullscreen ? $t('public.exitFullScreen') : $t('public.screen')"
        @click="handleScreen"
      >
        {{ isFullscreen ? $t('public.exitFullScreen') : $t('public.screen') }}
      </a>
      <!-- <ThemePicker @change="themeChange" /> -->
      <div class="m-dropdown">
        <el-dropdown @command="handleLang">
          <span class="el-dropdown-link" :style="{ color: theme }">
            {{ curlang }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in langlist" :key="index" :disabled="item.disabled" :divided="item.divided" :command="item.id">{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="m-dropdown">
        <div class="m-photo">
          <img :src="headPortrait" />
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link" :style="{ color: theme }">
            {{userInfo.userName||""}}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in droplist" :key="index" :command="item.command">{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import screenfull from 'screenfull'
import Cookies from 'js-cookie'
import {isInclude,isType} from "@/utils"
import { queryTellerById } from '@/api/login/user'
import headPortrait from "@/assets/images/user.png"
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  props: {
    meunAsideStyle: {
      type: Boolean,
      default: false
    },
    meunHeadStyle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      iconClass: 'el-icon-s-fold',
      isFullscreen: false,
      curlang: Cookies.get('language') === 'en-US' ? this.$t('public.test.lang.en') : this.$t('public.test.lang.cn'),
      langlist: [
        {
          name: this.$t('public.test.lang.lang'),
          disabled: true,
          id: 'lang'
        },
        {
          name: this.$t('public.test.lang.cn'),
          divided: true,
          id: 'zh-CN'
        },
        {
          name: this.$t('public.test.lang.en'),
          id: 'en-US'
        },

        {
          name: this.$t('public.test.theme.theme'),
          disabled: true,
          id: 'theme'
        },
        {
          name: this.$t('public.test.theme.blue'),
          id: 'blue'
        },
        {
          name: this.$t('public.test.theme.red'),
          id: 'red'
        },
        {
          name: this.$t('public.test.layout.layout'),
          divided: true,
          disabled: true,
          id: 'layout'
        },
        {
          name: this.$t('public.test.layout.All'),
          divided: true,
          id: 'All'
        },
        {
          name: this.$t('public.test.layout.Aside'),
          id: 'Aside'
        },
        {
          name: this.$t('public.test.layout.Header'),
          id: 'Header'
        },
        {
          name: this.$t('public.test.layout.OneHeader'),
          id: 'OneHeader'
        },
        {
          name: this.$t('public.test.layout.OneAside'),
          id: 'OneAside'
        }
      ],
      droplist: [
        // { name: this.$t('public.changePassword'), command: 'password' },
        { name: this.$t('public.exit'), command: 'exit' },
      ]
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
    theme() {
      return this.$store.state.settings.theme
    },
    headPortrait(){
      return this.$store.state.settings.headPortrait
    },
    userInfo(){
      let userInfo = this.$store.getters.userInfo !== "" ? this.$store.getters.userInfo : window.sessionStorage.getItem("userInfo")
      return userInfo ? JSON.parse(userInfo) : {}
    }
  },
  watch:{
    headPortrait:{
      handler(oldVal,newVal){
        if(!this.meunHeadStyle&&this.headPortrait === ""){
          const menuQueryData = {
            'Header': {
              'TranTeller': this.userInfo.tellerId
            },
            tellerId: this.userInfo.tellerId
          }
          queryTellerById(menuQueryData).then(res=>{
            if(isInclude(res,"tellerBaseMap")&&isInclude(res.tellerBaseMap,"headPortrait")&&res.tellerBaseMap.headPortrait.length>10){
              this.$store.dispatch('settings/changeSetting', { key: 'headPortrait', value: res.tellerBaseMap.headPortrait })
            }else{
              this.$store.dispatch('settings/changeSetting', { key: 'headPortrait', value: headPortrait })
            }
          })
        }
      },
      immediate:true
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    // 语言切换
    handleLang(command) {
      if (command === 'zh-CN' || command === 'en-US') {
        Cookies.set('language', command)
        history.go(0)
      } else {
        switch (command) {
          case 'Aside':
            this.$store.commit('settings/CHANGE_SETTING', { key: 'meunAsideStyle', value: true })
            this.$store.commit('settings/CHANGE_SETTING', { key: 'meunHeadStyle', value: false })
            break
          case 'Header':
            this.$store.commit('settings/CHANGE_SETTING', { key: 'meunAsideStyle', value: false })
            this.$store.commit('settings/CHANGE_SETTING', { key: 'meunHeadStyle', value: true })
            break
          case 'All':
            this.$store.commit('settings/CHANGE_SETTING', { key: 'meunAsideStyle', value: true })
            this.$store.commit('settings/CHANGE_SETTING', { key: 'meunHeadStyle', value: true })
            break
          case 'OneHeader':
            this.$store.commit('settings/CHANGE_SETTING', { key: 'meunAsideStyle', value: true })
            this.$store.commit('settings/CHANGE_SETTING', { key: 'meunHeadStyle', value: true })
            this.$store.dispatch('settings/changeSetting', { key: 'HeaderOneLevel', value: true })
            break
          case 'OneAside':
            this.$store.commit('settings/CHANGE_SETTING', { key: 'meunAsideStyle', value: true })
            this.$store.commit('settings/CHANGE_SETTING', { key: 'meunHeadStyle', value: true })
            this.$store.dispatch('settings/changeSetting', { key: 'HeaderOneLevel', value: false })
            break
          case 'red':
            this.$store.commit('settings/CHANGE_SETTING', { key: 'theme', value: '#CF1322' })
            break
          case 'blue':
            this.$store.commit('settings/CHANGE_SETTING', { key: 'theme', value: '#43A3FB' })
            break
          default:
            debugger
            this.$store.commit('settings/CHANGE_SETTING', { key: 'HeaderOneLevel', value: true })
            this.$store.commit('settings/CHANGE_SETTING', { key: 'meunAsideStyle', value: true })
            this.$store.commit('settings/CHANGE_SETTING', { key: 'meunHeadStyle', value: true })
        }
      }
    },
    handleCommand(command) {
      this.$store.dispatch('user/logout', this.userInfo.userId).then(async() => {
        this.$router.push({ path: '/login' })
      }).catch(() => {})
    },
    handleIcon() {
      if (this.iconClass === 'el-icon-s-fold') {
        this.iconClass = 'el-icon-s-unfold'
        // todo...
      } else {
        this.iconClass = 'el-icon-s-fold'
        // todo...
      }
    },
    handleScreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  // box-shadow: 0 1px 15px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
    &.headMenu {
      margin-left: 15px;
    }
  }

  .right-menu {
    float: right;
    height: 56px;
    line-height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-right: 15px;
    &:focus {
      outline: none;
    }

    a {
      margin-right: 10px;
      &.screen {
        width: 16px;
        height: 16px;
        color: #333;
        text-indent: -20000px;
        &.exit-screen {
          background: url(../../assets/images/exit_screen.png) no-repeat center center;
          background-size: contain;
        }
        &.full-screen {
          background: url(../../assets/images/full_screen.png) no-repeat center center;
          background-size: contain;
        }
      }
    }
    .m-dropdown {
      margin-left: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .m-photo {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        align-content: center;
        margin-right: 5px;
        color: #409eff;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }
}
</style>
