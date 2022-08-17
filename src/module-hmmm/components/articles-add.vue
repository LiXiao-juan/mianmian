<template>
  <div class="add-form">
    <!-- :title="titleInfo.text+titleInfo.pageTitle"  -->
    <el-dialog :visible="visible" @close="onClose" :title="title">
      <el-form
        :model="formBase"
        :rules="formBaseRules"
        ref="dataForm"
        label-position="left"
        label-width="150px"
        style="width: 80%; margin-left: 10px"
      >
        <!-- 表单区域 -->
        <el-form-item label="文章标题：" prop="title" class="form-error">
          <el-input v-model="formBase.title"></el-input>
        </el-form-item>
        <el-form-item label="文章内容：" prop="articleBody">
          <!-- 富文本编辑器 -->
          <quill-editor
            style="height: 200px"
            v-model="formBase.articleBody"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
          >
          </quill-editor>
        </el-form-item>
        <br /><br />
        <el-form-item label="视频地址：" style="margin-top: 20px">
          <el-input v-model="formBase.videoURL"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onClose">{{ $t("table.cancel") }}</el-button>
        <el-button type="primary" @click="onSave">{{
          $t("table.confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { add } from "@/api/hmmm/articles";
export default {
  name: "addArticles",
  components: {
    quillEditor,
  },
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
      // 表单对象
      formBase: {
        title: "",
        articleBody: "",
        videoURL: null,
      },
      // 表单校验规则
      formBaseRules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        articleBody: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
      },
      // 富文本编辑器配置
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            [{ list: "ordered" }, { list: "bullet" }], // 有序
            ["blockquote"], // 引用
            ["code-block", "image", "link"], // 链接、图片、视频 代码块
          ],
        },
        placeholder: "",
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
      this.$refs.dataForm.resetFields();
      this.formBase.videoURL = "";
    },
    //确认新增
    async onSave() {
      await this.$refs.dataForm.validate();
      try {
        await add(this.formBase);
        this.$message.success("添加成功");
        this.$emit("update:visible", false);
        this.$parent.getSkillList();
      } catch (error) {}
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
.el-form-item__content {
  height: 100%;
}
</style>
