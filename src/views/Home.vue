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
        <p>{{ $t("demo.navbar.dashboard") }}</p>
        <a>{{ ceshi }}</a>
        <tableView
          :operateObj="tableData.operate"
          :tableHeaderData="tableData.paramTableHeader"
          :tableData="tableData.paramData"
          :isPage="tableData.isPage"
          v-on:operate="getIndex"
        />
      </template>
    </popup>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isShow: true,
      ceshi: this.$t("demo.navbar.dashboard"),
      size: "medium",
      footerList: [
        { name: "取消", type: "", isSubmit: false },
        { name: "确定", type: "primary", isSubmit: true },
      ],
      tableData: {
        isPage: true,
        operate: {
          width: 200,
          list: ["编辑1", "查看2", "编辑3", "查看4", "编辑5", "查看6"],
        },
        showOverflowTooltip: true,
        paramTableHeader: [
          {
            prop: "name",
            label: "过程名称",
          },
          {
            prop: "tags",
            label: "过程标签",
            // format: (val) => {
            //   return this.dealWithTags(val)
            // },
            render: (h, params) => {
              return h("tag", {
                attrs: {
                  type: this.dealWithTagsType(params.row.tags),
                  label: params.row.tags,
                },
              });
            },
          },
          { prop: "time", label: "更新时间" },
        ],
        paramData: [
          {
            name: "查看目录",
            tags: "1111",
            time: "2019-03-24 17:07:54",
            value: "",
          },
          {
            name: "查看目录",
            tags: "2",
            time: "2019-03-24 17:07:54",
            value: "",
          },
          {
            name: "查看目录",
            tags: "3",
            time: "2019-03-24 17:07:54",
            value: "",
          },
          {
            name: "查看目录",
            tags: "1",
            time: "2019-03-24 17:07:54",
            value: "",
          },
          {
            name: "查看目录",
            tags: "2",
            time: "2019-03-24 17:07:54",
            value: "",
          },
        ],
      },
    };
  },
  computed: {
    settingSize() {
      return this.$store.state.settings.size;
    },
  },
  methods: {
    getIndex(e) {
      console.log(e);
    },
    getdialogVisible(flag) {
      if (flag) {
      }
      this.isShow = false;
    },
    dealWithTagsType(val) {
      let type;
      switch (val) {
        case "1":
          type = "success";
          break;
        case "2":
          type = "info";
          break;
        case "3":
          type = "danger";
          break;
        default:
          type = "";
      }
      return type;
    },
  },
};
</script>

<style></style>
