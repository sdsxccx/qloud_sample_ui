/*-- * @Descripttion: * @version: * @Author: liguanghui * @Date: 2020-08-26
10:48:37 * @LastEditors: liguanghui * @LastEditTime: 2020-08-26 10:48:37 --*/
<template>
  <h3 class="headline p12 c3" :style="{ 'border-color': theme }">
    {{ label }}
  </h3>
</template>
<script>
export default {
  name: "headline",
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  computed: {
    theme() {
      return this.$store.state.settings.theme;
    },
  },
};
</script>
<style lang="scss" scoped="scoped">
.headline {
  padding-left: 10px;
  border-left: 3px solid;
  height: 15px;
  line-height: 15px;
}
</style>
