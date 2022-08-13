<template>
  <div class="app-container">
    <el-card shadow="always">
      <!-- 头部搜索框跟警告 -->
      <Permissions>
        <template #right>
          <el-button type="success" icon="el-icon-edit" size="small"
            >新增权限组</el-button
          >
        </template>
        <template #left-tag>
          <span>共条记录</span>
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
        <el-table-column prop="create_date" label="日期" width="600px">
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- <PageTool
        :total="counts"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
      ></PageTool> -->

      <!-- 新增编辑弹框 -->
    </el-card>
  </div>
</template>

<script>
import { list } from "@/api/base/permissions.js";
import PageTool from "@/module-manage/components/page-tool.vue";
import Permissions from "@/module-manage/components/permissions-header";
export default {
  data() {
    return {
      PermissionsData: [],
      params: {
        page: 1,
        pagesize: 10,
      },
    };
  },
  components: {
    PageTool,
    Permissions,
  },

  created() {
    this.getPermissions();
  },

  methods: {
    // 获取权限列表
    async getPermissions() {
      const res = await list(this.params);
      console.log(res);
      this.PermissionsData = res.data.list;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
