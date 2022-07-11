<template>
  <div class="transfer">
    <p style="text-align: center; margin: 0 0 20px">使用 render-content 自定义数据项</p>
    <div style="text-align: center">
      <transfer
        v-model="value"
        style="text-align: left; display: block"
        :filterable="true"
        @getValue="getValue"
        :renderContent="renderFunc"
        :leftDefaultChecked="[2, 3]"
        :rightDefaultChecked="[1]"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/总${total}'
        }"
        @change="handleChange"
        :data="data">
        <!--        <span slot="content" slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>-->
        <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
        <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
      </transfer>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .transfer {
    width: 100%;
  }

  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>

<script>
  export default {
    data() {
      const generateData = () => {
        const data = []
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${i}`,
            disabled: i % 4 === 0,
            date: 1598609699020
          })
        }
        return data
      }
      return {
        data: generateData(),
        value: [1],
        value4: [1],
        renderFunc(h, option) {
          return h(
            'div',
            {
              style: {
                'display': 'flex',
                'justify-content': 'space-between',
                'align-items': 'center'
              }
            },
            [
              h(
                'span',
                option.label
              ),
              h(
                'el-date-picker',
                {
                  props: {  //这里可以设置它的属性
                    value: option.date,
                    type: 'daterange'
                  },
                  style: {
                    'width': '240px',
                    'margin-left': '15px'
                  },
                  on: { //操作事件
                    'input': (val) => {  //这里会起到监听的作用
                      console.log(val)
                    }
                    // 'on-change': function () { //值发生了改变调用方法
                    //   _this.functionFun() // 方法自定义
                    // }
                  }
                }
              ),
              h(
                'ElInput',
                {
                  props: {  //这里可以设置它的属性
                    value: option.date,
                  },
                  on: { //操作事件
                    'input': (val) => {  //这里会起到监听的作用
                      console.log(val)
                      option.date = val;
                    },
                    'change': function () { //值发生了改变调用方法
                      _this.functionFun() // 方法自定义
                    }
                  },
                }
              ),

            ]
          )
        }

      }
    },

    methods: {
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys)
      },
      getValue(val) {
        console.log(val)
      }
    }
  }
</script>
