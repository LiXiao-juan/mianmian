<template>
  <div class="app-container">
    <el-card shadow="always">
      <!-- 头部搜索框跟警告 -->
      <Permissions @searchSuccess="Search" @clear="getPermissions">
        <template #right>
          <el-button
            type="success"
            icon="el-icon-edit"
            size="small"
            @click="dialogFormVisible = true"
            >新增权限组</el-button
          >
        </template>
        <template #left-tag>
          <span>共{{ total }}条记录</span>
        </template>
      </Permissions>
      <!-- 表格主体 -->
      <el-table
        ref="multipleTable"
        :data="PermissionsData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="200px"> </el-table-column>
        <el-table-column prop="title" label="用户名" width="400px">
        </el-table-column>
        <el-table-column
          prop="create_date"
          label="日期"
          width="600px"
          sortable
          :formatter="taskTime"
        >
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="updatePermission(row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="deletePermissions(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <PageTool
        :total="total"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
      ></PageTool>

      <!-- 新增编辑弹框 -->
      <PermissionsAdd
        :text="text"
        :pageTitle="pageTitle"
        :ruleInline="ruleInline"
        :formBaseDate="formBase"
        :dialogFormVisible="dialogFormVisible"
        @handleCloseModal="handleCloseModal"
        @newDataes="getPermissions"
      ></PermissionsAdd>
    </el-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { list, remove, detail } from "@/api/base/permissions.js";
import PageTool from "@/module-manage/components/page-tool.vue";
import Permissions from "@/module-manage/components/permissions-header";
import PermissionsAdd from "@/module-manage/components/permissions-add.vue";
export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      text: "创建",
      pageTitle: "权限组",
      PermissionsData: [],
      ruleInline: {},
      params: {
        page: 1,
        pagesize: 10,
      },
      formBase: {
        id: 0,
        create_date: "",
        title: "",
        permissions: [],
      },
      total: 0,
    };
  },
  components: {
    PageTool,
    Permissions,
    PermissionsAdd,
  },

  created() {
    this.getPermissions();
    this.$notify.success("author is 耿瑞杰");
  },

  methods: {
    // 获取权限列表
    async getPermissions() {
      const res = await list(this.params);
      console.log(res);
      this.PermissionsData = res.data.list;
      this.total = res.data.counts;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 格式化时间
    taskTime(row, column, index) {
      return dayjs(index).format("YYYY-MM-DD HH:mm:ss");
    },
    //搜索
    Search(val) {
      this.PermissionsData = val;
    },
    // 删除
    async deletePermissions(row) {
      this.$confirm("此操作将永久删除该用户 , 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        // 请求
        await remove(row);
        // 重新获取列表
        this.getPermissions();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    // 点击分页
    pageChange(pageNum) {
      this.params.page = pageNum;
      this.getPermissions(this.params);
    },
    // 切换分页数量
    pageSizeChange(pageSize) {
      this.params.pagesize = pageSize;
      this.getPermissions(this.params);
    },
    // 修改
    async updatePermission(row) {
      this.text = "编辑";
      const { data } = await detail(row);
      this.formBase = data;
      this.dialogFormVisible = true;
    },
    // 关闭弹层
    handleCloseModal() {
      this.dialogFormVisible = false;
      this.formBase = {
        id: 0,
        create_date: "",
        title: "",
        permissions: [],
      };
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
