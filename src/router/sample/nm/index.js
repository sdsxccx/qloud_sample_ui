/*
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-21 16:44:46
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-09-07 17:20:00
 */
export default [
  {
    path: "/Lay",
    name: "Lay",
    component: "Layout",
    redirect: "/Lay/Popup2",
    meta: {
      title: "我的客群",
      icon: "user",
    },
    children: [
      {
        path: "/Lay/Popup2",
        name: "Form1",
        component: "Form.vue",
        meta: {
          title: "Form1",
          icon: "component",
        },
      },
      {
        path: "/Lay/Popup3",
        name: "Form2",
        component: "Form.vue",
        meta: {
          title: "Form2",
          icon: "component",
        },
      },
    ],
  },
];
