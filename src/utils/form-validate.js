/*
 * @Descripttion:from校验封装
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-28 15:49:40
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-08-31 16:11:48
 */
import Cookies from "js-cookie";
import vue from "@/main";
import { isType } from "./index.js";
const chooseLanguage = Cookies.get("language") || "zh-CN";

export const validateForm = (
  rule,
  value,
  callback,
  name,
  reg,
  ErrorMsg,
  ...args
) => {
  /**
   * @Author: liguanghui
   * @Descripttion: form校验规则公用封装
   * @param {rule}          type:Object     需要校验的信息
   * @param {value}         type:String     需要校验的文本
   * @param {callback}      type:Function   回调函数
   * @param {name}          type:String     名称
   * @param {reg}           type:String     校验的正则表达式
   * @param {ErrorMsg}      type:String     错误提示
   * @param {...args}       type:Function   自定义校验规则
   */
  if (!value) {
    chooseLanguage === "zh-CN"
      ? callback(new Error(`${name}${vue.$t("public.formvalidate.empty")}`))
      : callback(new Error(`${vue.$t("public.formvalidate.empty")} ${name}`));
  } else {
    args.forEach((item) => {
      if (!isType.isFunction(item))
        throw new Error(
          `${item} expectation is the Function,but the result is a ${typeof item}.`
        );
      item(rule, value, callback, name, reg, ErrorMsg);
    });
  }
};

export const validateItem = (rule, value, callback, name, reg, ErrorMsg) => {
  /**
   * @Author: liguanghui
   * @Descripttion: formItem校验规则公用封装
   * @param {rule}        type:Object     需要校验的信息
   * @param {value}       type:String     需要校验的文本
   * @param {callback}    type:Function   回调函数
   * @param {name}        type:String     名称
   * @param {reg}         type:String     校验的正则表达式
   * @param {ErrorMsg}    type:String     错误提示
   */
  if (!reg.test(value)) {
    callback(new Error(ErrorMsg));
  } else {
    callback();
  }
};
