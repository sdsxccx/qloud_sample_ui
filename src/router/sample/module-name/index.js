/*
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-07-28 09:21:25
 * @LastEditors: tangpy
 * @LastEditTime: 2020-11-12 15:59:47
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
        path: "/Layout/Table",
        name: "Table",
        redirect: "/Layout/Table/Table1",
        component: "two-router",
        meta: {
          title: "Table",
          icon: "peoples",
        },
        children: [
          {
            path: "/Layout/Table/Table1",
            name: "Table",
            component: "table1",
            meta: {
              title: "基础表格",
              icon: "peoples",
            },
          },
          {
            path: "/Layout/Table/Table2",
            name: "Table",
            component: "table2",
            meta: {
              title: "操作列",
              icon: "peoples",
            },
          },
          {
            path: "/Layout/Table/Table3",
            name: "Table",
            component: "table3",
            meta: {
              title: "分页",
              icon: "peoples",
            },
          },
          {
            path: "/Layout/Table/Table4",
            name: "Table",
            component: "table4",
            meta: {
              title: "单选表格",
              icon: "peoples",
            },
          },
          {
            path: "/Layout/Table/Table5",
            name: "Table",
            component: "table5",
            meta: {
              title: "多选表格",
              icon: "peoples",
            },
          },
        ],
      },
      {
        path: "/Layout/treeTable",
        name: "treeTable",
        component: "tree-table",
        meta: {
          title: "树列表",
          icon: "peoples",
        },
        children: [
          {
            path: "/a/four",
            name: "four",
            component: "Table",
            meta: {
              title: "子项001",
              icon: "",
            },
          },
          {
            path: "/four1",
            name: "four1",
            component: "Popup-view",
            meta: {
              title: "子项002",
              icon: "",
            },
          },
        ],
      },
      // {
      //   path: "/Layout/transfer",
      //   name: "transfer",
      //   component: "transfer",
      //   meta: {
      //     title: "transfer",
      //     icon: "peoples",
      //   },
      // },
      {
        path: "/Layout/Form",
        name: "Form",
        component: "Form",
        meta: {
          title: "Form表单",
          icon: "icon",
        },
      },
      {
        path: "/Layout/Popup",
        name: "Popup",
        component: "Popup-view",
        meta: {
          title: "Popup",
          icon: "component",
        },
      },
      {
        path: "/Layout/selectTree",
        name: "selectTree",
        component: "Select-tree-view",
        meta: {
          title: "selectTree",
          icon: "component",
        },
      },
    ],
  },
];
