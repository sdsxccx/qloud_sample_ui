<!--
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-04 10:33:58
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-08-04 11:46:57
-->
<template>
  <div>
    <popup
      :isShow="isShow"
      :size="size"
      :footerList="footerList"
      v-on:senddialogVisible="getdialogVisible"
    >
      <template slot="content">
        <!-- <tableView
				:operateObj = "tableData.operate"
				:tableHeaderData = "tableData.paramTableHeader"
				:tableData = "tableData.paramData"
				:isPage = "tableData.isPage"
				v-on:operate="getIndex" /> -->
        <form-view
          :searchData="searchData"
          :rules="Rules"
          :isLeft="isLeft"
          :isBlock="isBlock"
          :isHandle="isHandle"
          class="form-item"
          ref="form"
          :formRef="formRef"
          :isInline="isInline"
          :searchForm="searchForm"
          :searchHandle="searchHandle"
        ></form-view>
      </template>
    </popup>
  </div>
</template>

<script>
import {
  getPlaceholderMsg,
  getPlaceholderMsgForSelect,
} from "@/utils/i18Util.js";
export default {
  name: "popup-view1",
  data() {
    return {
      isLeft: false,
      isBlock: false,
      isHandle: false,
      isInline: true,
      searchData: {
        name: null,

        age: null,

        sex: null,

        date: "",

        interst: [],
      },
      formRef: "inlineForm",
      searchForm: [
        {
          type: "Input",
          label: this.$t("sample_test.form.name"),
          prop: "name",
          width: "210px",
          placeholder: getPlaceholderMsg(this.$t("sample_test.form.name")),
        },

        {
          type: "Input",
          label: this.$t("sample_test.form.age"),
          prop: "age",
          width: "210px",
          placeholder: getPlaceholderMsg(this.$t("sample_test.form.age")),
        },

        {
          type: "Date",
          label: this.$t("sample_test.form.date"),
          prop: "date",
          width: "210px",
          placeholder: getPlaceholderMsgForSelect(
            this.$t("sample_test.form.date")
          ),
        },

        {
          type: "Select",
          label: this.$t("sample_test.form.sex"),
          prop: "sex",
          width: "210px",
          options: [
            { label: this.$t("sample_test.form.male"), value: "M" },
            { label: this.$t("sample_test.form.female"), value: "F" },
          ],
          props: { label: "label", value: "value" },
          change: (row) => "",
          placeholder: getPlaceholderMsgForSelect(
            this.$t("sample_test.form.sex")
          ),
        },

        {
          type: "Checkbox",
          label: this.$t("sample_test.form.hobby"),
          prop: "interst",
          checkboxs: [
            {
              label: this.$t("sample_test.form.badminton"),
              value: "badminton",
            },
            {
              label: this.$t("sample_test.form.basketball"),
              value: "basketball",
            },
            { label: this.$t("sample_test.form.football"), value: "football" },
            { label: this.$t("sample_test.form.pong"), value: "pong" },
          ],
          props: { label: "label", value: "value" },
        },
        {
          type: "Textarea",
          label: this.$t("sample_test.form.name"),
          prop: "text",
          width: "550px",
          rows: 3,
          placeholder: getPlaceholderMsg(this.$t("sample_test.form.name")),
        },
      ],

      searchHandle: [
        // {
        //   label: this.$t('sample_test.form.search'),
        //   type: "primary",
        //   handle: () => this.searchHandleForm(this.formRef),
        // },
        // { label: this.$t('sample_test.form.reset'), type: "primary", handle: () => this.resetForm(this.formRef) },
      ],
      // 表单验证
      Rules: {
        name: [
          {
            required: true,
            message: getPlaceholderMsg(this.$t("sample_test.form.name")),
            trigger: "blur",
          },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        age: [
          {
            required: true,
            message: getPlaceholderMsg(this.$t("sample_test.form.age")),
            trigger: "blur",
          },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        sex: [
          {
            required: true,
            message: getPlaceholderMsgForSelect(
              this.$t("sample_test.form.sex")
            ),
            trigger: "blur",
          },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      isShow: true,
      size: "medium",
      footerList: [
        { name: "取消", type: "", isSubmit: false },
        { name: "确定", type: "primary", isSubmit: true },
      ],
      tableData: {
        isPage: true,
        operate: {
          width: 210,
          list: [
            { label: "编辑1", id: "0" },
            { label: "查看2", id: "1" },
            { label: "编辑3", id: "2" },
            { label: "查看4", id: "3" },
            { label: "编辑5", id: "4" },
            { label: "查看6", id: "5" },
          ],
        },
        showOverflowTooltip: true,
        paramTableHeader: [
          { prop: "name", label: "过程名称" },
          { prop: "tags", label: "过程标签" },
          { prop: "time", label: "更新时间" },
        ],
        paramData: [
          {
            name: "查看目录",
            tags: "日常巡检",
            time: "2019-03-24 17:07:54",
            value: "",
          },
          {
            name: "查看目录",
            tags: "日常巡检",
            time: "2019-03-24 17:07:54",
            value: "",
          },
          {
            name: "查看目录",
            tags: "日常巡检",
            time: "2019-03-24 17:07:54",
            value: "",
          },
          {
            name: "查看目录",
            tags: "日常巡检",
            time: "2019-03-24 17:07:54",
            value: "",
          },
          {
            name: "查看目录",
            tags: "日常巡检",
            time: "2019-03-24 17:07:54",
            value: "",
          },
        ],
      },
    };
  },
  methods: {
    async resetForm(formName) {
      await this.$refs["form"].$refs[formName].resetFields();
    },
    async searchHandleForm(formName) {
      // console.log("searchHandle");
      await this.$refs["form"].$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getIndex(e) {
      console.log(e);
    },
    getdialogVisible(flag) {
      if (flag) {
      }
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss" scoped="scoped">
.form-item {
  // ::v-deep .el-form{
  //   display: flex;
  //   justify-content: center;
  //   flex-wrap: wrap;
  // }
}
</style>
