<template>
  <div class="container">
    <div class="companys">
      <el-card class="box-card">
        <div class="text item">
          <!-- 搜索区域 -->
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>关键字：</span>
                <el-input
                  v-model="formData.tags"
                  placeholder="请输入"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <span>状态：</span>
                <el-select v-model="formData.state" placeholder="请选择">
                  <el-option label="禁用" :value="0"></el-option>
                  <el-option label="启用" :value="1"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12" style="margin-left: 20px">
              <div>
                <el-button size="small" @click="onClear"> 清除 </el-button>
                <el-button size="small" type="primary" @click="onSave">
                  搜索
                </el-button>
              </div>
            </el-col>
            <el-button
              type="success"
              size="small"
              @click="showAddDialog"
              icon="el-icon-edit"
            >
              新增技巧
            </el-button>
          </el-row>
        </div>
        <!-- 提示栏 -->
        <Lalert style="margin-bottom: 15px"
          >共{{ tableData.counts }}条数据</Lalert
        >

        <!-- 表格 -->
        <el-table
          :data="tableList"
          style="width: 100%"
          v-loading="tableLoading"
        >
          <el-table-column type="index" label="序号" width="180">
          </el-table-column>
          <el-table-column label="文章标题" width="240">
            <template slot-scope="{ row }">
              {{ row.title }}
              <i
                class="el-icon-film video"
                v-if="row.videoURL"
                @click="showVideo(row)"
              ></i>
            </template>
          </el-table-column>

          <el-table-column prop="visits" label="阅读数" width="140">
          </el-table-column>
          <el-table-column prop="username" label="录入人"> </el-table-column>
          <el-table-column
            prop="createTime"
            label="录入时间"
            :formatter="timeFormatter"
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            align=""
            :formatter="stateFormatter"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-button type="text" @click="preBtn(row)">预览</el-button>
              <el-button type="text" @click="stateBtn(row)">{{
                { 0: "禁用", 1: "启用" }[row.state]
              }}</el-button>
              <el-button
                type="text"
                @click="editBtn(row)"
                :disabled="row.state == 0"
                >修改</el-button
              >
              <el-button
                type="text"
                @click="delBtn(row)"
                :disabled="row.state == 0"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page-change">
          <el-pagination
            background
            :page-sizes="[10, 20, 30, 50]"
            :page-size="formData.pagesize"
            layout="prev, pager, next,sizes,jumper"
            :total="tableData.counts"
            @current-change="currentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
    <!-- 新增弹框 -->
    <addArticles :visible.sync="addVisible" :formData="addData"></addArticles>
    <!-- 预览弹框 -->
    <PreviewArticles :visible.sync="perviewShow" :preData="preData" />
    <Video :visible.sync="videoShow" :videoSrc="videoSrc"/>
  </div>
</template>

<script>
import Video from "../components/articles-video.vue";
import addArticles from "../components/articles-add.vue";
import PreviewArticles from "../components/articles-preview.vue";
import dayjs from "dayjs";
import { list, remove, changeState } from "@/api/hmmm/articles.js";
export default {
  name: "articles",
  data() {
    return {
      // 表格数组
      tableList: [],
      tableData: {},
      // 搜索数据对象
      formData: {
        page: 1,
        pagesize: 10,
        tags: null,
        state: null,
      },
      perviewShow: false,
      addVisible: false,
      videoShow: false,
      tableLoading: false,
      page: {
        page: 1,
        pagesize: 10,
      },
      addData: {},
      // 预览文章信息对象
      preData: {},
      // 视频url
      videoSrc: "",
    };
  },
  components: {
    addArticles,
    PreviewArticles,
    Video,
  },

  created() {
    this.getSkillList(this.page);
    this.$notify.success("author to 李佳琪");
  },

  methods: {
    // 获取所有面试列表数据
    async getSkillList(obj) {
      this.tableLoading = true;
      const { data } = await list(obj);
      this.tableData = data;
      this.tableList = data.items;
      this.tableLoading = false;
    },
    // 格式化时间
    timeFormatter(a, b, val) {
      return dayjs(val).format("YYYY-MM-DD");
    },
    // 格式化状态
    stateFormatter(a, b, val) {
      return { 0: "禁用", 1: "启用" }[val];
    },
    // 搜索按钮
    async onSave() {
      this.getSkillList(this.formData);
    },
    // 清除按钮
    onClear() {
      this.formData = {
        page: 1,
        pagesize: 10,
        tags: null,
        state: null,
      };
      this.getSkillList(this.page);
    },
    // 点击分页
    async currentChange(num) {
      this.formData.page = num;
      this.getSkillList(this.formData);
    },
    // 切换分页数量
    handleSizeChange(val) {
      this.formData.pagesize = val;
      this.getSkillList(this.formData);
    },
    // 打开新增弹框
    showAddDialog() {
      this.addVisible = true;
      this.addData = {};
    },
    // 修改
    editBtn(row) {
      this.addData = row;
      this.addVisible = true;
    },
    // 禁用按钮
    closeBtn(row) {
      this.$confirm(
        `已成功${{ 1: "禁用", 0: "启用" }[row.state]}, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(async () => {
        // 禁用请求
        // await disabled(row);
        // 重新获取列表
        this.getSkillList();
        this.$message({
          type: "success",
          message: `${{ 0: "禁用", 1: "启用" }[row.state]}成功!`,
        });
      });
    },
    // 状态按钮
    async stateBtn({ id, state }) {
      console.log(id, state);
      await changeState({
        id,
        state: state == 1 ? 0 : 1,
      });
      this.$message.success("操作成功");
      // 重新获取列表
      this.getSkillList();
    },
    // 删除按钮
    delBtn(row) {
      this.$confirm("此操作将永久删除用户 , 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        // 删除请求
        await remove(row);
        // 重新获取列表
        this.getSkillList();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    // 预览按钮
    preBtn(row) {
      console.log(row);
      row.createTime = dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss");
      this.preData = row;
      this.perviewShow = true;
    },
    // 视频按钮
    showVideo({ videoURL }) {
      this.videoSrc = videoURL
      this.videoShow = true;
    },
  },
};
</script>

<style scoped lang="less">
.companys {
  padding: 15px;
  .el-col {
    margin-bottom: 20px;
    .grid-content {
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        color: #606266;
        font-weight: 700;
        width: 110px;
        text-align: right;
        background-color: #fff;
      }
    }
  }
  ::v-deep .el-table th {
    background-color: #fafafa;
  }
  .page-change {
    display: flex;
    justify-content: end;
    margin-top: 20px;
  }
}
::v-deep .el-input--medium .el-input__inner {
  width: 100%;
  height: 36px;
  line-height: 36px;
}
.video {
  color: #0000ff;
  font-size: 18px;
  cursor: pointer;
}
</style>
