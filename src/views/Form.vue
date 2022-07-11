<template>
  <div>
    <form-view
      ref="form"
      :search-data="searchData"
      :rules="Rules"
      :form-ref="formRef"
      :is-inline="isInline"
      :search-form="searchForm"
      :search-handle="searchHandle"
      :is-block="isBlock"
    />
    <hr>
    <br>
    <form-view
      ref="form"
      :search-data="searchData"
      :rules="Rules"
      :is-left="isLeft"
      :form-ref="formRef"
      :is-inline="isInline1"
      :search-form="searchForm"
      :search-handle="searchHandle"
    />
  </div>
</template>
<script>
import { getPlaceholderMsg, getPlaceholderMsgForSelect } from '@/utils/i18Util.js'
export default {
  name: 'Form',
  data() {
    return {
      seqNo: '',
      isLeft: true,
      isBlock: true,
      isInline: true,
      isInline1: false,
      searchData: {
        name: null,

        age: null,

        sex: null,

        date: '',

        interst: []
      },
      formRef: 'inlineForm',
      searchForm: [
        {
          type: 'Input',
          label: this.$t('sample_test.form.name'),
          prop: 'name',
          width: '220px',
          placeholder: getPlaceholderMsg(this.$t('sample_test.form.name')),
          append: {
            text: 'test',
            render(h) {
              return (
                <span slot="append">
                  212
                </span>
              );
            }
          },
          prepend: {
            text: '',
            render: (h) => {
              const {seqNo, valueChange} = this;
              return (
                <el-select
                  style="width:100px"
                  value={seqNo}
                  onInput={valueChange} placeholder="请选择">
                  <el-option label="餐厅名" value="1"></el-option>
                  <el-option label="订单号" value="2"></el-option>
                  <el-option label="用户电话" value="3"></el-option>
                </el-select>
              );
            }
          }
        },
        {
          type: 'Slot',
          label: '测试slot',
          render: (h) => {
            const {seqNo, valueChange} = this;
            return (
              <el-select
                style="width:100px"
                value={seqNo}
                onInput={valueChange} placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
            );
          }
        },
        {
          type: 'Input',
          label: this.$t('sample_test.form.age'),
          prop: 'age',
          width: '220px',
          placeholder: getPlaceholderMsg(this.$t('sample_test.form.age'))
        },

        {
          type: 'Date',
          label: this.$t('sample_test.form.date'),
          prop: 'date',
          width: '220px',
          placeholder: getPlaceholderMsgForSelect(this.$t('sample_test.form.date'))
        },

        {
          type: 'Select',
          label: this.$t('sample_test.form.sex'),
          prop: 'sex',
          width: '220px',
          options: [
            { label: this.$t('sample_test.form.male'), value: 'M' },
            { label: this.$t('sample_test.form.female'), value: 'F' }
          ],
          props: { label: 'label', value: 'value' },
          change: (row) => '',
          placeholder: getPlaceholderMsgForSelect(this.$t('sample_test.form.sex'))
        },

        {
          type: 'Checkbox',
          label: this.$t('sample_test.form.hobby'),
          prop: 'interst',
          checkboxs: [
            { label: this.$t('sample_test.form.badminton'), value: 'badminton' },
            { label: this.$t('sample_test.form.basketball'), value: 'basketball' },
            { label: this.$t('sample_test.form.football'), value: 'football' },
            { label: this.$t('sample_test.form.pong'), value: 'pong' }
          ],
          props: { label: 'label', value: 'value' }
        },
        {
          type: 'Textarea',
          label: this.$t('sample_test.form.name'),
          prop: 'text',
          rows: 3,
          placeholder: getPlaceholderMsg(this.$t('sample_test.form.name'))
        }
      ],

      searchHandle: [
        {
          label: this.$t('sample_test.form.search'),
          type: 'primary',
          handle: () => this.searchHandleForm(this.formRef)
        },

        { label: this.$t('sample_test.form.reset'), type: 'primary', handle: () => this.resetForm(this.formRef) }
      ],
      // 表单验证
      Rules: {
        name: [
          { required: true, message: getPlaceholderMsg(this.$t('sample_test.form.name')), trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        age: [
        	{ required: true, message: getPlaceholderMsg(this.$t('sample_test.form.age')), trigger: 'blur' },
        	{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sex: [
        	{ required: true, message: getPlaceholderMsgForSelect(this.$t('sample_test.form.sex')), trigger: 'blur' },
        	{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    console.log(this.$handleError)
  },
  methods: {
    valueChange(val) {
      this.seqNo = val
      console.log(val)
    },
    async resetForm(formName) {
      await this.$refs['form'].$refs[formName].resetFields()
    },
    async searchHandleForm(formName) {
      // console.log("searchHandle");
      await this.$refs['form'].$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
