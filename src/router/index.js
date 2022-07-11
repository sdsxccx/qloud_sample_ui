/*
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-24 14:53:37
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-09-09 16:15:35
 */
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/",
    redirect: "/Layout/Table",
    hidden: true,
  },
];
export const asyncRoutes = [
  //...myRoutes,
  { path: "*", redirect: "/404", hidden: true },
];
const createRouter = (routerList) =>
  new Router({
    // mode: 'history', // require service support
    mode: "hash",
    scrollBehavior: () => ({ y: 0 }),
    routes: routerList,
  });
const router = createRouter(constantRoutes);

// 重置路由 see https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter(routerList = constantRoutes) {
  const newRouter = createRouter(routerList);
  router.matcher = newRouter.matcher;
}

export default router;
