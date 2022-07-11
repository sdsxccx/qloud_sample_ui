<template>
  <div>
    <select-tree
      :data="data"
      :defaultProps="defaultProps"
      :multiple="multiple"
      :nodeKey="nodeKey"
      :isSearchShow="isSearchShow"
      @getValue="selectTreeVlaue"
      :checkedKeys="defaultCheckedKeys"
      :isResetShow="isResetShow"
      :width="300"
    ></select-tree>
  </div>
</template>
<script>
export default {
  name: "selectTreeView",
  data() {
    return {
      multiple:false,
      isSearchShow:true,
      isResetShow:true,
      defaultCheckedKeys: ['1003'],
      defaultProps: {
        children: "childrenList",
        label: "menuName",
      },
      nodeKey: "menuId",
      data: [
        {
          menuId: 1,
          menuName: "系统管理",
          childrenList: [
            {
              menuId: 100,
              menuName: "用户管理",
              childrenList: [
                {
                  menuId: 1000,
                  menuName: "用户查询",
                },
                {
                  menuId: 1001,
                  menuName: "用户新增",
                },
                {
                  menuId: 1002,
                  menuName: "用户修改",
                },
                {
                  menuId: 1003,
                  menuName: "用户删除",
                },
              ],
            },
            {
              menuId: 101,
              menuName: "角色管理",
              childrenList: [
                {
                  menuId: 1006,
                  menuName: "角色查询",
                },
                {
                  menuId: 1007,
                  menuName: "角色新增",
                },
                {
                  menuId: 1008,
                  menuName: "角色修改",
                },
                {
                  menuId: 1011,
                  menuName: "删除角色",
                },
                {
                  menuId: 1012,
                  menuName: "沙箱设置",
                  childrenList: [
                    {
                      menuId: 1026,
                      menuName: "沙箱介绍",
                    },
                    {
                      menuId: 1027,
                      menuName: "沙箱环境",
                    },
                    {
                      menuId: 1028,
                      menuName: "应用查询范德萨发撒范德萨范德萨发范德萨范德萨发",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },

  created() {},
  mounted() {
  },
  methods: {
    // 取值
    selectTreeVlaue(value) {
      this.valueId = value;
      console.log(this.valueId);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>