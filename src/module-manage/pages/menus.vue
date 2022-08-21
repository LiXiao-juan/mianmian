<template>
  <div style="padding: 20px">
    <el-card class="box-card">
      <el-button
        size="small"
        type="success"
        icon="el-icon-edit"
        class="fr"
        @click="addMenus"
        style="margin-bottom: 20px"
        >添加菜单</el-button
      >
      <el-table
        :data="menusData"
        row-key="id"
        default-expand-all
        highlight-current-row
        :tree-props="{ children: 'childs' }"
        style="width: 100%"
        ref="table"
      >
        <el-table-column label="标题" width="200">
          <template slot-scope="{ row }">
            <i
              v-if="row.childs && row.childs.some((item) => !item.is_point)"
              class="el-icon-folder-opened menus-icon"
              @click="expend(row)"
            ></i>
            <i
              v-if="
                !row.is_point &&
                (row.childs?.every((item) => item.is_point) || !row.childs)
              "
              class="el-icon-document-remove menus-icon"
              @click="expend(row)"
            ></i>
            <i v-if="row.is_point" class="el-icon-view menus-icon" ></i>
            {{ row.title }}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="权限点代码" width="937">
        </el-table-column>

        <el-table-column label="操作" width="120">
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="editMenus(row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="removeMenus(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <menuAddDialog
      :text="text"
      :pageTitle="pageTitle"
      :PermissionGroupsList="menusData"
      :treeStructure.sync="isDisabled"
      @handleCloseModal="handleCloseModal"
      ref="menusAdd"
    />
  </div>
</template>

<script>
import { list, remove, detail } from "@/api/base/menus";
import menuAddDialog from "../components/menu-add.vue";
export default {
  data() {
    return {
      menusData: [],
      text: "创建",
      pageTitle: "菜单",
      removeId: {},
      detailId: {},
      isDisabled: false,
    };
  },

  created() {
    this.getMenusData();
  },
  components: {
    menuAddDialog,
  },

  methods: {
    // 获取数据
    async getMenusData() {
      const { data } = await list();
      this.menusData = JSON.parse(
        JSON.stringify(data).replace(/points/g, "childs")
      );
      // console.log(this.menusData);
    },
    // 修改
    async editMenus(val) {
      this.text = "编辑";
      this.isDisabled = true;
      this.$refs.menusAdd.handleResetForm();
      this.$refs.menusAdd.dialogFormVisible = true;
      this.detailId.id = val.id;
      const { data } = await detail(this.detailId);
      console.log(data);
      if (data.is_point) {
        this.$refs.menusAdd.type = "points";
        this.$refs.menusAdd.formPoints = data;
        this.$refs.menusAdd.changeToPoints();
      } else {
        this.$refs.menusAdd.type = "menu";
        this.$refs.menusAdd.formMenu = data;
        this.$refs.menusAdd.changeToMenu();
      }
    },
    // 删除
    async removeMenus(val) {
      console.log(val);
      try {
        await this.$confirm("此操作将永久删除该学科, 是否继续?", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        });
        this.removeId.id = val.id;
        await remove(this.removeId);
        this.$message.success("删除成功");
        this.getMenusData();
      } catch (error) {
        this.$message.error("删除失败");
      }
    },
    // 添加菜单
    addMenus() {
      this.text = "创建";
      this.$refs.menusAdd.handleResetForm();
      this.$refs.menusAdd.dialogFormVisible = true;
    },
    // 数据更新
    handleCloseModal() {
      this.isDisabled = false;
      this.getMenusData();
      this.$refs.menusAdd.OnClose();
    },
    // 点击图标展开
    expend(row){
      row.isExpend = !row.isExpend
      this.$refs.table.toggleRowExpansion(row, row.isExpend)
    }
  },
};
</script>

<style scoped lang="less">
::v-deep .el-table th {
  background-color: #fafafa;
}

::v-deep .el-table [class*=el-table__row--level] .el-table__expand-icon{
  display: none;
}
</style>
