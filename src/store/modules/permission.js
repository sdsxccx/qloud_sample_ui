/*
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-18 19:55:32
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-09-11 14:06:26
 */
import { asyncRoutes, constantRoutes } from "@/router";
import { isInclude, deepClone, getVUERouters } from "@/utils";
import { queryMenuListForTree, queryTellerById } from "@/api/login/user";
import {
  filteNode,
  paddingRouter,
  getStaticRouter,
} from "@/router/filteRouter";
import { getUserToken } from "@/utils/auth";
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const state = {
  routes: [],
  addRoutes: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};

const actions = {
  generateRoutes({ commit }, roles) {
    //动态路由开始

    /*     return new Promise(resolve => {
      //获取所有的菜单信息  开始
      const userInfo = getUserToken() ? JSON.parse(getUserToken()) : JSON.parse(window.sessionStorage.getItem("userInfo")) || {};
      const menuQueryData = {
        'Header': {
          'TranTeller': userInfo.tellerId
        },
        tellerId: userInfo.tellerId
        //systemId: "A13"
      }
      let accessedRoutes = [];
      queryTellerById(menuQueryData).then((response) => {
        queryMenuListForTree(menuQueryData).then(async (res) => {
          if (isInclude(res, 'menuList') && res.menuList.length > 0 && isInclude(res.menuList[0], 'childrens')) {
            for (var i = 0; i < res.menuList[0].childrens.length; i++) {
              //获取系统配置的所有菜单信息
              // res.menuList[0].childrens[i].childrens[0].childrens 是平铺菜单
              // res.menuList[0].childrens[i].childrens[1].childrens 是树形菜单
              let getMenuList = res.menuList[0].childrens[i].childrens[1].childrens;
              //response.tellerBaseMap.routePermission 获取登录用户可访问的所有路由路径(array格式)
              //通过权限下所有可访问的路径，对菜单树进行了筛选
              let result = filteNode(getMenuList, "", 0, response.tellerBaseMap.routePermission, "linkUrl");
              //通过各自项目中配置的路由信息，将hidden、alwaysShow、activeMenu等信息填充到动态路由中
              let resultend = paddingRouter(result);
              accessedRoutes = [...accessedRoutes, ...(getVUERouters(resultend))]
            }
            console.log("路由信息获取完毕!");
          } else {
            console.log("获取路由的接口调用返回数据中不包含menuList");
          }
          accessedRoutes = [...accessedRoutes, ...asyncRoutes];
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }).catch(error => {
          accessedRoutes = [...accessedRoutes, ...asyncRoutes];
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
          console.log("路由信息获取失败，发生异常:", error);
        });
      });
    });
 */

    //动态路由结束

    //静态路由开始

    return new Promise((resolve) => {
      let staticRouter = getStaticRouter();
      let accessedRoutes = getVUERouters(staticRouter);
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
      //获取所有的菜单信息  结束
    });

    //静态路由结束
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
