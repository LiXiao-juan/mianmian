<template>
  <div class="app-container">
    <el-card shadow="always">
      <!-- 头部搜索框跟警告 -->
      <UserHeader>
        <template #right>
          <el-button
            type="success"
            icon="el-icon-edit"
            size="small"
            @click="AddUser"
            >新增用户</el-button
          >
        </template>
        <template #left-tag>
          <span>共{{ counts }}条记录</span>
        </template>
      </UserHeader>
      <!-- 表格主体 -->
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="序号" width="100px">
        </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="phone" label="联系电话"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="permission_group_title" label="权限组名称">
        </el-table-column>
        <el-table-column prop="role" label="角色"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="EditUser(row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="deleteUser(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <PageTool
        :total="counts"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
      ></PageTool>

      <!-- 新增编辑弹框 -->
      <UserAdd
        ref="useradd"
        :visible.sync="dialogFormVisible"
        :visiabledia.sync="logVisible"
        @newDataes="getUserList"
      ></UserAdd>
    </el-card>
  </div>
</template>

<script>
import UserAdd from "@/module-manage/components/user-add.vue";
import UserHeader from "@/module-manage/components/user-header.vue";
import PageTool from "@/module-manage/components/page-tool.vue";
import { list, remove, simple } from "@/api/base/users.js";
export default {
  data() {
    return {
      tableData: [], //用户列表数据
      counts: 0, //记录条数
      params: {
        page: 1,
        pagesize: 10,
      },
      loading: false,
      dialogFormVisible: false,
      logVisible: false,
      PermissionGroupsList: [],
    };
  },
  components: {
    UserHeader,
    PageTool,
    UserAdd,
  },

  created() {
    this.getUserList();
  },

  methods: {
    // 获取用户列表数据
    async getUserList() {
      // 加载
      this.loading = true;
      const res = await list(this.params);
      // console.log(res);
      this.tableData = res.data.list;
      this.counts = res.data.counts;
      this.loading = false;
    },
    pageChange() {},
    pageSizeChange() {},
    // 删除用户
    async deleteUser(row) {
      try {
        await this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        console.log(row);
        await remove(row.id);
        this.$message({
          message: "恭喜你，删除成功",
          type: "success",
        });
        this.getUserList();
      } catch (error) {}
    },
    // 编辑用户
    EditUser(row) {
      this.logVisible = true;
      this.dialogFormVisible = true;
      this.$refs.useradd.getUpdat(row);
    },
    //创建用户
    AddUser() {
      this.dialogFormVisible = true;
      this.logVisible = false;
    },
  },
};
</script>

<style scoped>
.app-container {
  padding: 20px;
}
.el-table th {
  background-color: #fafafa;
}
</style>
