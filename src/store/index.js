/*
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-04 10:33:58
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-08-08 13:39:48
 */
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
Vue.use(Vuex);

const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  let moduleName = modulePath
    .replace(/^\.\/(.*)\.\w+$/, "$1")
    .replace(/[*/]/g, "_");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
const store = new Vuex.Store({
  modules: {
    ...modules,
  },
  getters,
});
export default store;
