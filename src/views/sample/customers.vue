<!--
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-04 16:01:12
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-08-06 11:24:22
-->
<template>
  <div class="g-customers">
    <div class="g-container">
      <formView
        class="g-form"
        ref="parentWarp"
        :formRef="form.formRef"
        :searchForm="form.searchForm"
        :searchData="form.searchData"
        :searchHandle="form.searchHandle"
        :isBlock="form.isBlock"
      />
      <div class="m-info">
        <h2 class="p14 c3">{{ $t("calssification_customers.name") }}</h2>
        <ul>
          <li v-for="(item, index) in infoList" :key="index">
            <img class="icon" :src="item.icon" />
            <div>
              <p>{{ item.num }}</p>
              <span class="c6">{{ item.name }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="g-table">
        <h2 class="p14 c3">{{ $t("calssification_customers.tableTitle") }}</h2>
        <el-row>
          <el-button
            type="primary"
            :size="size"
            v-for="(item, index) in btnList"
            @click="handleClick(item.id)"
            :key="index"
            >{{ item.name }}</el-button
          >
        </el-row>
        <table-view
          class="table"
          :tableHeaderData="tableData.tableHeaderData"
          :tableData="tableData.tableData"
          :isPage="tableData.isPage"
          :pageSize="tableData.pageSize"
          :total="tableData.total"
          :currentPage.sync="tableData.currentPage"
          v-on:getClickdata="getClickdata"
          :isClick="isClick"
        ></table-view>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlaceholderMsg } from "@/utils/i18Util";
import { groupList } from "@/api/calssification/customers/customers.js";
export default {
  name: "customers",
  data() {
    return {
      isClick: true,
      btnList: [
        { name: this.$t("calssification_customers.btnList.add"), id: "add" },
        {
          name: this.$t("calssification_customers.btnList.download"),
          id: "download",
        },
        {
          name: this.$t("calssification_customers.btnList.import"),
          id: "import",
        },
      ],
      infoList: [
        {
          icon: require("@/assets/cms/images/group.png"),
          num: 0,
          name: this.$t("calssification_customers.infoList[0].name"),
        },
        {
          icon: require("@/assets/cms/images/customer.png"),
          num: 0,
          name: this.$t("calssification_customers.infoList[1].name"),
        },
      ],
      custimersLength: 0,
      groupLength: 0,
      tableData: {
        isPage: true,
        tableData: [
          {
            groupId: "1",
            groupName:
              "西安研发前端西安研发前端西安研发前端西安研发前端西安研发前端西安研发前端西安研发前端西安研发前端西安研发前端西安研发前端西安研发前端西安研发前端",
            groupLeader: "11",
            groupLeaderName: "郭聪聪",
            groupLeaderContacts: "雷瑞琪、黄平英",
            belong: "华软金科",
            type: "讨论组",
            time: "2020-07-12",
          },
          {
            groupId: "2",
            groupName: "华软-中台研发1",
            groupLeader: "10",
            groupLeaderName: "魏波浪",
            groupLeaderContacts: "张涛、胡凯甲",
            belong: "华软金科",
            type: "讨论组",
            time: "2020-07-20",
          },
          {
            groupId: "1",
            groupName: "西安研发前端",
            groupLeader: "11",
            groupLeaderName: "郭聪聪",
            groupLeaderContacts: "雷瑞琪、黄平英",
            belong: "华软金科",
            type: "讨论组",
            time: "2020-07-12",
          },
          {
            groupId: "2",
            groupName: "华软-中台研发1",
            groupLeader: "10",
            groupLeaderName: "魏波浪",
            groupLeaderContacts: "张涛、胡凯甲",
            belong: "华软金科",
            type: "讨论组",
            time: "2020-07-20",
          },
          {
            groupId: "1",
            groupName: "西安研发前端",
            groupLeader: "11",
            groupLeaderName: "郭聪聪",
            groupLeaderContacts: "雷瑞琪、黄平英",
            belong: "华软金科",
            type: "讨论组",
            time: "2020-07-12",
          },
          {
            groupId: "2",
            groupName: "华软-中台研发1",
            groupLeader: "10",
            groupLeaderName: "魏波浪",
            groupLeaderContacts: "张涛、胡凯甲",
            belong: "华软金科",
            type: "讨论组",
            time: "2020-07-20",
          },
          {
            groupId: "1",
            groupName: "西安研发前端",
            groupLeader: "11",
            groupLeaderName: "郭聪聪",
            groupLeaderContacts: "雷瑞琪、黄平英",
            belong: "华软金科",
            type: "讨论组",
            time: "2020-07-12",
          },
          {
            groupId: "2",
            groupName: "华软-中台研发1",
            groupLeader: "10",
            groupLeaderName: "魏波浪",
            groupLeaderContacts: "张涛、胡凯甲",
            belong: "华软金科",
            type: "讨论组",
            time: "2020-07-20",
          },
          {
            groupId: "1",
            groupName: "西安研发前端",
            groupLeader: "11",
            groupLeaderName: "郭聪聪",
            groupLeaderContacts: "雷瑞琪、黄平英",
            belong: "华软金科",
            type: "讨论组",
            time: "2020-07-12",
          },
          {
            groupId: "2",
            groupName: "华软-中台研发1",
            groupLeader: "10",
            groupLeaderName: "魏波浪",
            groupLeaderContacts: "张涛、胡凯甲",
            belong: "华软金科",
            type: "讨论组",
            time: "2020-07-20",
          },
          {
            groupId: "1",
            groupName: "西安研发前端",
            groupLeader: "11",
            groupLeaderName: "郭聪聪",
            groupLeaderContacts: "雷瑞琪、黄平英",
            belong: "华软金科",
            type: "讨论组",
            time: "2020-07-12",
          },
          {
            groupId: "2",
            groupName: "华软-中台研发1",
            groupLeader: "10",
            groupLeaderName: "魏波浪",
            groupLeaderContacts: "张涛、胡凯甲",
            belong: "华软金科",
            type: "讨论组",
            time: "2020-07-20",
          },
          {
            groupId: "1",
            groupName: "西安研发前端",
            groupLeader: "11",
            groupLeaderName: "郭聪聪",
            groupLeaderContacts: "雷瑞琪、黄平英",
            belong: "华软金科",
            type: "讨论组",
            time: "2020-07-12",
          },
          {
            groupId: "2",
            groupName: "华软-中台研发1",
            groupLeader: "10",
            groupLeaderName: "魏波浪",
            groupLeaderContacts: "张涛、胡凯甲",
            belong: "华软金科",
            type: "讨论组",
            time: "2020-07-20",
          },
          {
            groupId: "1",
            groupName: "西安研发前端",
            groupLeader: "11",
            groupLeaderName: "郭聪聪",
            groupLeaderContacts: "雷瑞琪、黄平英",
            belong: "华软金科",
            type: "讨论组",
            time: "2020-07-12",
          },
          {
            groupId: "2",
            groupName: "华软-中台研发1",
            groupLeader: "10",
            groupLeaderName: "魏波浪",
            groupLeaderContacts: "张涛、胡凯甲",
            belong: "华软金科",
            type: "讨论组",
            time: "2020-07-20",
          },
        ],
        currentPage: 1,
        total: 1000,
        pageSize: 10,
        tableHeaderData: [
          {
            prop: "groupId",
            label: this.$t("calssification_customers.tableHeaderData.groupId"),
            align: "right",
            width: 70,
          },
          {
            prop: "groupName",
            label: this.$t(
              "calssification_customers.tableHeaderData.groupName"
            ),
            align: "left",
            resizable: true,
            showOverflowTooltip: true,
          },
          {
            prop: "groupLeader",
            label: this.$t(
              "calssification_customers.tableHeaderData.groupLeader"
            ),
            align: "right",
            width: 70,
          },
          {
            prop: "groupLeaderName",
            label: this.$t(
              "calssification_customers.tableHeaderData.groupLeaderName"
            ),
            align: "left",
          },
          {
            prop: "groupLeaderContacts",
            label: this.$t(
              "calssification_customers.tableHeaderData.groupLeaderContacts"
            ),
            align: "left",
          },
          {
            prop: "belong",
            label: this.$t("calssification_customers.tableHeaderData.belong"),
            align: "left",
          },
          {
            prop: "type",
            label: this.$t("calssification_customers.tableHeaderData.type"),
            align: "left",
          },
          {
            prop: "time",
            label: this.$t("calssification_customers.tableHeaderData.time"),
            align: "right",
          },
        ],
      },
      form: {
        formRef: "cusForm",
        isBlock: true,
        searchData: {
          groupName: "",
          groupId: "",
          groupLeader: "",
          Header: {
            PageTotalNum: 10, // 每页显示数据条数
            CurrentPageNum: 1, // 当前第几页
          },
        },
        searchForm: [
          {
            type: "Input",
            label: this.$t("calssification_customers.searchForm.groupName"),
            prop: "groupName",
            width: "220px",
            placeholder: getPlaceholderMsg(
              this.$t("calssification_customers.searchForm.groupName")
            ),
          },
          {
            type: "Input",
            label: this.$t("calssification_customers.searchForm.groupId"),
            prop: "groupId",
            width: "220px",
            placeholder: getPlaceholderMsg(
              this.$t("calssification_customers.searchForm.groupId")
            ),
          },
          {
            type: "Input",
            label: this.$t("calssification_customers.searchForm.groupLeader"),
            prop: "groupLeader",
            width: "220px",
            placeholder: getPlaceholderMsg(
              this.$t("calssification_customers.searchForm.groupLeader")
            ),
          },
        ],
        searchHandle: [
          {
            label: this.$t("calssification_customers.searchForm.search"),
            type: "primary",
            handle: () => this.handleForm(this.form.formRef),
          },

          {
            label: this.$t("calssification_customers.searchForm.reset"),
            type: "primary",
            handle: () =>
              this.$refs["parentWarp"].$refs[this.form.formRef].resetFields(),
          },
        ],
      },
    };
  },
  computed: {
    size() {
      return this.$store.state.settings.size;
    },
  },
  created() {
    this.getList();
  },
  methods: {
    getClickdata(e) {
      console.log(e);
      this.$router.push({
        path: "/customer-group-list",
      });
    },
    //获取
    getList() {
      //列表
      //console.log("列表this.searchData", this.searchData);
      groupList(this.form.searchData).then((response) => {
        console.log("response--", response);
        //this.tableData.paramData = response.postInfoList;
        //this.$set(this.tableData, "total", Number(response.Header.TotalNum));
        //this.total = parseInt(response.Header.TotalNum)
        //this.listLoading = false
      });
    },
    getdialogVisible(flag) {
      console.log("flag", flag, typeof flag);
      if (typeof flag === "boolean" && flag === true) {
      } else {
        this.isShow = false;
      }
    },
    async handleForm(formName) {
      await this.$refs["parentWarp"].$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClick(id) {
      if (id === "add") {
        this.$router.push({
          path: "/add-client-base",
        });
      }
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
@import "@/styles/variables.scss";
.g-customers {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .g-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    .g-form {
      margin-bottom: 10px;
    }
    .m-info {
      margin-bottom: 10px;
      h2 {
        padding-left: 10px;
        border-left: 3px solid $primaryColor;
        height: 15px;
        line-height: 15px;
      }
      ul {
        display: flex;
        align-items: center;
        margin: 20px 0;
        li {
          flex: 1;
          display: flex;
          justify-content: center;
          align-content: center;
          padding: 20px;
          border-radius: 3px;
          box-shadow: 2px 1px 8px #eee;
          img {
            width: 99px;
          }
          & + li {
            margin-left: 200px;
            img {
              width: 72px;
            }
          }
          div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-left: 30px;
            p {
              font-size: 24px;
              color: #f89d34;
              line-height: 1.3;
            }
            span {
              font-size: 14px;
              line-height: 1.5;
            }
          }
        }
      }
    }
    .g-table {
      flex: 1;
      display: flex;
      flex-direction: column;
      h2 {
        padding-left: 10px;
        border-left: 3px solid $primaryColor;
        height: 15px;
        line-height: 15px;
      }
      .el-row {
        margin: 20px 0;
      }
      .table {
        flex: 1;
      }
    }
  }
}
</style>
