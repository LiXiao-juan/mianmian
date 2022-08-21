<template>
  <div class="qustions-check">
    <el-dialog
      :title="dialogTitle"
      :visible="addDialog"
      width="400px"
      @close="onClose"
    >
      <el-form :model="formData" :rules="rules" ref="form">
        <el-form-item label="学科名称" label-width="80px" prop="subjectName">
          <el-input
            v-model="formData.subjectName"
            placeholder="请输入学科名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否显示" label-width="80px" prop="isFrontDisplay">
          <el-switch
            v-model="formData.isFrontDisplay"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { add, update } from "@/api/hmmm/subjects";
export default {
  data() {
    return {
      dialogTitle: "新增学科",
      formData: {
        subjectName: "",
        isFrontDisplay: 1,
      },
      rules: {
        subjectName: [
          { required: true, message: "请输入学科名称", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    addDialog: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    // 关闭弹窗
    onClose() {
      this.$emit("update:addDialog", false);
      this.$refs.form.resetFields();
      this.formData = {
        subjectName: "",
        isFrontDisplay: 1,
      };
      this.dialogTitle = "新增学科";
    },
    // 保存
    async onSave() {
      await this.$refs.form.validate()
      if (this.formData.id) {
        try {
          await update(this.formData);
          this.$message.success("修改成功");
          this.onClose();
          this.$emit("addSuccess");
        } catch (error) {
          this.$message.error(error);
        }
      } else {
        try {
          await add(this.formData);
          this.$message.success("添加成功");
          this.onClose();
          this.$emit("addSuccess");
        } catch (error) {
          this.$message.error(error);
        }
      }
    },
    // 修改学科数据回显
    editSubject(val) {
      this.dialogTitle = "修改学科";
      this.formData.id = val.id;
      // console.log(val);
      this.formData.subjectName = val.subjectName;
      this.formData.isFrontDisplay = val.isFrontDisplay;
    },
  },
};
</script>

<style scoped lang="less"></style>
