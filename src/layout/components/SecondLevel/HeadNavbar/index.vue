<!--
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-10 14:53:21
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-08-19 10:11:28
-->
<template>
  <div
    class="g-h_container up-clear"
    :class="{ 'has-logo': showLogo, 'has-aside': meunAsideStyle }"
    :style="{
      backgroundColor: !meunAsideStyle
        ? menuStyle.menuBg
        : menuStyle.menuHeadBg,
    }"
  >
    <logo
      v-if="showLogo"
      :meun-aside-style="meunAsideStyle"
      :meun-head-style="meunHeadStyle"
    />
    <el-menu
      :default-active="activeMenu"
      :background-color="
        !meunAsideStyle ? menuStyle.menuBg : menuStyle.menuHeadBg
      "
      :text-color="
        !meunAsideStyle ? menuStyle.menuText : menuStyle.menuHeadText
      "
      :active-text-color="theme"
      mode="horizontal"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
    <div v-if="meunHeadStyle" class="right-menu">
      <a
        href="javascript:;"
        class="screen"
        :class="isFullscreen ? 'exit-screen' : 'full-screen'"
        :title="
          isFullscreen ? $t('public.exitFullScreen') : $t('public.screen')
        "
        @click="handleScreen"
      >
        {{ isFullscreen ? $t("public.exitFullScreen") : $t("public.screen") }}
      </a>
      <div class="m-dropdown">
        <el-dropdown @command="handleLang">
          <span class="el-dropdown-link" :style="{ color: theme }">
            {{ curlang }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in langlist"
              :key="index"
              :disabled="item.disabled"
              :divided="item.divided"
              :command="item.id"
              >{{ item.name }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="m-dropdown">
        <div class="m-photo">
          <image-upload
            :readonly="true"
            :widthHeight="22"
            :fileId="headPortrait"
          ></image-upload>
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link" :style="{ color: theme }">
            {{ userInfo.userName || "" }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in droplist"
              :key="index"
              :command="item.command"
              >{{ item.name }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 修改密码弹窗 -->
    <popup
      :isShow="changePasswordPopup.changePasswordIsShow"
      size="small"
      :appendToBody="true"
      :title="$t('public.changePassword')"
      :footerList="changePasswordPopup.footerList"
      v-on:senddialogVisible="changePasswordHandle"
    >
      <template slot="content">
        <el-form
          class="passwordForm"
          ref="passwordForm"
          :model="passwordForm.formData"
          label-width="90px"
          :rules="passwordForm.formRules"
        >
          <el-form-item :label="$t('public.user.username')">
            <p>{{ userInfo.userName }}</p>
          </el-form-item>
          <el-form-item
            :label="$t('public.user.oldPassword')"
            prop="oldLoginPwd"
          >
            <el-input
              type="password"
              :placeholder="getPlaceholderMsg($t('public.user.oldPassword'))"
              v-model.trim="passwordForm.formData.oldLoginPwd"
              class="edit"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            :label="$t('public.user.newPassword')"
            prop="newLoginPwd"
          >
            <el-input
              type="password"
              :placeholder="getPlaceholderMsg($t('public.user.newPassword'))"
              v-model.trim="passwordForm.formData.newLoginPwd"
              class="edit"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            :label="$t('public.user.againLoginPwd')"
            prop="againLoginPwd"
          >
            <el-input
              :placeholder="getPlaceholderMsg($t('public.user.againLoginPwd'))"
              type="password"
              v-model.trim="passwordForm.formData.againLoginPwd"
              class="edit"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </template>
    </popup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import Bus from "@/bus";
import screenfull from "screenfull";
import Cookies from "js-cookie";
import { isInclude, isType } from "@/utils";
import {
  queryTellerById,
  queryPlanByUserLoginId,
  modifyPwd,
} from "@/api/login/user";
import { getPlaceholderMsg } from "@/utils/i18Util";
import { encodepwdSM3 } from "@/utils/crypto-js.js";
import headPortrait from "@/assets/images/user.png";
export default {
  components: {
    SidebarItem,
    Logo,
  },
  props: {
    meunAsideStyle: {
      type: Boolean,
      default: false,
    },
    meunHeadStyle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        const pPattern = /^[a-zA-Z0-9]{6,20}$/;
        const result = pPattern.test(value);
        if (result) {
          callback();
        } else {
          callback(new Error("密码由数字或字母组成，长度为6-20个字符"));
        }
      }
    };
    return {
      iconClass: "el-icon-s-fold",
      isFullscreen: false,
      curlang:
        Cookies.get("language") === "en-US"
          ? this.$t("public.test.lang.en")
          : this.$t("public.test.lang.cn"),
      langlist: [
        {
          name: this.$t("public.test.lang.lang"),
          disabled: true,
          id: "lang",
        },
        {
          name: this.$t("public.test.lang.cn"),
          divided: true,
          id: "zh-CN",
        },
        {
          name: this.$t("public.test.lang.en"),
          id: "en-US",
        },
        {
          name: this.$t("public.test.theme.theme"),
          disabled: true,
          id: "theme",
        },
        {
          name: this.$t("public.test.theme.blue"),
          id: "blue",
        },
        {
          name: this.$t("public.test.theme.red"),
          id: "red",
        },
        {
          name: this.$t("public.test.layout.layout"),
          divided: true,
          disabled: true,
          id: "layout",
        },
        {
          name: this.$t("public.test.layout.All"),
          divided: true,
          id: "All",
        },
        {
          name: this.$t("public.test.layout.Aside"),
          id: "Aside",
        },
        {
          name: this.$t("public.test.layout.Header"),
          id: "Header",
        },
        {
          name: this.$t("public.test.layout.OneHeader"),
          id: "OneHeader",
        },
        {
          name: this.$t("public.test.layout.OneAside"),
          id: "OneAside",
        },
      ],
      droplist: [
        { name: this.$t("public.changePassword"), command: "changePassword" },
        { name: this.$t("public.exit"), command: "exit" },
      ],
      changePasswordPopup: {
        changePasswordIsShow: false,
        footerList: [
          {
            name: this.$t("common.operate.cancel"),
            type: "",
            id: "cancel",
            isSubmit: false,
          },
          {
            name: this.$t("common.operate.confirm"),
            type: "primary",
            id: "confirm",
            loading: false,
            isSubmit: true,
          },
        ],
      },
      passwordForm: {
        formData: {
          oldLoginPwd: "",
          newLoginPwd: "",
          againLoginPwd: "",
        },
        formRules: {
          oldLoginPwd: [
            {
              required: true,
              trigger: "blur",
              message: getPlaceholderMsg(this.$t("public.user.oldPassword")),
            },
            { validator: validatePass, trigger: "blur" },
          ],
          newLoginPwd: [
            {
              required: true,
              trigger: "blur",
              message: getPlaceholderMsg(this.$t("public.user.newPassword")),
            },
            { validator: validatePass, trigger: "blur" },
          ],
          againLoginPwd: [
            {
              required: true,
              trigger: "blur",
              message: getPlaceholderMsg(this.$t("public.user.againLoginPwd")),
            },
            { validator: validatePass, trigger: "blur" },
          ],
        },
      },
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      let ARR = [];
      const ROUTES = this.$store.getters.permission_routes;
      // 仅显示顶部侧菜单
      if (!this.meunAsideStyle && this.meunHeadStyle) {
        ARR = ROUTES;
      }
      // 左侧和顶部菜单同时显示
      if (this.meunAsideStyle && this.meunHeadStyle) {
        let newObj = {};
        ROUTES.forEach(function (item, i) {
          for (var key in item) {
            if (key != "children") {
              newObj[key] = item[key];
            }
          }
          ARR.push(newObj);
          newObj = {};
        });
      }
      return ARR;
    },
    headPortrait() {
      return this.$store.state.settings.headPortrait;
    },
    theme() {
      return this.$store.state.settings.theme;
    },
    userInfo() {
      let userInfo =
        this.$store.getters.userInfo !== ""
          ? this.$store.getters.userInfo
          : window.sessionStorage.getItem("userInfo");
      return userInfo ? JSON.parse(userInfo) : {};
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      const ROUTES = this.$store.getters.permission_routes;
      if (this.meunAsideStyle && this.meunHeadStyle) {
        if (meta.activeMenu) {
          const arr = ROUTES.filter(
            (item) => item.path !== "/" && meta.activeMenu.startsWith(item.path)
          );
          if (
            Object.prototype.hasOwnProperty.call(arr[0], "children") &&
            arr[0].children.length > 0
          ) {
            this.$nextTick(() => {
              Bus.$emit("renderMenu", arr[0].children);
            });
          }
        } else {
          const arr = ROUTES.filter(
            (item) => item.path !== "/" && path.startsWith(item.path)
          );
          if (
            Object.prototype.hasOwnProperty.call(arr[0], "children") &&
            arr[0].children.length > 0
          ) {
            this.$nextTick(() => {
              Bus.$emit("renderMenu", arr[0].children);
            });
          }
        }
        if (meta.activeMenu) {
          return `/${meta.activeMenu.split("/")[1]}`;
        }
        return `/${path.split("/")[1]}`;
      } else {
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return path;
      }
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    menuStyle() {
      return this.$store.state.settings.menuStyle;
    },
  },
  watch: {
    headPortrait: {
      handler(oldVal, newVal) {
        if (this.meunHeadStyle && this.headPortrait === "") {
          const menuQueryData = {
            Header: {
              TranTeller: this.userInfo.tellerId,
            },
            tellerId: this.userInfo.tellerId,
          };
          queryTellerById(menuQueryData).then((res) => {
            if (
              isInclude(res, "tellerBaseMap") &&
              isInclude(res.tellerBaseMap, "headPortrait") &&
              res.tellerBaseMap.headPortrait.length > 10
            ) {
              this.$store.dispatch("settings/changeSetting", {
                key: "headPortrait",
                value: res.tellerBaseMap.headPortrait,
              });
            } else {
              this.$store.dispatch("settings/changeSetting", {
                key: "headPortrait",
                value: headPortrait,
              });
            }
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    getPlaceholderMsg(msg) {
      return getPlaceholderMsg(msg);
    },
    // 语言切换
    handleLang(command) {
      if (command === "zh-CN" || command === "en-US") {
        Cookies.set("language", command);
        history.go(0);
      } else {
        switch (command) {
          case "Aside":
            this.$store.commit("settings/CHANGE_SETTING", {
              key: "meunAsideStyle",
              value: true,
            });
            this.$store.commit("settings/CHANGE_SETTING", {
              key: "meunHeadStyle",
              value: false,
            });
            break;
          case "Header":
            this.$store.commit("settings/CHANGE_SETTING", {
              key: "meunAsideStyle",
              value: false,
            });
            this.$store.commit("settings/CHANGE_SETTING", {
              key: "meunHeadStyle",
              value: true,
            });
            break;
          case "All":
            this.$store.commit("settings/CHANGE_SETTING", {
              key: "meunAsideStyle",
              value: true,
            });
            this.$store.commit("settings/CHANGE_SETTING", {
              key: "meunHeadStyle",
              value: true,
            });
            break;
          case "OneHeader":
            this.$store.commit("settings/CHANGE_SETTING", {
              key: "meunAsideStyle",
              value: true,
            });
            this.$store.commit("settings/CHANGE_SETTING", {
              key: "meunHeadStyle",
              value: true,
            });
            this.$store.dispatch("settings/changeSetting", {
              key: "HeaderOneLevel",
              value: true,
            });
            break;
          case "OneAside":
            this.$store.commit("settings/CHANGE_SETTING", {
              key: "meunAsideStyle",
              value: true,
            });
            this.$store.commit("settings/CHANGE_SETTING", {
              key: "meunHeadStyle",
              value: true,
            });
            this.$store.dispatch("settings/changeSetting", {
              key: "HeaderOneLevel",
              value: false,
            });
            break;
          case "red":
            this.$store.commit("settings/CHANGE_SETTING", {
              key: "theme",
              value: "#CF1322",
            });
            break;
          case "blue":
            this.$store.commit("settings/CHANGE_SETTING", {
              key: "theme",
              value: "#43A3FB",
            });
            break;
          default:
            debugger;
            this.$store.commit("settings/CHANGE_SETTING", {
              key: "HeaderOneLevel",
              value: true,
            });
            this.$store.commit("settings/CHANGE_SETTING", {
              key: "meunAsideStyle",
              value: true,
            });
            this.$store.commit("settings/CHANGE_SETTING", {
              key: "meunHeadStyle",
              value: true,
            });
        }
      }
    },
    handleCommand(command) {
      if (command === "exit") {
        this.$store
          .dispatch("user/logout", this.userInfo.userId)
          .then(async () => {
            this.$router.push({ path: "/login" });
          })
          .catch(() => {});
      } else if (command === "changePassword") {
        this.changePasswordPopup.changePasswordIsShow = true;
        this.queryPlanByUserLoginId();
      }
    },
    queryPlanByUserLoginId() {
      const sendData = {
        userLoginId: this.userInfo.userId,
      };
      queryPlanByUserLoginId(sendData).then((response) => {
        if (
          isInclude(response, "pwdType") &&
          isType.isString(response.pwdType)
        ) {
        }
      });
    },
    getRegExp() {
      const regObj = {
        number: /^\d+$/, // 数字
        capital: /^[A-Z]+$/, // 大写
        lower: /^[a-z]+$/, // 小写
        special:
          /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/, // 特殊字符
      };
    },
    handleIcon() {
      if (this.iconClass === "el-icon-s-fold") {
        this.iconClass = "el-icon-s-unfold";
        // todo...
      } else {
        this.iconClass = "el-icon-s-fold";
        // todo...
      }
    },
    handleScreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning",
        });
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", this.change);
      }
    },

    changePasswordHandle(flag) {
      if (flag) {
        this.$refs["passwordForm"].validate((valid) => {
          if (valid) {
            const sendData = {
              userLoginId: this.userInfo.userId,
              oldLoginPwd: encodepwdSM3(this.passwordForm.formData.oldLoginPwd),
              newLoginPwd: encodepwdSM3(this.passwordForm.formData.newLoginPwd),
              againLoginPwd: encodepwdSM3(
                this.passwordForm.formData.againLoginPwd
              ),
            };
            modifyPwd(sendData).then((response) => {
              if (response.Header.RetCode === "000000") {
                this.$handleSuccess("密码修改成功，请重新登录！");
                this.handleCommand("exit");
                this.changePasswordPopup.changePasswordIsShow = false;
              }
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.changePasswordPopup.changePasswordIsShow = false;
      }
    },
  },
  beforeDestory() {
    Bus.$off("rendermenu");
  },
};
</script>
<style lang="scss">
@import "@/styles/variables.scss";
.g-h_container {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  &.has-aside {
    padding-left: $sideBarWidth;
  }
  .el-menu {
    flex: 1;
    &.el-menu--horizontal {
      border: 0;
    }
  }
  .right-menu {
    float: right;
    height: 56px;
    display: flex;
    align-items: center;
    padding-right: 15px;
    &:focus {
      outline: none;
    }

    a {
      margin-right: 10px;
      &.screen {
        width: 16px;
        height: 16px;
        color: #333;
        text-indent: -20000px;
        &.exit-screen {
          background: url(../../../../assets/images/exit_screen.png) no-repeat
            center center;
          background-size: contain;
        }
        &.full-screen {
          background: url(../../../../assets/images/full_screen.png) no-repeat
            center center;
          background-size: contain;
        }
      }
    }
    .m-dropdown {
      margin-left: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
      .m-photo {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        align-content: center;
        margin-right: 5px;
        color: #409eff;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .el-dropdown {
        height: 20px;
        display: inline-flex;
        align-items: center;
        .el-dropdown-link {
          cursor: pointer;
        }
        .el-icon-arrow-down {
          font-size: 12px;
        }
      }
    }
  }
}

.passwordForm {
  padding: 0 20px;

  .el-form-item__label {
    font-weight: normal;
  }
}
</style>
