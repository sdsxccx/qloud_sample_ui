/*
 * @Descripttion: 接口调用方法封装demo
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-04 10:40:51
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-08-24 18:03:06
 */
import { mergeMethods } from "@/api/sample/serveData.js";
import request from "@/utils/request";

//demo
export function demoMethods(data) {
  return request({
    url: "/table/list",
    method: "get",
    data,
  });
}
