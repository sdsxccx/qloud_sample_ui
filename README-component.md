# select-tree 组件说明 

1. select-tree 属性介绍
   
  1. data 为数结构数据，默认类型为数组。
  2. placeholder 为搜索框placeholder字样，默认为 "检索关键字"。
  3. defaultProps 为配置选项，主要包含 (label/children/disabled/isLeaf) 四个字段。
     （1）label 指定节点标签为节点对象的某个属性值。
      (2) children 指定子树为节点对象的某个属性值。
      (3) disabled 指定节点选择框是否禁用为节点对象的某个属性值。
      (4) isLeaf 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效。
  4. multiple 配置是否可多选 默认为false。
  5. nodeKey 每个树节点用来作为唯一标识的属性（即为ID）。
  6. defaultCheckedKeys 默认选中的节点key数组。
  7. width 下拉框和input输入框宽度, 默认为250px。
  8. height 下拉框高度, 默认为300px。
  9. isSearchShow 是否显示搜索框，默认为false。
  10. isResetShow 重置按钮是否显示，默认为false。

2. select-tree 父组件如何获取子组件选中的值。
   
   1. 在父组件增加 @getValue 方法然后调用，所得到的值即为子组件所选中的。   