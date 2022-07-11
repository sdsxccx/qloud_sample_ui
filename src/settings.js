/*
 * @Descripttion: 全局配置
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-04 10:33:58
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-09-15 16:59:08
 */
module.exports = {
  title: "银行中台",

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,
  /**
   * @type {String} medium | small | mini
   * @description 全局尺寸
   */
  size: "mini",
  // 分页组件每页显示条数设置
  pageSizes: [10, 20, 50, 100],
  // 分页layout配置
  pageLayout: "total,sizes,prev, pager, next, jumper",
  // 分页页码按钮的数量
  pagerCount: 5,
  tagsView: true,
  /**
   * @type {obj} clientId | clientSecret
   * @description system identification
   */
  clientInfo: {
    clientId: "QloudSSP",
    clientSecret: "QloudSSP",
  },
  isMenuChangingOver: {
    // 是否顶部一级
    HeaderOneLevel: true,
    // 左侧导航是否显示
    Aside: true,
    // 顶部导航是否显示
    Header: true,
  },
  //tags最大个数
  maxTagView: 10,
};
