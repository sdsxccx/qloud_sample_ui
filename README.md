# qloud-sample-ui

## 介绍
该项目是提供管理系统基于element封装的公共组件，例如table，form，dialog 等
## 软件架构
- 软件架构说明
- 基于vue  elment-ui
- 前后端分离

### 依赖安装
```
npm install
```

### 开发环境启动方式
```
npm run dev
```

### 打包方式
```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

### 目录说明
1. mock
  1. mock 模拟前后端交互文件夹
2. src
  1. api 接口封装
  2. asserts 静态资源存放地址
  3. bus vue兄弟传参时使用
  4. components 全局组件/公用组件存放地址
  5. directive vue自定义指令存放地址
  6. icon 图标存放地址
  7. lang 国际化配置存放地址
  8. layout vue-admin布局组件存放地址
  9. router vue路由存放地址
  10. store vuex状态管理存放地址
  11. styles 全局/局部样式存放地址
  12. utils 全局公用方法存放地址
  13. vendor 第三方库存放地址
  14. views 局部组件存放地址
  15. App.vue 项目入口组件
  16. main.js 项目入口文件
  17. permission.js 动态路由配置地址
  18. settings.js 全局属性配置存放地址
3. 环境变量
  1. .env.development 开发环境属性存放地址
  2. .env.production 生产环境属性存放地址
4. 公用组件文档
  1.selecTree组件地址：
