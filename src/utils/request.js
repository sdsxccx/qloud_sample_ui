/*
 * @Author: liguanghui
 * @Date: 2020-07-29 09:26:59
 * @Last Modified by: liguanghui
 * @Last Modified time: 2020-07-29 11:16:06
 */
import axios from "axios";
import { Message } from "element-ui";
import router from "@/router/index.js";
import { getToken } from "@/utils/auth";
import { errorPrompt } from "@/utils/confirm";
/**
 * 防重复点击发送请求
 */
//声明一个数组用于存储每个请求的取消函数和标识
let pending = [];
let cancelToken = axios.CancelToken;
let removePending = (ever) => {
  for (let p in pending) {
    //当当前请求在数组中存在时执行函数体
    if (
      `${ever.url}&${ever.method}`.endsWith(pending[p].u) &&
      JSON.stringify(pending[p].d) === ever.data
    ) {
      //执行取消操作
      // pending[p].f();
      ever.cancelToken = new cancelToken((c) => c());
      //把这条记录从数组中移除
      pending.splice(p, 1);
    }
  }
};
const service = axios.create({
  // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API,
  // request timeout
  timeout: 50000, // request timeout
});
// requets拦截
service.interceptors.request.use(
  (config) => {
    const token = getToken();
    //在一个发送前执行一下取消操作
    removePending(config);
    if (typeof config.headers["Content-Type"] == "undefined") {
      config.headers["Content-Type"] = "application/json;charset=UTF-8";
    }
    // if (token) {
    //   // config.headers['X-Token'] = getToken()
    // }
    config.cancelToken = new cancelToken((c) => {
      pending.push({
        u: `${config.url}&${config.method}`,
        d: config.data,
        f: c,
      });
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//response 拦截
service.interceptors.response.use(
  (response) => {
    /**
     * @param {statusCode}  若存在表示调用node接口，否则调用Java接口
     */
    const res = Object.prototype.hasOwnProperty.call(
      response.data,
      "statusCode"
    )
      ? response.data.data
      : response.data;
    removePending(response.config);
    console.log("response.data.statusCode", response.data.statusCode);
    if (response.data.statusCode === 200) {
      let RetCode = response.data.data.Header.RetCode;
      if (RetCode === "000000") {
      } else {
        let RetMsg = response.data.data.Header.RetMsg;
        errorPrompt(RetMsg);
      }
    }
    return res;
  },
  (error) => {
    Message({
      message: error.message,
      type: "error",
      duration: 3 * 1000,
    });
    // switch (error.response.status) {
    //  case 403:
    //   break
    //  case 404:
    //   break
    //  case 500:
    //   break
    //  case 501:
    //   break
    //  default:
    //   break
    // }
    return Promise.reject(error);
  }
);
export default service;
