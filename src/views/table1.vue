<template>
  <tableView
    height="auto"
    :tableHeaderData="tableData.tableHeaderData"
    :tableData="tableData.tableData"
  />
</template>
<script>
  export default {
    data() {
      return {
        tableData: {
          tableHeaderData: [
            { prop: "name", label: "过程名称" },
            { prop: "tags", label: "过程标签" },
            { prop: "type", label: "属性" },
            { prop: "state", label: "状态" },
            { prop: "ori", label: "业务属性" },
            { prop: "list", label: "订单属性" },
            { prop: "address", label: "当前地点" },
            { prop: "time", label: "时间" },
            { prop: "endtime", label: "更新时间" },
          ],
          tableData: [
            {
              name: "查看目录",
              ori: "对你说你的卡上呢",
              list: "dnasdnaskd",
              address: "陕西省西安市",
              tags: "日常巡检",
              state: "已完成",
              type: "yes",
              time: "2019-03-24 17:07:54",
              endtime: "2019-03-24 17:07:54",
              value: "",
            },
          ],
        },
      };
    },
  };
</script>