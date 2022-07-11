<!--
 * @Descripttion:
 * @version:
 * @Author: liguanghui
 * @Date: 2020-08-24 11:01
-->
<template>
  <el-popover
    placement="bottom-start"
    :width="popoverwidth"
    trigger="manual"
    :disabled="disabled"
    v-model="isShowSelect"
    @hide="popoverHide"
  >
    <el-input
      v-if="isSearchShow"
      class="selectInput"
      :placeholder="placeholderSearch"
      v-model="filterText"
    ></el-input>
    <div class="tree-box">
      <el-tree
        class="common-tree"
        :style="style"
        ref="tree"
        :default-expand-all="defaultExpandAll"
        :data="data"
        :props="defaultProps"
        :show-checkbox="multiple"
        :node-key="nodeKey"
        :check-strictly="checkStrictly"
        default-expand-all
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        :default-checked-keys="defaultCheckedKeys"
        :highlight-current="highlightCurrent"
        @node-click="handleNodeClick"
        @check-change="handleCheckChange"
      ></el-tree>
    </div>
    <el-select
      :style="selectStyle"
      slot="reference"
      ref="select"
      :disabled="disabled"
      v-model="selectedData"
      :multiple="multiple"
      :placeholder="placeholder"
      @click.native="isShowSelect = !isShowSelect"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-row>
      <el-button
        class="select-tree-ok"
        @click="isShowSelect = false"
        size="mini"
        >确定</el-button
      >
      <el-button
        v-if="isResetShow && multiple"
        class="select-tree-reset"
        @click="resetting"
        size="mini"
        >重置</el-button
      >
    </el-row>
  </el-popover>
</template>
<script>
export default {
  name: "select-tree",
  props: {
    //是否默认展开
    defaultExpandAll: {
      type: Boolean,
      default() {
        return true;
      },
    },
    value: {
      type: String || Array,
      default: "",
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
    // 树结构数据
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    placeholder: {
      type: String,
      default: () => {
        return "请选择";
      },
    },
    //搜索框placeholder字样
    placeholderSearch: {
      type: String,
      default: () => {
        return "检索关键字";
      },
    },
    //配置选项(主要包含 label/children/disabled/isLeaf)
    defaultProps: {
      type: Object,
      default() {
        return {};
      },
    },
    // 配置是否可多选
    multiple: {
      type: Boolean,
      default() {
        return false;
      },
    },
    //每个树节点用来作为唯一标识的属性
    nodeKey: {
      type: String,
      default() {
        return "id";
      },
    },
    // 显示复选框情况下，是否严格遵循父子不互相关联
    checkStrictly: {
      type: Boolean,
      default() {
        return false;
      },
    },
    // 默认选中的节点key数组
    checkedKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    //默认下拉框和input输入框宽度
    width: {
      type: Number,
      default() {
        return 250;
      },
    },
    popoverWidth: {
      type: Number,
      default() {
        return 250;
      },
    },
    //默认下拉框高度
    height: {
      type: Number,
      default() {
        return 300;
      },
    },
    //搜索框是否显示
    isSearchShow: {
      type: Boolean,
      default() {
        return false;
      },
    },
    //重置按钮是否显示
    isResetShow: {
      type: Boolean,
      default() {
        return false;
      },
    },
    //是否高亮
    highlightCurrent: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      defaultCheckedKeys: [],
      filterText: "",
      isShowSelect: false, // 是否显示树状选择器下拉框
      options: [],
      selectedData: [], // 选中的节点
      style:
        "width:" + (this.width - 13) + "px;" + "height:" + this.height + "px;",
      selectStyle: "width:" + this.width + "px;",
      checkedIds: [],
      checkedData: [],
    };
  },
  mounted() {
    setTimeout(() => {
      if (this.checkedKeys.length > 0) {
        if (this.multiple) {
          this.selectedData = this.checkedKeys.map((item) => {
            var node = this.$refs.tree.getNode(item);
          });
        } else {
          var key = this.checkedKeys[0];
          console.log("this.selectedData", key);
          var node = this.$refs.tree.getNode(key);
          this.selectedData = node.label;
        }
      }
    }, 500);
  },
  methods: {
    // 节点被点击时的回调,返回被点击的节点数据
    handleNodeClick(data, node) {
      if (!this.multiple) {
        let tmpMap = {};
        tmpMap.value = node.key;
        tmpMap.label = node.label;
        tmpMap.parent = node.parent;
        this.options = [];
        this.options.push(tmpMap);
        this.selectedData = node.label;
        this.isShowSelect = !this.isShowSelect;
        this.$emit("getValue", this.options);
      }
    },
    // 节点选中状态发生变化时的回调
    handleCheckChange() {
      var checkedKeys = this.$refs.tree.getCheckedKeys(); // 所有被选中的节点的 key 所组成的数组数据
      this.options = checkedKeys.map((item) => {
        var node = this.$refs.tree.getNode(item); // 所有被选中的节点对应的node
        let tmpMap = {};
        tmpMap.value = node.key;
        tmpMap.label = node.label;
        return tmpMap;
      });
      this.selectedData = this.options.map((item) => {
        return item.label;
      });
      this.selectObjDatas = this.options.map((item) => {
        return item;
      });
      this.$emit("getValue", this.selectObjDatas);
    },
    //搜索框下拉框节点匹配
    filterNode(value, data, node) {
      if (!value) return true;
      let menuName = this.defaultProps.label;
      return data[menuName].indexOf(value) !== -1;
    },
    //去掉重置按钮
    resetting() {
      if (this.multiple) {
        this.selectedData = [];
        this.$refs.tree.setCheckedKeys([]);
      }
    },
    popoverHide() {
      if (this.multiple) {
        this.checkedIds = this.$refs.tree.getCheckedKeys(); // 所有被选中的节点的 key 所组成的数组数据
        this.checkedData = this.$refs.tree.getCheckedNodes(); // 所有被选中的节点所组成的数组数据
      } else {
        this.checkedIds = this.$refs.tree.getCurrentKey();
        this.checkedData = this.$refs.tree.getCurrentNode();
      }
      this.$emit("popoverHide", this.checkedIds, this.checkedData);
    },
  },
  computed: {
    popoverwidth() {
      return this.width; // TODO
    },
  },
  watch: {
    isShowSelect(val) {
      // 隐藏select自带的下拉框
      this.$refs.select.blur();
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    value(newVal, oldVal) {
      if (!newVal && !this.multiple) {
        this.selectedData = "";
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.selectInput {
  padding: 0 5px;
  box-sizing: border-box;
}
.common-tree {
  overflow: auto;
}
.common-tree::-webkit-scrollbar {
  display: none;
}
.select-tree-ok {
  margin-top: 10px;
  background: #43a3fb;
  color: #fff;
  float: right;
}
.select-tree-reset {
  margin-top: 10px;
  background: #43a3fb;
  color: #fff;
  float: right;
  margin-right: 10px;
}
.tree-box {
  // overflow-x:auto ;
  // width: 100%;
}
</style>
<style lang="scss">
.common-tree {
  .el-tree-node__label {
    font-size: 13px;
  }
}
</style>
