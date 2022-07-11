<!--
 * @Author: liguanghui
 * @Date: 2020-07-28 11:40:25
 * @LastEditors: liguanghui
 * @LastEditTime: 2020-09-30 17:06:59
-->
<template>
  <div class="m-tree">
    <el-tree
      :ref="treeRef"
      :class="className"
      :data="treeData"
      :empty-text="emptyText"
      :show-checkbox="showCheckbox"
      :node-key="oneNodeKey"
      :props="defaultProps"
      :lazy="isLazy"
      :load="funLoad"
      :check-strictly="checkStrictly"
      :check-on-click-node="checkOnClickNode"
      :highlight-current="highlightCurrent"
      :current-node-key="currentNodeKey"
      :default-expand-all="defaultExpandAll"
      :default-expanded-keys="defaultExpandedKeys"
      :default-checked-keys="defaultCheckedKeys"
      :accordion="accordion"
      :expand-on-click-node="isExpandOnClickNode"
      :icon-class="iconClass"
      @check-change="handleCheckChange"
      @node-contextmenu="rightClick"
    >
      <!-- @node-click="handleNodeClick" -->
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <el-radio
          v-model="checked"
          :label="data.id"
          @click.stop.native
          @change="handleNodeClick(data, node)"
        >
          {{ node.label }}
        </el-radio>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "base-tree",
  props: {
    // ref的值
    treeRef: {
      type: String,
      default: "base-tree",
    },
    // 自定义的样式名
    className: {
      type: String,
      default: "",
    },
    // el-tree的渲染数据
    treeData: {
      type: Array,
      default: [],
      validator(arr) {
        if (!Array.isArray(arr)) {
          console.error("treeData只接收数组类型");
        }
        return true;
      },
    },
    // 对el-tree的渲染数据进行属性定义
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: "children",
          label: "label",
        };
      },
      validator(obj) {
        if (
          !Object.keys(obj).some((even) =>
            "labelchildrendisabledisLeaf".includes(even)
          )
        ) {
          console.error(
            "tree prop对象至少要包含label，children，disabled，isLeaf属性其中之一"
          );
        }
        return true;
      },
    },
    // 是否懒加载子节点，需与 load 方法结合使用
    isLazy: {
      type: Boolean,
      default: false,
    },
    // 加载子树数据的方法，仅当 lazy 属性为true 时生效(function(node, resolve))
    funLoad: {
      type: Function,
    },
    // 内容为空的时候展示的文本
    emptyText: {
      type: String,
    },
    // 节点是否可被选择
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    oneNodeKey: {
      type: String,
      default: "id",
    },
    // 是否在点击节点的时候选中节点
    checkOnClickNode: {
      type: Boolean,
      default: false,
    },
    // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    // 是否高亮当前选中节点
    highlightCurrent: {
      type: Boolean,
      default: false,
    },
    // 当前选中的节点
    currentNodeKey: {
      type: String,
    },
    // 是否默认展开所有节点
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    // 是否在点击节点的时候展开或者收缩节点。如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
    isExpandOnClickNode: {
      type: Boolean,
      default: true,
    },
    // 默认展开的节点的 key 的数组
    defaultExpandedKeys: {
      type: Array,
    },
    // 默认勾选的节点的 key 的数组
    defaultCheckedKeys: {
      type: Array,
    },
    // 是否每次只打开一个同级树节点展开
    accordion: {
      type: Boolean,
      default: false,
    },
    // 自定义树节点的图标
    iconClass: {
      type: String,
    },
    // 设置选中的 node-key
    currentKey: {
      type: String,
    },
  },
  data() {
    return {
      checked: "",
    };
  },
  watch: {
    checked(v) {
      console.log(v);
    },
    treeData: {
      handler() {
        this.$nextTick(() => {
          if (this.currentKey) {
            this.$refs[this.treeRef].setCurrentKey(this.currentKey);
            this.checked = this.currentKey;
          }
        });
      },
      immediate: false,
    },
  },
  mounted() {
    if (this.currentKey) {
      this.$refs[this.treeRef].setCurrentKey(this.currentKey);
      this.checked = this.currentKey;
    }
  },
  methods: {
    // 节点被点击时的回调
    handleNodeClick(data, node, element) {
      this.$emit("nodeClick", { data, node, element });
    },
    // 节点选中状态发生变化时的回调
    handleCheckChange(obj, checked, childrenChecked) {
      this.$emit("checkChange", { obj, checked, childrenChecked });
    },
    // 节点被右键点击时的回调
    rightClick(event, data, node, element) {
      this.$emit("rightClick", { event, data, node, element });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/common.scss";
@import "@/styles/element-variables.scss";
.m-tree {
  width: 200px;
  max-width: 200px;
  overflow: auto;
  height: 100%;
  background: $def-bgc;
  ::v-deep .el-tree {
    color: $def-color3;
    .el-tree-node {
      > .el-tree-node__content {
        min-width: 100%;
        display: inline-block;
        > .el-tree-node__label {
          padding-right: 10px;
          height: 38px;
          line-height: 26px;
          min-width: 100%;
          font-size: 12px !important;
        }
      }
      > .el-tree-node__children {
        overflow: visible;
      }
      .el-radio__input {
        display: none;
      }
      .el-radio__label {
        padding-left: 0;
      }
      .custom-tree-node {
        vertical-align: middle;
      }
    }
  }
  // ::v-deep
  //   .el-tree--highlight-current
  //   .el-tree-node.is-current
  //   > .el-tree-node__content {
  //   color: $--color-primary;
  // }
}
</style>
