<template>
  <div class="add-form">
    <!-- :title="titleInfo.text+titleInfo.pageTitle"  -->
    <el-dialog :visible="visible" @close="onClose" :title="title">
      <el-form
        ref="dataForm"
        label-position="left"
        label-width="150px"
        style="width: 80%; margin-left: 10px"
      >
        <!-- 表单区域 -->
        <el-form-item label="文章标题：">
          <el-input v-model="formBase.title"></el-input>
        </el-form-item>
        <el-form-item label="文章内容：">
          <!-- 富文本编辑器 -->


        </el-form-item>
        <el-form-item label="视频地址：">
          <el-input v-model="formBase.title"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onClose">{{ $t("table.cancel") }}</el-button>
        <el-button type="primary">{{ $t("table.confirm") }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "addArticles",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      formBase: {
        title: "",
      },
    };
  },
  created() {},
  computed: {
    title() {
      return this.formData.id ? "修改文章" : "新增文章";
    },
  },
  methods: {
    onClose() {
      this.$emit("update:visible", false);
    },
    onEditor() {
      console.log("富文本内容=",this.$refs.text.value);
    },

  },
  // 挂载结束

  mounted: function () {},
  // 创建完毕状态
  created() {},
  // 组件更新
  updated: function () {},
};
</script>
<style>
.el-form--label-left .el-form-item__label {
  text-align: right;
}
.el-form-item--medium {
  margin-bottom: 22px;
}
.el-dialog__footer {
  text-align: center;
}
</style>
