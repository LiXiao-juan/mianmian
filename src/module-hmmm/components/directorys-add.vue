<template>
  <div class="container">
    <el-dialog
      :title="dialogTitle"
      :visible="addDialog"
      width="400px"
      :before-close="onClose"
    >
      <el-form :model="formData" :rules="rules" ref="form">
        <el-form-item label="所属学科" label-width="80px" prop="isFrontDisplay">
          <el-select
            v-model="formData.subjectID"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in subjectNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录名称" label-width="80px" prop="directoryName">
          <el-input
            v-model="formData.directoryName"
            placeholder="请输入目录名称"
          ></el-input>
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
import { add, update } from "@/api/hmmm/directorys";
export default {
  data() {
    return {
      dialogTitle: "新增目录",
      formData: {
        directoryName: "",
        subjectID: "",        
      },
      rules: {
        directoryName: [
          { required: true, message: "请输入目录名称", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    addDialog: {
      type: Boolean,
      required: true,
    },
    subjectNameList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    // 关闭弹窗
    onClose() {
      this.$emit("update:addDialog", false);
      this.$refs.form.resetFields();
      this.formData = {
        subjectID: "",
        directoryName: "",
      };
      this.dialogTitle = "新增目录";
    },
    // 保存
    async onSave() {
      await this.$refs.form.validate();
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
    // 修改目录数据回显
    editDirectory(val) {
      this.dialogTitle = "修改目录";      
      // console.log(val);
      this.formData.id = val.id
      this.formData.subjectID = val.subjectID      
      this.formData.directoryName = val.directoryName;
    },
  },
};
</script>

<style scoped lang="less"></style>
