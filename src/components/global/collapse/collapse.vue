<template>
  <div class="collapse-block" :class="{'is-active': collapse}" :style="{'height': collapse ? `${wrapperHeight}px` : 'auto'}">
    <div class="collapse-content" id="collapse-content" style="height: fit-content">
      <slot name="content"></slot>
    </div>
    <div>
      <i v-if="isShowArrow" :style="{'height': `${wrapperHeight}px`, 'line-height': `${wrapperHeight}px`}" class="el-icon-arrow-up"
         @click="handleCollapse">
      </i>
    </div>
  </div>
</template>
<script>
var elementResizeDetectorMaker = require("element-resize-detector")
export default {
  name: 'collapse',
  data() {
    return {
      //外层高度
      wrapperHeight: '0',
      //是否折叠
      collapse: true,
      //是否显示箭头
      isShowArrow: false,
    };
  },
  computed: {

  },
  methods: {
    handleCollapse() {
      this.collapse = !this.collapse;
    },
  },
  mounted() {
    const that = this;
    let erd = elementResizeDetectorMaker();
    erd.listenTo(document.getElementById("collapse-content"),  (element) => {
      const children = element.childNodes;
      let computedStyle;
      if (children.length > 1) {
        this.wrapperHeight = children[1].offsetHeight;
        if (window.getComputedStyle) {
          computedStyle = getComputedStyle(children[1], null)
        } else {
          computedStyle = children[1].currentStyle;//兼容IE的写法
        }
        const contentHeight = element.offsetHeight;
        if (contentHeight > this.wrapperHeight
          + Number(computedStyle.marginTop.substring(0, computedStyle.marginTop.indexOf('px')))
          + Number(computedStyle.marginBottom.substring(0, computedStyle.marginBottom.indexOf('px')))
        ) {
          this.isShowArrow =  true;
        } else {
          this.isShowArrow = false;
        }
      } else {
        this.wrapperHeight = 0;
        this.isShowArrow = false;
      }
    })
  }
};
</script>
<style lang="scss" scoped>
.collapse-block {
  display: flex;
  transition: all 0.3s;
  overflow: hidden;

  .collapse-content {
    height: fit-content;
    flex: 1;
  }
  .el-icon-arrow-up {
    display: block;
    text-align: center;
    font-size: 20px;
    transition: all 0.3s;
  }

  &.is-active {
    height: auto;
    .collapse-content {
    }
    .el-icon-arrow-up {
      transform: rotate(-180deg);
    }
  }
}
</style>
