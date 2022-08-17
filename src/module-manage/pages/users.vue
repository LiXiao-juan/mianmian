<template>
  <div class="app-container">
    <el-card shadow="always">
      <!-- 头部搜索框跟警告 -->
      <UserHeader @searchSuccess="Search" @clear="getUserList">
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
              v-if="!(row.id === 2)"
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
import { list, remove } from "@/api/base/users.js";
import { simple } from "@/api/base/permissions.js";
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
    this.$notify.success("author is 耿瑞杰");
  },

  methods: {
    // 获取用户列表数据
    async getUserList() {
      // 加载
      this.loading = true;
      const res = await list(this.params);
      console.log(res);
      this.tableData = res.data.list;
      this.counts = res.data.counts;
      this.loading = false;
    },
    // 点击分页
    pageChange(pageNum) {
      this.params.page = pageNum;
      this.getUserList(this.params);
    },
    // 切换分页数量
    pageSizeChange(pageSize) {
      this.params.pagesize = pageSize;
      this.getUserList(this.params);
    },
    // 删除用户
    deleteUser(row) {
      this.$confirm("此操作将永久删除该用户 , 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        // 请求
        await remove(row);
        // 重新获取列表
        this.getUserList();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    // 编辑用户
    async EditUser(row) {
      this.logVisible = true;
      this.dialogFormVisible = true;
      const res = await simple();
      // console.log(res);
      this.PermissionGroupsList = res.data;
      // console.log(res.data);
      this.$refs.useradd.getUpdat(row, this.PermissionGroupsList);
    },
    //创建用户
    async AddUser() {
      this.dialogFormVisible = true;
      this.logVisible = false;
      const res = await simple();
      this.PermissionGroupsList = res.data;
      this.$refs.useradd.getAdd(this.PermissionGroupsList);
    },
    //搜索
    Search(val) {
      this.tableData = val;
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
