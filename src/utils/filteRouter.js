/*
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-09-03 10:02:55
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-09-03 10:21:49
 */
import { isType } from "./index.js";
const hasPower = (node, filteList, key) => {
  var key = node[key];
  return filteList.some((item) => item === key);
};
export function filteNode(node, parent, index, filteList, key) {
  /**
   * @Author: liguanghui
   * @Descripttion:   数组对象筛选
   * @param {node}        筛选的数组
   * @param {parent}      筛选层级的上一级，顶层为空
   * @param {index}       筛选层级在数组的位置，顶层为0
   * @param {filteList}   筛选的条件数组
   * @return {node}       筛选后的新数组
   */
  if (isType.isArray(node)) {
    for (var i = node.length - 1; i >= 0; i--) {
      filteNode(node[i], node, i, filteList, key);
    }
  } else {
    if (node.childrens) {
      for (var i = node.childrens.length - 1; i >= 0; i--) {
        filteNode(node.childrens[i], node.childrens, i, filteList, key);
      }
    }
    if (
      (!node.childrens || node.childrens.length === 0) &&
      hasPower(node, filteList, key) === false
    ) {
      parent.splice(index, 1);
    }
  }
  return node;
}
