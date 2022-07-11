/*
 * @Descripttion: 接口调用方法封装demo
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-04 10:40:51
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-08-11 16:14:10
 */
import { mergeMethods } from "@/api/calssification/serveData.js";
import request from "@/utils/request";

// demo
export function groupList(data) {
  var data = mergeMethods(data);
  return request({
    url: "sop/selectCustClassificationGroupListSop",
    method: "post",
    data,
  });
}

export function groupTypeList(data) {
  var data = mergeMethods(data);
  return request({
    url: "sop/selectGroupTypeListSop",
    method: "post",
    data,
  });
}

// 主推产品 - 产品线下拉
export function productLinePull(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sop/productLinePullSop",
    method: "post",
    data,
  });
}

// 主推产品 - 产品组下拉
export function productGroupPull(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sop/productGroupPullSop",
    method: "post",
    data,
  });
}

// 主推产品 - 基础产品下拉
export function productGroupDetailsQuerPull(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sop/productGroupDetailsQueryListSop",
    method: "post",
    data,
  });
}

// 主推产品 - 列表页面
export function findAvailableProductList(data) {
  var data = mergeMethods(data);
  console.log(JSON.stringify(data));
  return request({
    url: "/sop/findAvailableProductListSop",
    method: "post",
    data,
  });
}
// 所属机构
export function getOrgTree(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sop/getOrgTree",
    method: "post",
    data,
  });
}

//
export function getEnumTypeTreeSop(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sop/getEnumTypeTreeSop",
    method: "post",
    data,
  });
}
// 新增
export function createCustGroupSop(data) {
  var data = mergeMethods(data);
  console.log(JSON.stringify(data));
  return request({
    url: "/sop/createCustGroupSop",
    method: "post",
    data,
  });
}
//修改
export function updateCustGroupInfoSop(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sop/updateCustGroupInfoSop",
    method: "post",
    data,
  });
}

export function selectPartyClassificationListSop(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sop/selectPartyClassificationListSop",
    method: "post",
    data,
  });
}
//新增 --检索
export function selectPartyMainInfoListSop(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sop/selectPartyMainInfoListSop",
    method: "post",
    data,
  });
}

export function selectCodesSop(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sop/selectCodesSop",
    method: "post",
    data,
  });
}
export function addPartyClassificationSop(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sop/addPartyClassificationSop",
    method: "post",
    data,
  });
}
export function partyClassificationGroupId(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sop/partyClassificationGroupId",
    method: "post",
    data,
  });
}
export function batchDeletePartyClassificationSop(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sop/batchDeletePartyClassificationSop",
    method: "post",
    data,
  });
}
export function updatePartyClassificationSop(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sop/updatePartyClassificationSop",
    method: "post",
    data,
  });
}
