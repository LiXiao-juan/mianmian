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
                  <el-option label="启用" value="1"></el-option>
                  <el-option label="禁用" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  @click="
                    {
                      form.tagName = null;
                      form.state = null;
                    }
                  "
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
              type="text"
              icon="el-icon-back"
              size="small"
              v-if="$route.query.id"
              @click="$router.go(-1)"
              >返回学科</el-button
            >
            <el-button
              size="small"
              type="success"
              icon="el-icon-edit"
              @click="showDialog"
              >新增标签</el-button
            >
          </el-col>
        </el-row>
        <!-- 头部搜索区 -->
        <!-- 头部提示区 -->
        <TotalData>
          <template #icon>
            <i class="el-icon-info"></i>
          </template>
          <span class="total">数据一共{{ tableData.counts }}条</span>
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
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="subjectName" label="所属学科" width="286">
          </el-table-column>
          <el-table-column prop="tagName" label="标签名称" width="286">
          </el-table-column>
          <el-table-column prop="username" label="创建者" width="286">
          </el-table-column>
          <el-table-column
            prop="addDate"
            label="创建日期"
            width="286"
            :formatter="addDate"
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="286"
            :formatter="state"
          >
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="medium"
                @click="changeState(row)"
                v-if="!!!row.state"
                >启用</el-button
              >
              <el-button
                type="text"
                size="medium"
                @click="changeState(row)"
                v-if="!!row.state"
                >禁用</el-button
              >
              <el-button
                type="text"
                size="medium"
                :disabled="!!row.state"
                @click="detailTags(row)"
                >修改</el-button
              >
              <el-button
                type="text"
                size="medium"
                :disabled="!!row.state"
                @click="deleteTags(row)"
                >删除</el-button
              >
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
        <TagsDialog
          ref="tagsDialog"
          :simpleSubjects="simpleSubjects"
          @addTags="addTags"
          @updateTags="updateTags"
          :title="title"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import { list, changeState, add, update, remove } from "@/api/hmmm/tags";
import { simple } from "@/api/hmmm/subjects";
import { status } from "@/api/hmmm/constants";
import dayjs from "dayjs";
import Pagination from "../components/jxyComponents/Pagination.vue";
import TotalData from "../components/jxyComponents/TotalData.vue";
import TagsDialog from "../components/tags-add.vue";
export default {
  components: {
    TotalData,
    Pagination,
    TagsDialog,
  },
  data() {
    return {
      // 搜索框数据
      form: {
        tagName: null,
        state: null,
        page: 1,
        pagesize: 10,
      },
      tableData: [],
      paginationPagesize: 10,
      paginationPagesizeArray: [5, 10, 20, 50],
      dialogFormVisible: false,
      simpleSubjects: [],
      queryId: "",
      title: "",
    };
  },
  created() {
    this.getTagsList();
    if (this.$route.query.id) {
      this.getTagsList();
    }
  },
  methods: {
    /* 获取标签列表 */
    async getTagsList() {
      try {
        if (this.$route.query.id) {
          this.form.subjectID = this.$route.query.id;
        }
        const { data } = await list(this.form);
        this.tableData = data;
      } catch (error) {
        console.log(error);
      }
    },
    /* 格式化时间 */
    addDate(row, column, cellValue, index) {
      return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    /* 格式化状态 */
    state(row, column, cellValue, index) {
      const obj = status.find((item) => {
        return item.value == cellValue;
      });
      return obj ? "已" + obj.label : "未知";
    },
    /* 修改标签状态 */
    async changeState(row) {
      try {
        await changeState({ id: row.id, state: !!row.state ? 0 : 1 });
        if (!!row.state) {
          row.state = 0;
        } else {
          row.state = 1;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /* 显示弹层并获取简单学科列表 */
    async showDialog() {
      this.title = "新增标签";
      try {
        const res = await simple();
        this.simpleSubjects = res.data;
        this.$refs.tagsDialog.dialogFormVisible = true;
      } catch (error) {
        console.log(error);
      }
    },
    /* 标签添加 */
    async addTags() {
      try {
        await add(this.$refs.tagsDialog.form);
        await this.getTagsList();
        this.$message.success("操作成功");
        this.$refs.tagsDialog.onClose();
      } catch (error) {
        console.log(error);
      }
    },
    /* 弹窗标签回显 */
    async detailTags(row) {
      try {
        await this.showDialog();
        this.title = "修改标签";
        this.$refs.tagsDialog.form = {
          subjectID: row.subjectID,
          tagName: row.tagName,
          id: row.id,
        };
      } catch (error) {
        console.log(error);
      }
    },
    /* 标签修改 */
    async updateTags() {
      try {
        await update(this.$refs.tagsDialog.form);
        await this.getTagsList();
        this.$message.success("操作成功");
        this.$refs.tagsDialog.onClose();
      } catch (error) {}
    },
    async deleteTags(row) {
      await this.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      await remove(row);
      const page = this.tableData.counts;
      if (this.form.page > 1 && page % this.form.pagesize == 1) {
        this.form.page = this.form.page - 1;
      }
      this.$message.success("删除成功");
      await this.getTagsList();
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
