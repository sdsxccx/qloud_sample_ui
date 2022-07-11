/*
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-10 14:53:21
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-08-19 17:51:59
 */
// const fs = require('fs')
// const path = require('path')
// const resolve = (dir) => path.join(__dirname, '../../', dir);
// fs.readFile(resolve("main.js"), 'utf-8', (err, data) => {
//   try {
//     console.log(data);
//   } catch (err) {
//     throw new Error(err);
//   }
// });
export { default as Navbar } from "./Navbar";
export { default as Sidebar } from "./SecondLevel/Sidebar";
export { default as HeadNavbar } from "./SecondLevel/HeadNavbar";
export { default as AppMain } from "./AppMain";
export { default as TagsView } from "./TagsView";
export { default as oneSidebar } from "./OneLevel/Sidebar";
export { default as oneHeadNavbar } from "./OneLevel/HeadNavbar";
