<template>
  <div class="container">
    <div class="question-container">
      <el-card class="box-card">
        <el-row>
          <el-col :span="6" style="display: flex"
            ><div class="label">关键字</div>
            <el-input
              v-model="params.keyword"
              placeholder="根据编号搜索"
              size="small"
            ></el-input>
          </el-col>
          <el-col :span="6" :offset="12">
            <el-button size="small" @click="params.keyword = ''"
              >清除</el-button
            >
            <el-button type="primary" size="small" @click="getRandomsList"
              >搜索</el-button
            >
          </el-col>
        </el-row>
        <TotalData>
          <template #icon>
            <i class="el-icon-info"></i>
          </template>
          <span class="total">数据一共{{ tableData.counts }}条</span>
        </TotalData>
        <el-table
          :data="tableData.items"
          style="width: 100%"
          :header-cell-style="{
            backgroundColor: '#fafafa',
            borderBottom: '2px solid #e8e8e8',
          }"
        >
          <el-table-column prop="id" label="编号" width="220">
          </el-table-column>
          <el-table-column
            prop="questionType"
            label="题型"
            width="80"
            :formatter="questionType"
          >
          </el-table-column>
          <el-table-column prop="questionIDs" label="题目编号" width="220">
            <template slot-scope="{ row }">
              <div
                v-for="item in row.questionIDs"
                :key="item.number"
                @click="showDialog(item.id)"
              >
                <a href="#" style="color: rgb(0, 153, 255)">{{
                  item.number
                }}</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="addTime" label="录入时间" width="180">
          </el-table-column>
          <el-table-column prop="totalSeconds" label="答题时间(s)" width="295">
          </el-table-column>
          <el-table-column prop="accuracyRate" label="正确率(%)" width="293">
          </el-table-column>
          <el-table-column prop="userName" label="录入人" width="293">
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                plain
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination
          :total="tableData.counts + 0"
          :params="params"
          @pager="getRandomsList"
        />
      </el-card>
      <TopicPreview ref="dialog" :detailList="detailList" />
    </div>
  </div>
</template>

<script>
import TotalData from "../components/jxyComponents/TotalData.vue";
import Pagination from "../components/jxyComponents/Pagination.vue";
import TopicPreview from "../components/jxyComponents/TopicPreview.vue";
import { randoms, removeRandoms, detail } from "@/api/hmmm/questions";
import { questionType } from "@/api/hmmm/constants";
export default {
  components: {
    TotalData,
    Pagination,
    TopicPreview,
  },
  created() {
    this.getRandomsList();
  },
  data() {
    return {
      params: {
        page: 1,
        pagesize: 20,
        keyword: "",
      }, //请求参数
      tableData: [], //表格数据
      detailList: [], //预览详情
    };
  },
  methods: {
    /* 获取题目列表 */
    async getRandomsList() {
      try {
        const res = await randoms(this.params);
        this.tableData = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    /* 格式化题型 */
    questionType(row, column, cellValue, index) {
      const obj = questionType.find((item) => {
        return item.value == cellValue;
      });
      return obj ? obj.label : "未知";
    },
    /* 删除题组 */
    async handleDelete(index, row) {
      try {
        await this.$confirm("此操作将永久删除该题组, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        await removeRandoms(row);
        this.getRandomsList();
        this.$message.success("删除成功");
      } catch (error) {
        console.log(error);
      }
    },
    async showDialog(id) {
      try {
        const res = await detail({ id });
        this.detailList = res.data;
      } catch (error) {
      } finally {
        this.$refs.dialog.dialogVisible = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
.question-container {
  padding: 0 10px;
  margin: 10px 0;
  .el-row {
    margin-bottom: 18px;
    .label {
      width: 92px;
      line-height: 32px;
      text-align: right;
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #606266;
      padding: 0 12px 0 0;
      font-weight: 700;
    }
    .el-col-offset-12 {
      text-align: right;
      .el-button {
        width: 56px;
      }
    }
  }
  .total {
    font-size: 13px;
    margin-left: 8px;
  }
}
</style>
