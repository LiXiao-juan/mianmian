<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="400px"
    @close="onClose"
    :close-on-click-modal="false"
  >
    <el-form :model="form" :rules="formRules" ref="form">
      <el-form-item
        label="所属学科"
        size="small"
        label-width="80px"
        prop="subjectID"
      >
        <el-select
          v-model="form.subjectID"
          placeholder="请选择"
          style="width: 280px"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item in simpleSubjects"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="目录名称"
        size="small"
        label-width="80px"
        prop="tagName"
      >
        <el-input
          v-model="form.tagName"
          autocomplete="off"
          placeholder="请输入目录名称"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="changeTags">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "新增目录",
    },
    simpleSubjects: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        subjectID: "",
        tagName: "",
      },
      formRules: {
        subjectID: [
          {
            required: true,
            message: "请选择所属学科",
            trigger: "change",
          },
        ],
        tagName: [
          {
            required: true,
            message: "请输入标签名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onClose() {
      this.$refs.form.resetFields();
      this.dialogFormVisible = false;
    },
    async changeTags() {
      try {
        await this.$refs.form.validate();
        if (this.title === "新增标签") {
          this.$emit("addTags");
        } else {
          this.$emit("updateTags");
        }
      } catch (error) {}
    },
  },
};
</script>

<style scoped lang="less">
.dialog-footer {
  text-align: right;
}
</style>