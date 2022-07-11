/*
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-26 14:10:53
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-08-26 16:59:08
 */
const CryptoJS = require("crypto-js");
const sm3 = require("sm-crypto").sm3;
const SM4 = require("gm-crypt").sm4;
import { Util } from "./encode_sm4.js";
import { SM4Util } from "./sm4";

export const encodepwdSM3 = (word) => {
  /**
   * 对密码进行国密算法sm3加密
   * @param  {String}     word    需要加密的密码
   * @return {String}     加密的密文
   */
  if (word === "") return "";
  const hashStr = sm3(word);
  return hashStr.toUpperCase();
};

export const encodepwdSM4 = (word, keyStr, iv) => {
  /**
   * 对密码进行国密算法SM4&ECB||SM4&CBC加密
   * @param  {String}     word    需要加密的密码
   * @param  {String}     keyStr  对密码加密的秘钥
   * @return {String}     加密的密文
   */
  word = encodepwdSM3(word);
  const sm4Config = {
    key: keyStr || "11HDESaAhiHHugDz",
    // optional; when use cbc mode, it's necessary
    iv: iv || "",
  };
  const sm4 = new SM4Util(sm4Config);
  return sm4.encryptData_ECB(word);
};

export const encodepwdGMSM4 = (word, keyStr, iv) => {
  /**
   * 对密码进行国密算法SM4&ECB||SM4&CBC加密
   * @param  {String}     word    需要加密的密码
   * @param  {String}     keyStr  对密码加密的秘钥
   * @return {String}     加密的密文
   */
  if (word === "") return "";
  word = encodepwdSM3(word);
  const sm4Config = {
    key: keyStr || "11HDESaAhiHHugDz",
    // optional; can be 'cbc' or 'ecb'
    mode: "ecb",
    // optional; when use cbc mode, it's necessary
    // iv: iv || '',
    // optional: this is the cipher data's type; Can be 'base64' or 'text'
    cipherType: "text", // default is base64
  };

  const sm4 = new SM4(sm4Config);
  return sm4.encrypt(word);
};

export const encodepwdUtil_SM4 = (word, keyStr) => {
  /**
   * 对密码进行国密算法SM4&ECB加密
   * @param  {String}     word    需要加密的密码
   * @param  {String}     keyStr  对密码加密的秘钥
   * @return {String}     加密的密文
   */
  if (word === "") return "";
  keyStr = keyStr || "0123456789ABCDEFFEDCBA9876543210";
  // console.log(`word转换前:${word}`)
  word = encodepwdSM3(word);
  console.log(`keyStr:${keyStr}`);
  console.log(`word转换后:${word}`);
  const util = new Util();
  return util.encode(keyStr, word);
};

export const encrypt = (word, keyStr) => {
  /*
   * 对密码进行加密
   * @param  {String}     word    需要加密的密码
   * @param  {String}     keyStr  对密码加密的秘钥
   * @return {String}     加密的密文
   * */
  if (word === "") return "";
  keyStr = keyStr || "0123456789ABCDEFFEDCBA9876543210";
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

export const decrypt = (word, keyStr) => {
  /*
   * 对加密之后的密文在页面上进行解密
   * @param  {String}     word    需要加密的密码
   * @param  {String}     keyStr    对密码加密的秘钥
   * @return {String}     解密的明文
   * */
  if (word === "") return "";
  keyStr = keyStr || "0123456789ABCDEFFEDCBA9876543210";
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};
