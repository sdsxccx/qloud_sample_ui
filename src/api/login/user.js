/*
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-26 10:00:46
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-09-07 16:54:59
 */
import { mergeMethods } from "./serveData";
import request from "@/utils/request";
// 登录
export function login(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sgp/sgpTellerLogin.auth",
    method: "post",
    data,
  });
}
// 获取验证码
export function getLonginCode(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sgp/queryVerificationCode.auth",
    method: "post",
    data,
  });
}

// 获取登录方式
export function getVerificationWay(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sgp/getVerificationWay.auth",
    method: "post",
    data,
  });
}

//获取登出方式
export function sgpTellerLogout(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sgp/sgpTellerLogout.auth",
    method: "post",
    data,
  });
}
export function getInfo(token) {
  return request({
    url: "/vue-element-admin/user/info",
    method: "get",
    params: { token },
  });
}

//通过用户ID获取用户信息
export function queryTellerById(data) {
  return request({
    url: "/queryTellerById",
    method: "post",
    data: mergeMethods(data),
  });
}

//获取所有的菜单信息
export function queryMenuListForTree(data) {
  return request({
    url: "/queryMenuListForTree",
    method: "post",
    data: mergeMethods(data),
  });
}

//根据登录号查询密码策略
export function queryPlanByUserLoginId(data) {
  return request({
    url: "/queryPlanByUserLoginId",
    method: "post",
    data: mergeMethods(data),
  });
}

//修改密码
export function modifyPwd(data) {
  return request({
    url: "/modifyPwd",
    method: "post",
    data: mergeMethods(data),
  });
}

//下载接口调用,用于image-upload.vue文件进行反显图片
export function minioDownload(data) {
  var data = mergeMethods(data);
  return request({
    url: "/minioDownLoadFile",
    method: "post",
    data,
  });
}
