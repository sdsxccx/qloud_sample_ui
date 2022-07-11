<template>
  <div>
    <el-upload
      class="upload-model"
      ref="upload"
      :action="http"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :file-list="fileList"
      :http-request="uploadFile"
      :list-type="listType"
      :aupload="autoUpload"
      :show-file-list="showFileList"
      :limit="limit"
      :multiple="multiple"
      :accept="accept"
      :before-upload="beforeUploadComputed"
      :headers="headers"
      :disabled="uploading"
    >
      <el-button
        slot="trigger"
        :size="size"
        type="primary"
        :loading="uploading"
        :icon="uploadIcon"
        >{{ uploadTitle }}</el-button
      >
      <el-button
        v-if="!autoUpload"
        style="margin-left: 10px"
        :size="size"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">{{ describe }}</div>
    </el-upload>
  </div>
</template>

<script>
import axios from "axios";
import { isType } from "@/utils";
export default {
  name: "upload-model",
  data() {
    return {
      fileData: new FormData(), // 文件上传数据（多文件合一）
      uploading: false,
    };
  },
  props: {
    //是否需要规定上传类型，默认图片类型
    accept: {
      type: String,
      default: () => "*",
    },
    //下载按钮是否显示隐藏
    downloadIsShow: {
      type: Boolean,
      default: () => false,
    },
    //是否自动上传
    autoUpload: {
      type: Boolean,
      default: () => false,
    },
    //上传文件类型
    listType: {
      type: String,
      default: () => " ",
    },
    //是否显示已上传文件列表
    showFileList: {
      type: Boolean,
      default: () => true,
    },
    //上传图片的个数，必传
    limit: {
      type: Number,
      default: () => 1000,
    },
    //是否需要多选
    multiple: {
      type: Boolean,
      default: () => true,
    },
    //上传文件的一个数组，必传
    fileList: {
      type: Array,
      default: () => [],
    },
    //请求头默认设置
    headers: {
      type: Object,
      default: () => {
        return {
          "Content-Type": "application/x-www-form-urlencoded",
        };
      },
    },
    //必选参数，上传的地址
    http: {
      type: String,
      default: () => " ",
    },
    //上传规则描述
    describe: {
      type: String,
      default: () => "",
    },
    //上传协议
    method: {
      type: String,
      default: () => "post",
    },
    // 上传文件按钮icon
    uploadIcon: {
      type: String,
      default: "",
    },
    // 上传按钮title
    uploadTitle: {
      type: String,
      default: "选取文件",
    },
    // 接口接收的key
    fileKey: {
      type: String,
      default: "files",
    },
    // 限制文件上传的大小,传入kb;
    limitSize: {
      type: Number,
      default: null,
      required: false,
      validator(value) {
        return isType.isNumber(value);
      },
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。//By liuhan 2020-12-2
    beforeUpload: {
      type: Function,
      default: null,
      required: false,
      validator(value) {
        console.log(
          "validator isType.isFunction(value)",
          isType.isFunction(value)
        );
        return isType.isFunction(value);
      },
    },
  },
  computed: {
    size() {
      return this.$store.state.settings.size;
    },
  },
  methods: {
    beforeUploadComputed(file) {
      if (isType.isFunction(this.beforeUpload)) {
        return this.beforeUpload(file);
      }
      return this.beforeUploadDefault(file);
    },
    // 默认的上传文件之前的钩子,没有传入limitSize的话直接通过,limitSize必须是数字
    beforeUploadDefault(file) {
      console.log("beforeUpload default");
      if (this.limitSize && isType.isNumber(this.limitSize)) {
        if (this.limitSize >= file.size / 1024) {
          return true;
        } else {
          this.$message.error(
            `上传的文件大小不能超过${this.limitSize / 1024}MB!`
          );
          return false;
        }
      }
      return true;
    },
    // 上传文件
    uploadFile(file) {
      console.log("uploadFile", file);
      // TODO
      // if (this.multiple) {
      //   // 多选的时候直接添加
      //   this.fileData.append(this.fileKey, file.file); // append增加数据
      // } else {
      //   // 单选的时候清空this.fileData
      //   const fileData = new FormData();
      //   fileData.append(this.fileKey, file.file); // append增加数据
      //   // this.$refs.upload.uploadFiles = [];
      //   this.fileData = fileData;
      // }
      this.fileData.append(this.fileKey, file.file); // append增加数据

      if (this.autoUpload) {
        if (this.beforeUploadComputed(file.file)) {
          this.submitUpload();
        }
      }
    },
    // 上传到服务器
    submitUpload() {
      if (!this.autoUpload) {
        this.fileData = new FormData();
        this.$refs.upload.submit();
      }
      this.uploading = true;
      // 提交调用uploadFile函数
      axios({
        url: this.http,
        method: this.method,
        data: this.fileData,
        baseURL: process.env.VUE_APP_BASE_API,
        timeout: 50000,
        headers: this.headers,
      })
        .then((response) => {
          console.log("response", response.data.data.Header);
          if (response.data.statusCode === 200) {
            if (response.data.data.Header.RetCode === "000000") {
              this.$emit("uploadData", response.data.data);
              this.$message({
                message: "上传成功",
                type: "success",
              });
            } else {
              this.$errorPrompt(response.data.data.Header.RetMsg);
            }
          } else {
            this.$errorPrompt("文件上传失败");
          }
        })
        .finally(() => {
          this.uploading = false;
        });
    },
    handleRemove(file, fileList) {
      console.log("fileList", fileList);
      this.$emit("uploadData", fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {},
  },
};
</script>
