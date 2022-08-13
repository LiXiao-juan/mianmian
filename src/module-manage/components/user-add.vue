<template>
  <div class="add-form">
    <el-dialog :title="dialogTitle" :visible="visible" @close="onClose">
      <el-form
        :rules="ruleInline"
        ref="dataForm"
        :model="formBase"
        label-position="left"
        label-width="120px"
        style="width: 400px; margin-left: 120px"
      >
        <el-form-item :label="$t('table.username')" prop="username">
          <el-input v-model="formBase.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.email')" prop="email">
          <el-input v-model="formBase.email"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('table.paddword')"
          prop="password"
          v-if="formBase.password != undefined"
        >
          <el-input v-model="formBase.password"></el-input>
        </el-form-item>

        <!-- 角色 -->
        <el-form-item :label="$t('table.role')" prop="role">
          <el-input v-model="formBase.role"></el-input>
        </el-form-item>
        <!-- 权限组 -->
        <el-form-item
          :label="$t('table.permissionUser')"
          prop="permission_group_id"
        >
          <el-select class="filter-item" v-model="formBase.permission_group_id">
            <!-- <el-option
              v-for="item in PermissionGroupsList"
              :value="item.id"
              :key="item.key"
              :label="item.title"
            ></el-option> -->
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('table.phone')" prop="phone">
          <el-input v-model="formBase.phone"></el-input>
        </el-form-item>

        <el-form-item :label="$t('table.introduction')">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="Please input"
            v-model="formBase.introduction"
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
import { detail, update, add } from "@/api/base/users";
export default {
  name: "usersAdd",
  props: {
    // 控制新增的弹窗显示隐藏
    visible: {
      type: Boolean,
      default: false,
    },
    // 控制修改的弹窗显示隐藏
    visiabledia: {
      type: Boolean,
    },
  },
  data() {
    return {
      formBase: {
        id: "",
        username: "",
        email: "",
        password: "",
        role: "",
        permission_group_id: "",
        phone: "",
        introduction: "",
      },
      ruleInline: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        role: [{ required: true, message: "角色不能为空", trigger: "blur" }],
        phone: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
        ],
        introduction: [
          { required: true, message: "介绍不能为空", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    dialogTitle() {
      return this.visiabledia ? "编辑用户" : "创建用户";
    },
  },
  methods: {
    // 表单提交
    createData() {
      this.$refs.dataForm.validate();
      if (this.visiabledia) {
        if (this.formBase.id) {
          update(this.formBase).then(() => {
            this.$emit("newDataes", this.formBase);
          });
        } else {
          add(this.formBase).then(() => {
            this.$emit("newDataes", this.formBase);
          });
        }
      } else {
        this.$Message.error("*号为必填项!");
      }
    },
    // 关闭弹层
    onClose() {
      this.$emit("update:visible", false);
      this.formBase = "";
    },
    //编辑数据回显
    async getUpdat(val) {
      console.log(val);
      this.formBase = val;
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
