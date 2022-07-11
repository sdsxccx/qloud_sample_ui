<template>
  <section class="app-main" :style="{height:appMainHeight}">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
    appMainHeight(){
      return this.$store.getters["settings/appMainHeight"]
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/styles/variables.scss";
.app-main {
  /*50 = navbar  */
	padding: $appMainPadding;
  background-color: $appMainBackground;
  width: 100%;
  position: relative;
	box-sizing: border-box;
  overflow: auto;
  display: flex;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
