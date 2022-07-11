<template>
  <div class="home">
    <tableView
      :operateObj="tableData.operate"
      :tableHeaderData="tableData.tableHeaderData"
      :tableData="tableData.tableData"
      v-on:operate="getIndex"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: {
        operate: {
          width: 200,
          list: [
            {
              label: '编辑1',
              id: '0' ,
              isShow: (rowData) => {
                if (rowData.status%2 ===0) {
                  return false
                } else {
                  return true;
                }
              }
            },
            {
              label: '查看2',
              id: '1'
            },
            {
              label: '删除3',
              id: '2'
            },
          ]
        },
        tableHeaderData: [
          { prop: 'name', label: '过程名称' },
          { prop: 'tags', label: '过程标签' },
          { prop: 'state', label: '状态' },
          { prop: 'list', label: '订单属性' },
          { prop: 'address', label: '当前地点' },
          { prop: 'time', label: '时间' },
        ],
        tableData: [
          {
            name: '查看目录',
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
            name: '查看目录',
            ori: '对你说你的卡上呢',
            list: 'dnasdnaskd',
            address: '陕西省西安市',
            tags: '日常巡检',
            state: '已完成',
            type: 'yes',
            time: '2019-03-24 17:07:54',
          },
          {
            name: '查看目录',
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
            name: '查看目录',
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
  methods: {
    getIndex(e) {
      if (e.operate.id === "2") {
        this.$handleDeleteConfirm(e.row.name).then(() => {
          this.$handleSuccess("删除成功")
        })
      }
    }
  }
};
</script>
