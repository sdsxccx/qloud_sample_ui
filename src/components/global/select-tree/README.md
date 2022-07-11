# select-tree 组件说明 

常用的下拉框选择树编写。

## 基础用法

基础的下拉框选择树形结构展示。

```html
    <select-tree
      :data="data"
      :defaultProps="defaultProps"
       ref= "treeSelectId"
      :nodeKey="nodeKey"
       @getValue="selectTreeVlaue"
      :width="300"
    ></select-tree>
```
```js
    export default {
        data() {
           return {
              data: [
        {
          menuId: 1,
          menuName: "系统管理",
          childrenList: [
            {
              menuId: 100,
              menuName: "用户管理",
            }
          ],    
        defaultProps: {
        children: "childrenList",
        label: "menuName",
        disabled: "disabled",
      },
        nodeKey: "menuId",
            }
         }
      }  
```


## 获取子组件选中的值方法

承接上面基础用法下的 `getValue` 方法

```js
   selectTreeVlaue(value) {
      this.value = value;
    }
```
## 配置多选节点

在组件内加上 `multiple` 属性，将`multiple` 改为true,则显示多选框。
```html
    <select-tree
      :data="data"
      :multiple="multiple"
      :defaultProps="defaultProps"
       ref= "treeSelectId"
      :nodeKey="nodeKey"
       @getValue="selectTreeVlaue"
      :width="300"
    ></select-tree>
```

```js
    export default {
        data() {
           return {
            data: [
        {
          menuId: 1,
          menuName: "系统管理",
          childrenList: [
            {
              menuId: 100,
              menuName: "用户管理",
            }
          ],       
        multiple:true,
        defaultProps: {
        children: "childrenList",
        label: "menuName",
        disabled: "disabled",
      },
        nodeKey: "menuId",
            }
         }
      }  
```



## select-tree 属性介绍
属性配置均可以参考，以上的多节点配置

参数|说明默认值|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
data|为树结构数据|Array|-|-
placeholder|为搜索框placeholder字样|String|-|检索关键字
defaultProps|为配置选项,具体看下表|Object|-|-
multiple|配置是否可多选|Boolean|-|false
nodeKey|每个树节点用来作为唯一标识的属性|String|-|-
defaultCheckedKeys|默认选中的节点key数组|Array|-|-
width|下拉框和input输入框宽度|Number|-|250
height|下拉框高度|Number | - | 300
isSearchShow|是否显示搜索框|Boolean | - | false
isResetShow|重置按钮是否显示(注：需与多选配合使用同时为true)  |Boolean | - | false
checkStrictly|父与子关系是否相互关联|Boolean|-|false
highlightCurrent|选中后是否高亮|Boolean|-|false

## defaultProps 属性介绍

参数|<div style='width:320pt'>说明默认值</div>|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
label|指定节点标签为节点对象的某个属性值|String|-|-
children|指定子树为节点对象的某个属性值|String|- |-
disabled|指定节点选择框是否禁用为节点对象的某个属性值|Boolean|-|false

## select-tree 获取参数方法使用

方法名|<div style='width:340pt'>说明</div>|<div style='width:110pt'>参数</div>
:-|:-|:-
getValue|父组件如何获取子组件选中的值|获取的参数为id与label


      