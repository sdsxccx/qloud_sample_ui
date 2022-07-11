# popup 组件说明 

dialog对话框。

## 基础用法

基础的选择树形结构展示。

```html
    <popup
      :is-show="isShow"
      :title="title"
      :size="size"
      :footerList="footerList"
      @senddialogVisible="senddialogVisible"
      >
      <template slot="content">
        // 弹出层内容
      </template>
    </popup>
```
```js
    export default {
        data() {
           return {
              isShow: false,
              title: '对话框',
              size: 'small',
              footerList: [
                { name: '取消',
                  type: "",
                  isSubmit: false
                },
                {
                  name: '确定',
                  type: "primary",
                  isSubmit: true
                }
              ]
            }
        }
    }
```


## 点击底部操作按钮的回调方法

承接上面基础用法下的 `senddialogVisible` 方法，该方法会拦截弹窗关闭

```js
   senddialogVisible(flag) {
      if (flag) {
        // 根据参数判断点击的按钮，执行对应方法
      }
      this.isShow = false;
      // 方法执行后需关闭弹框
    },
```


## 配置是否需要遮罩层的方法

在组件内加上 `modal` 属性，将`modal` 改为false,则去掉遮罩层，默认有遮罩层。

```html
    <popup
      :is-show="isShow"
      :title="title"
      :size="size"
      :modal="modal"
      :footerList="footerList"
      @senddialogVisible="senddialogVisible"
      >
      <template slot="content">
        // 弹出层内容
      </template>
    </popup>
```
```js
    export default {
        data() {
           return {
              isShow: false,
              title: '对话框',
              size: 'small',
              modal: true,
              footerList: [
                { name: '取消',
                  type: "",
                  isSubmit: false
                },
                {
                  name: '确定',
                  type: "primary",
                  isSubmit: true
                }
              ]
            }
        }
    }
```



## popup 属性介绍
属性配置均可以参考，以上的遮罩层配置

参数|说明默认值|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
isShow|是否显示|Boolean|-|false
size|宽度|String|medium、small、mini|small
top|Dialog CSS 中的 margin-top 值|String|-|-
modal|是否需要遮罩层|Boolean|-|true
title|Dialog 的标题|String|-|提示
showClose|是否显示关闭按钮|Boolean|-|true
destroyOnClose|关闭时销毁 Dialog 中的元素|Boolean|-|true

## footerList 属性介绍

参数|<div style='width:200pt'>说明默认值</div>|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
name|按钮名称|String|-|-
type|按钮类型|String|primary/success/warning/danger/info/text|-
isSubmit|是否提交按钮|自定义|-|-
loading|加载中状态|Boolean|-|false
disabled|禁用|Boolean|-|false

## popup 点击按钮方法使用

方法名|<div style='width:340pt'>说明</div>|<div style='width:110pt'>参数</div>
:-|:-|:-
senddialogVisible|点击按钮的回调|获取的参数为自定义的按钮标识flag


      