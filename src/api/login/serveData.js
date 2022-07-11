/*
 * @Descripttion: 公用参数封装
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-04 10:33:58
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-12-8 15:11:45
 */
import { deepClone } from "@/utils";
import { getUserToken } from "@/utils/auth";
import { parseTime } from "@/utils/index";
var userInfo = getUserToken()
  ? getUserToken()
  : window.sessionStorage.getItem("userInfo");
userInfo = JSON.parse(userInfo);

export function mergeMethods(obj) {
  //得到毫秒
  var now = new Date();
  var millisec = now.getMilliseconds();
  if (millisec < 10) {
    millisec = "00" + millisec;
  } else if (millisec < 100) {
    millisec = "0" + millisec;
  }

  var data = {
    Header: {
      SourceSysId: "1",
      ConsumerId: "1",
      ServiceCode: "1",
      TranCode: "1",
      GlobalSeq: "1",
      TranSeq: "1",
      Channel: "1",
      BranchId: userInfo && userInfo.orgId ? userInfo.orgId : "800000",
      TranTeller: userInfo && userInfo.tellerId ? userInfo.tellerId : "100001",
      AuthFlag: "1",
      TranDate: parseTime(new Date(), "{y}{m}{d}"),
      TranTime: parseTime(new Date(), "{h}{i}{s}") + millisec,
      LocalLang: "1",
      LegalRepCode:
        userInfo && userInfo.legalPerson ? userInfo.legalPerson : "10000",
      PageStart: "0",
      PageEnd: "1",
      TotalNum: "10",
    },
  };

  var currentDate = new Date();
  var Header = {};
  var now = new Date();
  Header.GlobalSeq =
    currentDate.getFullYear().toString() +
    (currentDate.getMonth() + 1).toString() +
    "" +
    currentDate.getDate() +
    new Date().getTime();
  Header.TranDate = parseTime(new Date(), "{y}{m}{d}");
  Header.TranTime = parseTime(new Date(), "{h}{i}{s}") + millisec;
  data.Header = Object.assign(deepClone(data.Header), Header);
  Object.prototype.hasOwnProperty.call(obj, "Header")
    ? (obj.Header = Object.assign(deepClone(data.Header), obj.Header))
    : Object.assign(obj, data);
  return obj;
}
