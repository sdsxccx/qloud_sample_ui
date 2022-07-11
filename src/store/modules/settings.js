/*
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-04 10:33:58
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-08-08 13:40:04
 */
import defaultSettings from "@/settings";
import variables from "@/styles/variables.scss";
const {
  showSettings,
  fixedHeader,
  sidebarLogo,
  pageSizes,
  pageLayout,
  pagerCount,
  size,
  tagsView,
  isMenuChangingOver,
} = defaultSettings;

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  pageSizes: pageSizes,
  pageLayout: pageLayout,
  pagerCount: pagerCount,
  size: size,
  tagsView: tagsView,
  theme: variables.primaryColor,
  meunAsideStyle: isMenuChangingOver.Aside,
  meunHeadStyle: isMenuChangingOver.Header,
  HeaderOneLevel: isMenuChangingOver.HeaderOneLevel,
  headPortrait: "",
  tableStyle: {
    tableHeaderBackgroundColor: variables.tableHeaderBackgroundColor,
    tableBorderTop: variables.tableBorderTop,
    tableColor: variables.tableColor,
  },
  menuStyle: {
    menuText: variables.menuText,
    menuHeadText: variables.menuHeadText,
    menuActiveText: variables.menuActiveText,
    subMenuActiveText: variables.subMenuActiveText, //https://github.com/ElemeFE/element/issues/12951

    //导航顶左hover时背景颜色
    menuHover: variables.menuHover,
    subMenuHover: variables.subMenuHover,

    //导航顶左背景颜色
    menuBg: variables.menuBg,
    menuHeadBg: variables.menuHeadBg,
    subMenuBg: variables.subMenuBg,

    //左侧导航宽度
    sideBarWidth: variables.sideBarWidth,
  },
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
};

const actions = {
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  },
};
const getters = {
  appMainHeight(state) {
    if (state.meunHeadStyle) {
      return "calc(100vh - 140px)";
    } else {
      return "calc(100vh - 84px)";
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
