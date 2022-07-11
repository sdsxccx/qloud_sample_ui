<template>
  <div class="g-two_router">
    <template v-if="$route.path.split('/').length>3">
      <keep-alive v-if="!$route.meta.noCache">
        <router-view />
      </keep-alive>
      <router-view v-else />
    </template>
    <template v-else>
      <slot name="threeContent"></slot>
    </template>
  </div>
</template>

<script>
  export default{
    name:"twoRouter"
  }
</script>

<style lang="scss" scoped="scoped">
.g-two_router{
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
