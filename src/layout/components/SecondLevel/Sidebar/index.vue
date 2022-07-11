<template>
  <div :class="{ 'has-logo': showLogo }" :style="{backgroundColor:menuStyle.menuBg}">
    <logo v-if="showLogo" :meun-aside-style="meunAsideStyle" :meun-head-style="meunHeadStyle" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="menuStyle.menuBg"
        :text-color="menuStyle.menuText"
        :unique-opened="false"
        :active-text-color="theme"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import Bus from '@/bus'
export default {
  components: { SidebarItem, Logo },
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
      menuList: []
    }
  },
  created() {
    Bus.$on('renderMenu', data => {
      this.menuList = data
      this.$forceUpdate()
    })
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    theme() {
      return this.$store.state.settings.theme
    },
    routes() {
      if (this.meunAsideStyle && this.meunHeadStyle) {
        return this.menuList
      } else {
        return this.$store.getters.permission_routes
      }
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    menuStyle(){
      return this.$store.state.settings.menuStyle
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
