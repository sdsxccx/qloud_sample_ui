<template>
  <div class="home">
      <div class="block-margin-bottom">
        <el-button type="primary" size="mini" @click="setSelectData">选中第4条</el-button>
      </div>
        <tableView
            height="auto"
            :checkedRadio="checkedData"
            :isRidio="true"
            :showOverflowTooltip="tableData.showOverflowTooltip"
            :tableHeaderData="tableData.tableHeaderData"
            :tableData="tableData.tableData"
            @getRadioSelected="getRadioSelectedData"
        />
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkedData:  {},
      tableData: {
        isPage: true,
        loading: true,
        showOverflowTooltip: false,
        tableHeaderData: [
          { prop: 'name', label: '过程名称' },
          { prop: 'tags', label: '过程标签' },
          { prop: 'type', label: '属性' },
          { prop: 'state', label: '状态' },
          { prop: 'ori', label: '业务属性' },
          { prop: 'list', label: '订单属性' },
          { prop: 'address', label: '当前地点' },
          { prop: 'time', label: '时间' },
          { prop: 'endtime', label: '更新时间' }
        ],
        tableData: [
            {   
            id: 1,
            name: '查看目录1',
            ori: '对你说你的卡上呢',
            list: 'dnasdnaskd',
            address: '陕西省西安市',
            tags: '日常巡检',
            status: 2,
            state: '已完成',
            type: 'yes',
            time: '2019-03-24 17:07:54',
          },
          {
            id: 2,
            name: '查看目录2',
            ori: '对你说你的卡上呢2',
            list: 'dnasdnaskd',
            address: '陕西省西安市',
            tags: '日常巡检',
            state: '已完成',
            type: 'yes',
            time: '2019-03-24 17:07:54',
          },
          {
            id: 3,
            name: '查看目录3',
            ori: '对你说你的卡上呢',
            list: 'dnasdnaskd',
            address: '陕西省西安市',
            tags: '日常巡检',
            state: '已完成',
            type: 'yes',
            time: '2019-03-24 17:07:54',
            endtime: '2019-03-24 17:07:54',
            value: ''
          },
          {
            id: 4,
            name: '查看目录4',
            ori: '对你说你的卡上呢',
            list: 'dnasdnaskd',
            address: '陕西省西安市',
            tags: '日常巡检',
            state: '已完成',
            type: 'yes',
            time: '2019-03-24 17:07:54',
          },
        ]
      }
    };
  },
  mounted() {
  },
  methods: {
      setSelectData() {
        this.checkedData = JSON.parse(JSON.stringify(this.tableData.tableData[3]));
      },
      // 获取单选选中数据
      getRadioSelectedData(data) {
        console.log(data)
      }
  }
};
</script>
<style lang="scss" scoped="scoped">
.home {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  ::v-deep .el-container {
    .el-header {
      margin-bottom: 10px;
      padding: 0;
    }
    .el-main {
      padding: 0;
    }
  }
}
</style>
