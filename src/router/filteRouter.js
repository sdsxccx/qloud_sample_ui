/*
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-09-03 10:02:55
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-09-15 18:02:28
 */

import { isType, isInclude } from "@/utils";
//import { doOtherInfo } from '@/utils/ssp/get-router'

const obj = {}; //对本地路由去重合路径的保存
let myRoutes = []; //本地路由合并后的集合
let routerData = []; //合并后的本地路由转平铺集合
// 数组对象去重合并
const unique = (arr) => {
  const res = new Map();
  return arr.filter((arr) => !res.has(arr.path) && res.set(arr.path, 1));
};
/**
 * 对第一层和第二层做去重
 * @param {*} arr
 */
const mergeArr = (arr) => {
  return arr.reduce((item, next, index, arr) => {
    if (!obj[next.path]) {
      obj[next.path] = true && item.push(next);
    }
    item.forEach((cur) => {
      if (cur.path === next.path) {
        if (
          Object.prototype.hasOwnProperty.call(next, "children") &&
          isType.isArray(next.children) &&
          next.children.length > 0
        ) {
          cur.children = unique(cur.children.concat(next.children));
        }
      }
    });
    return item;
  }, []);
};
// 合并本地路由
const routerContext = require.context("./", true, /index\.js$/);
routerContext.keys().forEach((route) => {
  if (route.startsWith("./index")) {
    return;
  }
  /*   if (route.startsWith('./filteRouter')) {
      return
    } */
  const routerModule = routerContext(route);
  myRoutes = [...myRoutes, ...(routerModule.default || routerModule)];
});
myRoutes = mergeArr(myRoutes);

doTiledRouter(myRoutes);

/**
 * 将配置合并后的路由信息转平铺
 * @param  node
 */
function doTiledRouter(node) {
  return node.map((item) => {
    routerData.push(item);
    if (
      isInclude(item, "children") &&
      isType.isArray(item.children) &&
      item.children.length > 0
    ) {
      doTiledRouter(item.children);
    }
    return item;
  });
}

/**
 * 通过路径获取本地路由扩展属性值
 * @param {*} path
 */
function doOtherInfo(path) {
  let routerExtend = {};
  for (var i = 0; i < routerData.length; i++) {
    if (routerData[i].path === path) {
      routerExtend = {
        component: routerData[i].component,
        alwaysShow: isInclude(routerData[i], "alwaysShow")
          ? routerData[i].alwaysShow
          : false,
        redirect: isInclude(routerData[i], "redirect")
          ? routerData[i].redirect
          : "",
        meta: isInclude(routerData[i], "meta") ? routerData[i].meta : {},
        hidden: isInclude(routerData[i], "hidden")
          ? routerData[i].hidden
          : false,
      };
      break;
    }
  }
  return routerExtend;
}

const hasPower = (node, filteList, key) => {
  var key = node[key];
  return filteList.some((item) => item === key);
};
/**
 * @Author: liguanghui
 * @Descripttion:   数组对象筛选（通过接口获取全量的菜单树，根据登录用户的路由权限，返回相应的路由树）
 * @param {node}        筛选的数组
 * @param {parent}      筛选层级的上一级，顶层为空
 * @param {index}       筛选层级在数组的位置，顶层为0
 * @param {filteList}   筛选的条件数组
 * @return {node}       筛选后的新数组
 */
export function filteNode(node, parent, index, filteList, key) {
  if (isType.isArray(node)) {
    for (var i = node.length - 1; i >= 0; i--) {
      /*       if (!isInclude(node[i], key)) return;
      if (hasPower(node, filteList, key)) {
        filteNode(node[i], node, i, filteList, key);
      }  */
      filteNode(node[i], node, i, filteList, key);
    }
  } else {
    if (node.childrens && isType.isArray(node.childrens)) {
      for (var i = node.childrens.length - 1; i >= 0; i--) {
        if (!isInclude(node.childrens[i], key)) return;
        filteNode(node.childrens[i], node.childrens, i, filteList, key);
      }
    }
    if (
      (!node.childrens || node.childrens.length === 0) &&
      hasPower(node, filteList, key) === false
    ) {
      parent.splice(index, 1);
    }
  }
  return node;
}

/**
 * 填充路由中其他信息的值
 * @param  node
 */
export function paddingRouter(node) {
  return node.map((item) => {
    //包含component，即检索到path对应的值。对于权限路径配置错误的或者不在该工程下的则不显示
    let routerExtend = doOtherInfo(item.linkUrl);
    if (isInclude(routerExtend, "component")) {
      item.path = item.linkUrl;
      item.name = item.linkUrl;
      item.meta = {
        icon: isInclude(item, "menuIcon") ? item.menuIcon : "",
        title: isInclude(item, "sourceName") ? item.sourceName : "",
      };
      item.component = routerExtend.component;
      //item.hidden = item.statusId === "ENABLED" ? false : true;
      item.hidden = routerExtend.hidden;
      item.alwaysShow = routerExtend.alwaysShow;
      if (isInclude(routerExtend.meta, "activeMenu")) {
        item.meta.activeMenu = routerExtend.meta.activeMenu;
      }
      if (routerExtend.redirect !== "") {
        item.redirect = routerExtend.redirect;
      }
      delete item.linkUrl;
      delete item.description;
      delete item.menuIcon;
      delete item.menuPosition;
      delete item.menuType;
      if (
        isInclude(item, "childrens") &&
        isType.isArray(item.childrens) &&
        item.childrens.length > 0
      ) {
        //判断子节点中的路径是否在项目中配置
        item.children = [];
        for (var i = 0; i < item.childrens.length; i++) {
          let routerChildrenExtend = doOtherInfo(item.childrens[i].linkUrl);
          if (isInclude(routerChildrenExtend, "component")) {
            //将配置了的路径添加到动态路由中
            item.children.push(item.childrens[i]);
            delete item.childrens[i];
          }
        }
        //删除菜单权限返回的childrens(加载路由用到的是children，无s)
        delete item.childrens;
        if (item.children.length > 0) {
          paddingRouter(item.children);
        }
      }
      return item;
    } else {
      return [];
    }
  });
}

/**
 * 获取静态路由信息
 * @param  node
 */
export function getStaticRouter(node) {
  return myRoutes;
}
