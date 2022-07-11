/*
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-07-28 09:21:25
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-09-07 17:19:48
 */
export default [
  {
    path: "/Layout",
    name: "Layout",
    component: "Layout",
    redirect: "/Layout/Table",
    meta: {
      title: "首页",
      icon: "user",
    },
    children: [
      {
        path: "/Layout/Popup1",
        name: "Popup1",
        component: "popup-view1.vue",
        meta: {
          title: "Popup1",
          icon: "component",
        },
      },
    ],
  },
];
