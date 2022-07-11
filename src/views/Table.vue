<template>
  <div class="home">
    <el-container>
      <el-header height="auto"><Title :list="list" /></el-header>
      <el-main>
        <tableView
          :showOverflowTooltip="tableData.showOverflowTooltip"
          :operateObj="tableData.operate"
          :loading="tableData.loading"
          :tableHeaderData="tableData.tableHeaderData"
          :tableData="tableData.tableData"
          :isPage="tableData.isPage"
          v-on:operate="getIndex"
        />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import tableMethods from "../../mock/table"
export default {
  name: 'Table',
  data() {
    return {
      list: [{ name: '首页', path: '/' }, { name: '我的', path: '/index' }, { name: '家族', path: '/home' }],
      tableData: {
        isPage: true,
        loading: true,
        operate: {
          width: 200,
          list: [
            { label: '编辑1', id: '0' },
            { label: '查看2', id: '1' },
            { label: '编辑3', id: '2' },
            { label: '查看4', id: '3' },
            { label: '编辑5', id: '4' },
            { label: '删除', id: '5' }
          ]
        },
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
        tableData: []
      }
    };
  },
  mounted() {
    setTimeout(()=>{
      this.getList((res)=>{
        if(res.code == 200){
          this.tableData.tableData = res.list;
          this.tableData.loading = false;
        }
      })
    },2000)
  },
  methods: {
    async getList(fn){
      let data = tableMethods[0].response();
      return await fn(data);
    },
    getIndex(e) {
      console.log(e);
      if (e.operate.id === "5") {
        this.$handleDeleteConfirm(e.row.name).then(() => {
          this.$handleSuccess("删除成功")

        })
      }
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
