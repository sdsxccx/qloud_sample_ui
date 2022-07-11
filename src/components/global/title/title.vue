/* * @Author: liguanghui * @Date: 2020-07-23 15:18:52 * @Last Modified by:
liguanghui * @Last Modified time: 2020-07-24 10:07:13 */
<template>
  <div class="g-title">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item, index) in list"
        :key="index"
        :to="{ path: `${item.path}` }"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "Title",
  props: {
    list: {
      type: Array,
      default: [],
    },
    /**
     * @params
     * list:[
     * 	{"name":"",path:"/"},
     * 	{"name":"",path:"/"},
     * 	...
     * ]
     */
  },
};
</script>
<style lang="scss" scoped="scoped">
.g-title {
  padding: 10px;
}
</style>
