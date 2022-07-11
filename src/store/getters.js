/*
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-24 14:53:37
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-09-03 13:38:56
 */
const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  roles: (state) => state.user.roles,
  userId: (state) => state.user.userId,
  userInfo: (state) => state.user.userInfo,
  permission_routes: (state) => state.permission.routes,
};
export default getters;
