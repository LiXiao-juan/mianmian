<template>
  <div class="add-form">
    <!-- :title="titleInfo.text+titleInfo.pageTitle"  -->
    <el-dialog :visible="visible" @close="onClose" :title="title">
      <el-form
        :rules="ruleInline"
        ref="dataForm"
        :model="formBase"
        label-position="left"
        label-width="150px"
        style="width: 80%; margin-left: 10px"
      >
        <el-form-item label="企业名称" prop="shortName">
          <el-input v-model="formBase.shortName"></el-input>
          <el-checkbox v-model="formBase.isFamous">是否为名企</el-checkbox>
        </el-form-item>
        <el-form-item label="所属公司" prop="company">
          <el-input v-model="formBase.company"></el-input>
          <p>https://www.tianyancha.com （在此可查询所属公司全称及简称）</p>
        </el-form-item>
        <el-form-item label="城市" prop="province">
          <el-select
            class="filter-item"
            style="width: 130px; margin-right: 10px"
            v-model="formBase.province"
            @keyup.enter="handleFilter"
            @change="handleProvince"
            filterable
          >
            <el-option
              v-for="item in citySelect.province"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-select
            class="filter-item"
            style="width: 130px"
            v-model="formBase.city"
            @keyup.enter="handleFilter"
            filterable
          >
            <el-option
              v-for="item in citySelect.cityDate"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方向（企业标签）" prop="tags">
          <el-input v-model="formBase.tags"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入"
            v-model="formBase.remarks"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onClose">{{ $t("table.cancel") }}</el-button>
        <el-button type="primary" @click="createData">{{
          $t("table.confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { update, add } from "@/api/hmmm/companys";
import { provinces, citys } from "@/api/hmmm/citys.js";
export default {
  name: "CompanysAdd",
  props: {
    // titleInfo: {
    //   type: Object,
    //   // required: true
    // },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      citySelect: {
        province: [],
        cityDate: [],
      },
      // 表单对象
      formBase: {
        isFamous: false,
        shortName: "",
        company: "",
        province: "",
        city: "",
        tags: "",
        remarks: "",
      },
      // 表单验证
      ruleInline: {
        shortName: [
          { required: true, message: "企业简称不能为空", trigger: "blur" },
        ],
        province: [
          { required: true, message: "请选择省份", trigger: "change" },
        ],
        tags: [{ required: true, message: "请请输标签", trigger: "blur" }],
      },
    };
  },
  created() {},
  computed: {
    title() {
      return this.formBase.id ? "编辑用户" : "新增用户";
    },
  },
  methods: {
    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true;
    },
    // 弹层隐藏
    onClose() {
      this.$emit("update:visible", false);
      this.formBase.city = ''
      this.$refs.dataForm.resetFields();
      this.formBase.isFamous = false;
    },
    // 获取省
    getCityData: function () {
      this.citySelect.province = provinces();
    },
    // 选省获取到市
    handleProvince: function (e) {
      this.citySelect.cityDate = citys(e);
      this.formBase.city = this.citySelect.cityDate[0];
    },
    // 表单提交
    async createData() {
      await this.$refs.dataForm.validate();
      // 判断是新增还是编辑--若有id 则是编辑
      if (this.formBase.id) {
        // 若没有则是新增数据
       await update(this.formBase)
       this.$emit("update:visible", false);
          // 调用获取列表的方法，更新视图
          this.$emit("upData");
       this.$message.success('修改成功')
      } else {
        try {
          // 发起新增的请求
          await add(this.formBase);
          this.$message.success("添加成功");
          // 关闭弹框
          this.$emit("update:visible", false);
          // 调用获取列表的方法，更新视图
          this.$emit("upData");
        } catch (error) {}
      }
      // this.$refs.dataForm.validate(async (valid) => {
      //   if (valid) {
      //     this.onClose();
      //     const data = {
      //       ...this.formBase,
      //     };
      //     if (this.formBase.id) {
      //       await update(data).then(() => {
      //         this.$emit("newDataes", this.formBase);
      //       });
      //     } else {
      //       await add(this.formBase).then(() => {
      //         this.$emit("newDataes", this.formBase);
      //       });
      //     }
      //   } else {
      //     this.$message.error("*号为必填项!");
      //   }
      // });
    },
    // 修改调用更新表单对象重现数据
    editUpdate(rowInfo){
      console.log(rowInfo);
      this.formBase = rowInfo
    }
  },
  // 挂载结束

  mounted: function () {},
  // 创建完毕状态
  created() {
    this.getCityData();
  },
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
