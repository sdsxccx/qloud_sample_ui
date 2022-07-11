<template>
  <div class="sidebar-logo-container"
  :style="{backgroundColor:!meunAsideStyle ? variables.menuBg : variables.menuHeadBg}"
  v-if="!meunAsideStyle&&meunHeadStyle">
    <router-link key="expand"
    class="sidebar-logo-link"
    :class="meunAsideStyle&&meunHeadStyle ? 'all-meun' : ''"
    to="/">
      <img v-if="logo" :src="logo" class="sidebar-logo">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props:{
    meunAsideStyle:{
      type:Boolean,
      default:false
    },
    meunHeadStyle:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      title: 'qloud_ssp',
      logo: require("@/assets/images/logo/logo_large.png")
    }
  },
  computed:{
    variables() {
      return this.$store.state.settings.menuStyle
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';
.sidebar-logo-container {
  text-align: center;
  overflow: hidden;
  width: 210px;
  height: 56px;
  box-sizing: border-box;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 0 10px;
    &.all-meun{
      padding-left: 15px;
    }
    & .sidebar-logo {
      width: 180px;
      height: 50px;
    }
  }
}
</style>
