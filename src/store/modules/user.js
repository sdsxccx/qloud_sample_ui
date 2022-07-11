/*
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-04 10:33:58
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-09-16 16:21:03
 */
import { login, sgpTellerLogout } from "@/api/login/user";
import {
  getToken,
  setToken,
  removeToken,
  getUserToken,
  setUserToken,
  removeUserToken,
} from "@/utils/auth";
import router, { resetRouter } from "@/router";
import { isInclude } from "@/utils";
let USERINFOCOOKIES = getUserToken() ? JSON.parse(getUserToken()) : {};
const state = {
  token: getToken(),
  name: USERINFOCOOKIES.userName
    ? USERINFOCOOKIES.userName
    : window.sessionStorage.getItem("name") || "",
  userId: USERINFOCOOKIES.userId
    ? USERINFOCOOKIES.userId
    : window.sessionStorage.getItem("userId") || "",
  userInfo: getUserToken()
    ? getUserToken()
    : window.sessionStorage.getItem("userInfo") || "",
  avatar: "",
  introduction: "",
  roles: [],
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_USERID: (state, userId) => {
    state.userId = userId;
  },
  SET_USERINFO: (state, info) => {
    state.userInfo = info;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, rule, verifyCode } = userInfo;
    return new Promise((resolve, reject) => {
      const data = {
        Header: {
          TranTeller: username.trim(),
        },
        userId: username.trim(),
        password: password,
        tokenMark: "0",
        competenceMark: "1",
        verifyWays: rule,
        verifyCode: verifyCode,
      };
      login(data)
        .then((response) => {
          if (
            isInclude(response, "token") &&
            isInclude(response, "userName") &&
            isInclude(response, "userId")
          ) {
            window.sessionStorage.setItem("token", response.token);
            window.sessionStorage.setItem("name", response.userName);
            window.sessionStorage.setItem("userId", response.userId);
            window.sessionStorage.setItem("userInfo", JSON.stringify(response));
            commit("SET_TOKEN", response.token);
            commit("SET_NAME", response.userName);
            commit("SET_USERID", response.userId);
            commit("SET_USERINFO", JSON.stringify(response));
            setToken(response.token);
            let data = {
              userName: response.userName,
              userId: response.userId,
              orgId: response.orgId,
              orgName: response.orgName,
              legalOrgId: response.legalOrgId,
              legalPerson: response.legalPerson,
              tellerId: response.tellerId,
            };
            setUserToken(JSON.stringify(data));
            resolve();
          } else {
            this.$handleError("登录失败！");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      let data = { roles: ["admin"] };
      commit("SET_ROLES", data.roles);
      resolve(data);
      // getInfo(state.token).then(response => {
      //   const { data } = response

      //   if (!data) {
      //     reject('Verification failed, please Login again.')
      //   }

      //   const { roles, name, avatar, introduction } = data

      //   // roles must be a non-empty array
      //   if (!roles || roles.length <= 0) {
      //     reject('getInfo: roles must be a non-null array!')
      //   }

      //   commit('SET_ROLES', roles)
      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   commit('SET_INTRODUCTION', introduction)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
    });
  },

  // user logout
  logout({ commit, state, dispatch }, userId) {
    return new Promise((resolve, reject) => {
      const data = {
        Header: {
          TranTeller: userId,
        },
      };
      sgpTellerLogout(data)
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          removeToken();
          removeUserToken();
          resetRouter();
          window.sessionStorage.clear();
          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch("tagsView/delAllViews", null, { root: true });

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + "-token";

    commit("SET_TOKEN", token);
    setToken(token);

    const { roles } = await dispatch("getInfo");

    resetRouter();

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch("permission/generateRoutes", roles, {
      root: true,
    });
    // dynamically add accessible routes
    router.addRoutes(accessRoutes);

    // reset visited views and cached views
    dispatch("tagsView/delAllViews", null, { root: true });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
