<!--
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-20 10:00:34
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-08-20 10:00:34
-->
 
<template>
  <el-tag :type="type" :size="size">
    {{ label }}
  </el-tag>
</template>
<script>
export default {
  name: "Tag",
  props: {
    type: {
      type: String,
      default: "",
      validator(type) {
        if (type && !["success", "info", "warning", "danger"].includes(type)) {
          console.error(
            "type必须为:" + ["success", "info", "warning", "danger"].join("、")
          );
        }
        return true;
      },
    },
    label: {
      type: String,
      default: "",
    },
  },
  computed: {
    size() {
      return this.$store.state.settings.size;
    },
  },
};
</script>
<style lang="scss" scoped="scoped"></style>
