<!--
* @Author: liguanghui
* @Email:  liguanghui@csftgroup.com
-->
<template>
  <el-upload
    ref="upload"
    list-type="picture-card"
    :action="http"
    :show-file-list="false"
    :auto-upload="autoUpload"
    :multiple="multiple"
    :accept="accept"
    :headers="headers"
    :disabled="readonly || uploading"
    :fileKey="'file'"
    :http-request="uploadFile"
    :before-upload="beforeUploadComputed"
    :style="style"
    class="image-upload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="image-upload-avatar-img" />
    <i v-else class="el-icon-plus image-upload-avatar-icon"></i>
  </el-upload>
</template>

<script>
import axios from "axios";
import { minioDownload } from "@/api/login/user";
import { isType } from "@/utils";

function isBase64(src) {
  if (typeof src === "string") {
    return src.startsWith("data:image");
  }
  return false;
}
export default {
  name: "ImageUpload",
  components: {},
  mixins: [],
  props: {
    fileId: {
      type: String,
      default: undefined,
    },
    widthHeight: {
      type: Number,
      default: 62,
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    // 仅仅用于显示
    readonly: {
      type: Boolean,
      default: false,
    },
    http: {
      type: String,
      default: "/upLoadFileService",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    //上传协议
    method: {
      type: String,
      default: () => "post",
    },
    //是否需要规定上传类型，默认图片类型
    accept: {
      type: String,
      default: () => "image/png,image/jpeg,image/jpg",
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
    // 限制图片上传的大小,传入kb,暂时默认100M的大小,超过则不允许上传;
    limitSize: {
      type: Number,
      default: 100 * 1024,
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
  data() {
    return {
      fileData: new FormData(),
      uploading: false,
      imageUrl: "",
    };
  },
  computed: {
    style() {
      return {
        width: `${this.widthHeight}px`,
        height: `${this.widthHeight}px`,
      };
    },
  },
  watch: {
    fileId: {
      handler(val) {
        this.downLoadImage();
      },
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    downLoadImage() {
      // 兼容显示原来是Base64形式的图片
      console.log("this.fileId", this.fileId);
      if (!this.fileId) return;
      if (isBase64(this.fileId)) {
        this.imageUrl = this.fileId;
        return;
      }
      minioDownload({
        fileId: this.fileId,
      }).then((res) => {
        if (res) {
          this.imageUrl = res;
          console.log(res);
        }
      });
    },
    beforeUploadComputed(file) {
      if (isType.isFunction(this.beforeUpload)) {
        return this.beforeUpload(file);
      }
      return this.beforeUploadDefault(file);
    },
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
    },
    // 上传文件
    uploadFile(file) {
      this.fileData = new FormData();
      this.fileData.append(this.fileKey, file.file); // append增加数据
      this.imageUrl = "";
      console.log(file);
      if (this.autoUpload) {
        if (this.beforeUploadComputed(file.file)) {
          this.submitUpload();
        }
      }
    },
    // 上传到服务器
    submitUpload(file) {
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
              const { uploadFiles } = this.$refs["upload"];
              if (uploadFiles.length > 0) {
                this.imageUrl = uploadFiles[uploadFiles.length - 1].url;
              }
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
  },
};
</script>
<style lang="scss" scoped>
.image-upload-avatar {
  &-icon {
    width: 100%;
    height: 100%;
    font-size: 16px;
    color: #8c939d;
    line-height: 100%;
    overflow: hidden;
    text-align: center;
  }
  &-img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.image-upload {
  ::v-deep .el-upload--picture-card {
    border: none;
    width: 100%;
    height: 100%;
  }
}
</style>
