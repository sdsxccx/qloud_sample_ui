<template>
    <tableView
        :showOverflowTooltip="tableData.showOverflowTooltip"
        :tableHeaderData="tableData.tableHeaderData"
        :tableData="tableData.tableData"
        :isPage="tableData.isPage"
        :currentPage="tableData.currentPage"
        :pageSize="tableData.pageSize"
        :total="tableData.total"
        @getPageSize="sizeChange"
        @getPage="currentPageChange"
    />
</template>
<script>
import tableMethods from "../../mock/table"
export default {
  name: 'Table',
  data() {
    return {
      tableData: {
        currentPage: 1,
        isPage: true,
        loading: true,
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
          this.tableData.total = res.total;
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
    sizeChange(size) {
        console.log(size)
    },
    currentPageChange(page) {
        console.log(page)
    },
  }
};
</script>