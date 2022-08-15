<template>
  <div class="question-container">
    <el-card class="box-card">
      <!-- 头部搜索区 -->
      <el-row>
        <el-col :span="18">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="学科名称">
              <el-input
                v-model="formInline.subjectName"
                placeholder=""
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" @click="formInline.subjectName = ''"
                >清除</el-button
              >
              <el-button size="small" type="primary" @click="subjectSearch"
                >搜索</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align: right">
          <el-button
            size="small"
            type="success"
            icon="el-icon-edit"
            @click="addDialog = true"
            >新增学科</el-button
          >
        </el-col>
      </el-row>
      <!-- 头部搜索区 -->
      <!-- 头部提示区 -->
      <Lalert style="margin-bottom: 15px"
        >数据一共{{ subjectData.counts }}条</Lalert
      >
      <!-- 头部提示区 -->
      <!-- 主体内容 -->
      <el-table :data="subjectData.items" style="width: 100%">
        <el-table-column type="index" label="序号" width="48">
        </el-table-column>
        <el-table-column prop="subjectName" label="学科名称" width="144">
        </el-table-column>
        <el-table-column prop="username" label="创建者" width="141">
        </el-table-column>
        <el-table-column
          prop="addDate"
          label="创建日期"
          :formatter="parseTime"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="isFrontDisplay"
          label="前台是否显示"
          :formatter="parseDisplay"
          width="141"
        >
        </el-table-column>
        <el-table-column prop="twoLevelDirectory" label="二级目录" width="141">
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="141">
        </el-table-column>
        <el-table-column prop="totals" label="题目数量" width="141">
        </el-table-column>
        <el-table-column prop="address" label="操作" width="240">
          <template slot-scope="{ row }">
            <el-button
              class="btnStyle"
              @click="
                $router.push({
                  path: '/subjects/directorys',
                  query: { id: row.id, name: row.subjectName },
                })
              "
              >学科分类</el-button
            >
            <el-button
              class="btnStyle"
              @click="
                $router.push({
                  path: '/subjects/tags',
                  query: { id: row.id, name: row.subjectName },
                })
              "
              >学科标签</el-button
            >
            <el-button class="btnStyle" @click="editSubject(row)"
              >修改</el-button
            >
            <el-button class="btnStyle" @click="removeSubject(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 主体内容 -->
      <!-- 底部翻页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :hide-on-single-page="pageCount"
        background
        :page-sizes="[5, 10, 20, 50]"
        layout=" prev, pager, next, sizes,jumper"
        :total="subjectData.counts"
        style="margin-top: 20px; text-align: right"
      >
      </el-pagination>
      <!-- 底部翻页 -->
    </el-card>
    <!-- 新增学科对话框 -->
    <subjectsAddDialog
      :addDialog.sync="addDialog"
      @addSuccess="getSubjectList"
      ref="subjectsAddDialog"
    />
    <!-- 新增学科对话框 -->
  </div>
</template>

<script>
import { list, remove } from "@/api/hmmm/subjects";
import dayjs from "dayjs";
import subjectsAddDialog from "../components/subjects-add.vue";
export default {
  data() {
    return {
      // 搜索框数据
      formInline: {
        subjectName: "",
      },
      subjectData: {}, //学科列表整个数据，包括数量，页码等

      params: {
        page: 1,
        pagesize: 10,
      },
      currentPage: 1, //跳动的页码显示
      addDialog: false,
    };
  },
  components: {
    subjectsAddDialog,
  },
  created() {
    this.getSubjectList();
  },
  computed: {
    // 当只有一页是隐藏分页
    pageCount() {
      return this.subjectData.pages === 1 ? true : false;
    },
  },

  methods: {
    // 获取学科列表
    async getSubjectList() {
      const data = await list(this.params);
      // console.log(data.data);
      this.subjectData = data.data;
    },
    // 日期字符串转换
    parseTime(row, col, cellValue) {
      return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    // 前台是否显示转换格式
    parseDisplay(row, col, cellValue) {
      return ["否", "是"][cellValue];
    },
    // 每页多少条
    handleSizeChange(val) {
      this.params.pagesize = val;
      this.getSubjectList();
    },
    // 跳到当前页
    handleCurrentChange(val) {
      this.params.page = val;
      this.getSubjectList();
    },
    // 学科搜索
    subjectSearch() {
      this.params.subjectName = this.formInline.subjectName;
      this.getSubjectList();
    },
    // 删除学科
    async removeSubject(val) {
      try {
        await this.$confirm("此操作将永久删除该学科, 是否继续?", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        });
        this.params.id = val.id
        await remove(this.params);
        this.$message.success("删除成功");
        this.getSubjectList();
      } catch (error) {
        this.$message.error(error);
      }
    },
    // 传递修改学科数据
    editSubject(val) {
      this.addDialog = true;
      this.$refs.subjectsAddDialog.editSubject(val);
    },
  },
};
</script>

<style scoped lang="less">
.btnStyle {
  color: #409eff;
  background: 0 0;
  padding-left: 0;
  padding-right: 0;
  border-color: transparent;
}

::v-deep .el-table th {
  background-color: #fafafa;
}
</style>
