<!--
 * @Author: liguanghui
 * @Date: 2020-09-16 17:45:42
 * @LastEditors: liguanghui
-->

<template>
  <el-dropdown :trigger="trigger" :size="size" @command="handleCommand">
    <el-button type="primary" v-if="type === 'button'" :size="size">
      {{ title }}<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <span class="el-dropdown-link" v-else>
      {{ title }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="v in dropdownData"
        :key="v.value"
        :command="v.value"
        :disabled="v.disabled"
      >
        {{ v.label }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: "dropdown",
  props: {
    // 文字下拉菜单 还是 按钮下拉菜单
    type: {
      type: String,
      default: "text",
    },
    // 下拉菜单标题
    title: {
      type: String,
      default: "下拉菜单",
    },
    // 下拉菜单选项 [{label: "demo", value: "demoValue"}]
    dropdownData: {
      type: Array,
      default: () => [],
    },
    // 下拉菜单的交互方式
    trigger: {
      type: String,
      default: "hover",
    },
  },
  computed: {
    size() {
      return this.$store.state.settings.size;
    },
  },
  methods: {
    /**
     * @description: 点击下拉菜单
     * @param: 对应菜单选项的value
     */
    handleCommand(command) {
      this.$emit("dropdownHandle", command);
    },
  },
};
</script>
<style lang="scss" scoped></style>
