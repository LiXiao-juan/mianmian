<template>
  <div class="container">
    <div class="question-container">
      <el-card class="box-card">
        <!-- 头部搜索区 -->
        <el-row>
          <el-col :span="18">
            <el-form :inline="true" :model="form" class="demo-form-inline">
              <el-form-item label="标签名称" style="margin-left: 12px">
                <el-input v-model="form.tagName"></el-input>
              </el-form-item>
              <el-form-item label="状态" style="margin-left: 35px">
                <el-select v-model="form.state" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button size="small" @click="params.keyword = ''"
                  >清除</el-button
                >
                <el-button type="primary" size="small" @click="getTagsList"
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
              >新增目录</el-button
            >
          </el-col>
        </el-row>
        <!-- 头部搜索区 -->
        <!-- 头部提示区 -->
        <TotalData>
          <template #icon>
            <i class="el-icon-info"></i>
          </template>
          <span class="total">数据一共{{}}条</span>
        </TotalData>
        <!-- 头部提示区 -->
        <el-table
          :data="tableData.items"
          style="width: 100%"
          :header-cell-style="{
            backgroundColor: '#fafafa',
            borderBottom: '2px solid #e8e8e8',
          }"
        >
          <el-table-column prop="id" label="序号" width="80"> </el-table-column>
          <el-table-column prop="questionIDs" label="所属学科" width="287">
          </el-table-column>
          <el-table-column prop="addTime" label="标签名称" width="287">
          </el-table-column>
          <el-table-column prop="totalSeconds" label="创建者" width="287">
          </el-table-column>
          <el-table-column prop="accuracyRate" label="创建日期" width="287">
          </el-table-column>
          <el-table-column prop="userName" label="状态" width="287">
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{ row }">
              <el-button class="btnStyle">禁用</el-button>
              <el-button class="btnStyle">修改</el-button>
              <el-button class="btnStyle">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination
          :total="tableData.counts + 0"
          :params="form"
          :paginationPagesizeArray="paginationPagesizeArray"
          :paginationPagesize="paginationPagesize"
          @pager="getTagsList"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import {} from "@/api/hmmm/directorys";
import dayjs from "dayjs";
import Pagination from "../components/jxyComponents/Pagination.vue";
import TotalData from "../components/jxyComponents/TotalData.vue";
export default {
  components: {
    TotalData,
    Pagination,
  },
  data() {
    return {
      // 搜索框数据
      form: {
        tagName: "",
        state: "",
        page: 1,
        pagesize: 10,
      },
      tableData: [],
      paginationPagesize: 10,
      paginationPagesizeArray: [5, 10, 20, 50],
    };
  },
  created() {},
  methods: {
    getTagsList() {},
  },
};
</script>

<style scoped lang="less">
.question-container {
  padding: 0 10px;
  margin: 10px 0;
  .el-row {
    margin-bottom: 18px;

    .el-form-item--medium {
      margin-bottom: 0;
      ::v-deep .el-input__inner {
        height: 32px;
        line-height: 32px;
      }
    }
  }
  .total {
    font-size: 13px;
    margin-left: 8px;
  }
}
</style>
