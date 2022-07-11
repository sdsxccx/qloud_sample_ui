import Vue from 'vue'
const componentsContext = require.context('./global', true, /\index.js$/);
componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component);
  const ctrl = componentConfig.default || componentConfig;
  Vue.component(ctrl.name, ctrl);
})
