<template>
  <div id="app"><router-view /></div>
</template>

<script>
import variables from '@/styles/variables.scss'
import { removeToken,removeUserToken } from '@/utils/auth'
export default {
  name: 'App',
  computed: {
    THEME() {
      return this.$store.state.settings.theme
    }
  },
  data(){
    return{
      differTime:0,
      beginTime:0
    }
  },
  watch: {
    THEME: {
      handler(val, oldVal) {
        const body = document.querySelector('body')
        if (val === '#43A3FB') {
          this.removeClass(body, 'theme_CF1322')
          this.addClass(body, 'theme_43A3FB')
          let storeObj = {
            menuStyle:{
              menuText:variables.menuText,
              menuHeadText:variables.menuHeadText,
              menuActiveText:variables.menuActiveText,
              subMenuActiveText:variables.subMenuActiveText,
              menuHover:variables.menuHover,
              subMenuHover:variables.subMenuHover,
              menuBg:variables.menuBg,
              menuHeadBg:variables.menuHeadBg,
              subMenuBg:variables.subMenuBg,
              sideBarWidth: variables.sideBarWidth,
            },
            tableStyle:{
              tableHeaderBackgroundColor: variables.tableHeaderBackgroundColor,
              tableBorderTop: variables.tableBorderTop,
              tableColor: variables.tableColor,
            }
          }
          this.$store.commit('settings/CHANGE_SETTING', { key: 'tableStyle', value: storeObj.tableStyle })
          this.$store.commit('settings/CHANGE_SETTING', { key: 'menuStyle', value: storeObj.menuStyle })
        } else {
          this.removeClass(body, 'theme_43A3FB')
          this.addClass(body, 'theme_CF1322')
          let storeObj = {
            menuStyle:{
              menuText:"#333",
              menuHeadText:"#333",
              menuActiveText:"#CF1322",
              subMenuActiveText:"#CF1322",
              menuHover:"#FFF0F0",
              subMenuHover:"#FFF0F0",
              menuBg:"#fff",
              menuHeadBg:"#fff",
              subMenuBg:"#2C1D4F",
              sideBarWidth: variables.sideBarWidth,
            },
            tableStyle:{
              tableHeaderBackgroundColor: "#FFF0F0",
              tableBorderTop: "#FFF0F0 ",
              tableColor: "#666",
            }
          }
          this.$store.commit('settings/CHANGE_SETTING', { key: 'tableStyle', value: storeObj.tableStyle })
          this.$store.commit('settings/CHANGE_SETTING', { key: 'menuStyle', value: storeObj.menuStyle })
        }
      },
      immediate: true
    }
  },
  mounted(){
    let storeObj = {
      menuStyle:{
        menuText:variables.menuText,
        menuHeadText:variables.menuHeadText,
        menuActiveText:variables.menuActiveText,
        subMenuActiveText:variables.subMenuActiveText,
        menuHover:variables.menuHover,
        subMenuHover:variables.subMenuHover,
        menuBg:variables.menuBg,
        menuHeadBg:variables.menuHeadBg,
        subMenuBg:variables.subMenuBg,
        sideBarWidth: variables.sideBarWidth,
      },
      tableStyle:{
        tableHeaderBackgroundColor: variables.tableHeaderBackgroundColor,
        tableBorderTop: variables.tableBorderTop,
        tableColor: variables.tableColor,
      }
    }
    this.$store.commit('settings/CHANGE_SETTING', { key: 'tableStyle', value: storeObj.tableStyle })
    this.$store.commit('settings/CHANGE_SETTING', { key: 'menuStyle', value: storeObj.menuStyle })
    const body = document.querySelector('body')
    this.removeClass(body, 'theme_CF1322')
    this.addClass(body, 'theme_43A3FB')
    // 判断是否关闭当前窗口
    window.addEventListener("unload",this.unloadFn,false)
    window.addEventListener("beforeunload",this.beforeunloadFn,false)
  },
  methods: {
    hasClass(vnode, cls) {
      return vnode.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
    },
    addClass(vnode, cls) {
      if (!this.hasClass(vnode, cls)) vnode.className = cls
    },
    removeClass(vnode, cls) {
      if (this.hasClass(vnode, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        vnode.className = vnode.className.replace(reg, ' ')
      }
    },
    unloadFn(){
      this.differTime = new Date().getTime() - this.beginTime;
      if(this.differTime <= 5){
        removeToken();
        removeUserToken();
      }
    },
    beforeunloadFn(){
      this.beginTime = new Date().getTime();
    }
  }
}
</script>
