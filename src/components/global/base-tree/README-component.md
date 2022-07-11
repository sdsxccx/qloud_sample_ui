# base-tree 组件说明 

常用的下拉框选择树编写。

## 基础用法

基础的选择树形结构展示。

```html
    <base-tree
      :treeRef="ref"
      :class-name="class"
      :tree-data="treeData"
      :current-node-key="currentNodeKey"
      :is-expand-on-click-node="isExpandOnClickNode"
      :default-expand-all="defaultExpandAll"
      :default-expanded-keys="defaultExpandedKeys"
      :highlight-current="highlightCurrent"
      :current-key="currentKey"
      @nodeClick="nodeClick"
      @checkChange="checkChange"
    ></base-tree>
```
```js
    export default {
        data() {
           return {
              ref: "treeId",
              class: "treeClass",
              treeData: [],
              defaultExpandedKeys: [],
              highlightCurrent: true,
              isExpandOnClickNode: false,
              currentKey: ""
            }
        }
    }
```


## 节点被点击时的回调方法

承接上面基础用法下的 `nodeClick` 方法

```js
   nodeClick(data, node, element) {
      // 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
    }
```

## 节点选中状态发生变化时的回调

承接上面基础用法下的 `nodeClick` 方法

```js
   checkChange(obj, checked, childrenChecked) {
      // 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
    }
```

## 配置在显示复选框的情况下，是否严格的遵循父子不互相关联的做法

在组件内加上 `checkStrictly` 属性，将`checkStrictly` 改为true,则显示多选框。
```html
    <base-tree
      :treeRef="ref"
      :class-name="class"
      :tree-data="treeData"
      :checkStrictly="checkStrictly"
      :current-node-key="currentNodeKey"
      :is-expand-on-click-node="isExpandOnClickNode"
      :default-expand-all="defaultExpandAll"
      :default-expanded-keys="defaultExpandedKeys"
      :highlight-current="highlightCurrent"
      :current-key="currentKey"
      @nodeClick="nodeClick"
      @checkChange="checkChange"
    ></base-tree>
```

```js
    export default {
        data() {
           return {
              ref: "treeId",
              class: "treeClass",
              treeData: [],
              checkStrictly: true,
              defaultExpandedKeys: [],
              highlightCurrent: true,
              isExpandOnClickNode: false,
              currentKey: ""
            }
        }
    }
```



## base-tree 属性介绍
属性配置均可以参考，以上的父子不互相关联配置

参数|说明默认值|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
treeRef|ref的值|String|-|-
className|自定义的样式名|String|-|-
treeData|el-tree的渲染数据|Array|-|-
emptyText|内容为空的时候展示的文本|String|-|-
showCheckbox|节点是否可被选择|Boolean|-|false
oneNodeKey|每个树节点用来作为唯一标识的属性，整棵树应该是唯一的|String|-|id
checkOnClickNode|是否在点击节点的时候选中节点|Boolean|-|false
checkStrictly|在显示复选框的情况下，是否严格的遵循父子不互相关联的做法|Boolean | - | false
highlightCurrent|是否高亮当前选中节点|Boolean | - | false
currentNodeKey|当前选中的节点|String | - | -
defaultExpandAll|是否默认展开所有节点|Boolean|-|false
isExpandOnClickNode|是否在点击节点的时候展开或者收缩节点。如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。|Boolean|-|true
defaultExpandedKeys|默认展开的节点的 key 的数组|Array|-|-
defaultCheckedKeys|默认勾选的节点的 key 的数组|Array|-|-
accordion|是否每次只打开一个同级树节点展开|Boolean|-|false
iconClass|自定义树节点的图标|String|-|-

## defaultProps 属性介绍

参数|<div style='width:320pt'>说明默认值</div>|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
label|指定节点标签为节点对象的某个属性值|String|-|-
children|指定子树为节点对象的某个属性值|String|- |-
disabled|指定节点选择框是否禁用为节点对象的某个属性值|Boolean|-|false

## base-tree 获取参数方法使用

方法名|<div style='width:340pt'>说明</div>|<div style='width:110pt'>参数</div>
:-|:-|:-
nodeClick|节点被点击时的回调|获取的参数为data, node, element
checkChange|节点选中状态发生变化时的回调|获取的参数为obj, checked, childrenChecked


      