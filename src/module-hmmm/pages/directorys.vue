<template>
  <div class="container" style="padding: 10px">
    <el-card class="box-card">
      <!-- 带有标题的头部区域 -->
      <div slot="header" v-if="isShowheader">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>学科管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.query.name }}</el-breadcrumb-item>
          <el-breadcrumb-item>目录管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 带有标题的头部区域 -->
      <!-- 头部搜索区 -->
      <el-row>
        <el-col :span="18">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="目录名称">
              <el-input
                v-model="formInline.directoryName"
                placeholder=""
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="formInline.state" placeholder="请选择">
                <el-option
                  v-for="item in states"
                  :key="item.name"
                  :label="item.name"
                  :value="item.state"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button size="small" @click="clearForm">清除</el-button>
              <el-button size="small" type="primary" @click="directorySearch"
                >搜索</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align: right">
          <el-button
            type="primary"
            class="btnStyle"
            icon="el-icon-back"
            v-if="isShowheader"
            @click="$router.go(-1)"
            >返回学科</el-button
          >
          <el-button
            size="small"
            type="success"
            icon="el-icon-edit"
            @click="addDialog = true"
            >新增目录</el-button
          >
        </el-col>
      </el-row>
      <!-- 头部搜索区 -->
      <!-- 头部提示区 -->
      <Lalert style="margin-bottom: 15px"
        >数据一共{{ directoryData.counts }}条</Lalert
      >
      <!-- 头部提示区 -->
      <!-- 主体内容 -->
      <el-table :data="directoryData.items" style="width: 100%">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="subjectName" label="所属学科" width="177">
        </el-table-column>
        <el-table-column prop="directoryName" label="目录名称" width="174">
        </el-table-column>
        <el-table-column prop="username" label="创建者" width="174">
        </el-table-column>
        <el-table-column
          prop="addDate"
          label="创建日期"
          :formatter="parseTime"
          width="174"
        >
        </el-table-column>
        <el-table-column prop="totals" label="面试题数量" width="174">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          :formatter="parseState"
          width="174"
        >
        </el-table-column>
        <el-table-column prop="address" label="操作" width="150">
          <template slot-scope="{ row }">
            <el-button class="btnStyle" @click="changeState(row)">{{
              row.state === 1 ? "禁用" : "启用"
            }}</el-button>
            <el-button
              class="btnStyle"
              @click="editDirectory(row)"
              :disabled="!!row.state"
              >修改</el-button
            >
            <el-button
              class="btnStyle"
              @click="removeDirectory(row)"
              :disabled="!!row.state"
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
        :total="directoryData.counts"
        style="margin-top: 20px; text-align: right"
      >
      </el-pagination>
      <!-- 底部翻页 -->
    </el-card>
    <!-- 新增学科对话框 -->
    <directorysAddDialog
      :addDialog.sync="addDialog"
      @addSuccess="getDirectorysList"
      :subjectNameList="subjectNameList"
      ref="directorysAddDialog"
    />
    <!-- 新增学科对话框 -->
  </div>
</template>

<script>
import { list, remove, changeState } from "@/api/hmmm/directorys";
import { simple } from "@/api/hmmm/subjects";
import dayjs from "dayjs";
import directorysAddDialog from "../components/directorys-add.vue";
export default {
  data() {
    return {
      // 搜索框数据
      formInline: {
        directoryName: null,
        state: null,
      },
      directoryData: {}, //学科列表整个数据，包括数量，页码等
      subjectNameList: [],
      params: {
        page: 1,
        pagesize: 10,
      },
      currentPage: 1, //跳动的页码显示
      addDialog: false,
      states: [
        { name: "启用", state: 1 },
        { name: "禁用", state: 0 },
      ],
      isStart: {},
    };
  },
  components: {
    directorysAddDialog,
  },
  created() {
    this.getDirectorysList();
    this.getSubjectName();
  },
  computed: {
    // 当只有一页是隐藏分页
    pageCount() {
      return this.directoryData.pages === 1 ? true : false;
    },
    isShowheader() {
      return this.$route.query.id ? true : false;
    },
  },
  methods: {
    // 获取目录列表
    async getDirectorysList() {
      if (this.$route.query.id) {
        this.params.subjectID = this.$route.query.id;
        const data = await list(this.params);
        // console.log(data.data);
        this.directoryData = data.data;
      } else {
        const data = await list(this.params);
        // console.log(data.data);
        this.directoryData = data.data;
      }
    },
    // 日期字符串转换
    parseTime(row, col, cellValue) {
      return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    //格式化状态
    parseState(row, col, cellValue) {
      return ["已禁用", "已启用"][cellValue];
    },
    // 每页多少条
    handleSizeChange(val) {
      this.params.pagesize = val;
      this.getDirectorysList();
    },
    // 跳到当前页
    handleCurrentChange(val) {
      this.params.page = val;
      this.getDirectorysList();
    },
    // 目录搜索
    directorySearch() {
      this.params.directoryName = this.formInline.directoryName;
      this.params.state = this.formInline.state;
      this.getDirectorysList();
    },
    // 删除学科
    async removeDirectory(val) {
      try {
        await this.$confirm("此操作将永久删除该目录, 是否继续?", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        });
        this.params.id = val.id;
        await remove(this.params);
        this.$message.success("删除成功");
        this.getDirectorysList();
      } catch (error) {
        this.$message.error(error);
      }
    },
    // 传递修改学科数据
    editDirectory(val) {
      this.addDialog = true;
      this.$refs.directorysAddDialog.editDirectory(val);
    },
    // 获取所属学科目录
    async getSubjectName() {
      const { data } = await simple();
      this.subjectNameList = data;
    },
    // 清楚搜索表单
    clearForm() {
      this.formInline.directoryName = null;
      this.formInline.state = null;
      console.log(this.$route);
    },
    // 判断状态
    async changeState(val) {
      if (val.state === 1) {
        this.isStart.id = val.id;
        this.isStart.state = 0;
        await changeState(this.isStart);
        this.$message.success("操作成功");
      } else {
        this.isStart.id = val.id;
        this.isStart.state = 1;
        await changeState(this.isStart);
        this.$message.success("操作成功");
      }
      this.getDirectorysList();
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

.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}
::v-deep .is-disabled:hover {
  background-color: transparent;
  border-color: transparent;
}
</style>
