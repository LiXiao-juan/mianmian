<template>
  <div class="container">
    <div class="companys">
      <el-card class="box-card">
        <div class="text item">
          <!-- 搜索区域 -->
          <el-row>
            <!-- 一行 -->
            <el-col :span="22"></el-col>
            <el-col :span="2">
              <el-button
                style="text-align: right"
                type="success"
                size="small"
                icon="el-icon-edit"
                @click="$router.push('/questions/new')"
              >
                新增试题
              </el-button>
            </el-col>
            <!-- 第二行 -->
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>学科：</span>
                <el-select
                  v-model="subJectData.subjectID"
                  placeholder="请选择"
                  @change="clickSubject"
                >
                  <el-option
                    v-for="item in subjectList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>二级目录：</span>
                <el-select v-model="subJectData.catalogID" placeholder="请选择">
                  <el-option
                    v-for="item in directoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>标签：</span>
                <el-select v-model="subJectData.tags" placeholder="请选择">
                  <el-option
                    v-for="item in tagList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>关键字：</span>
                <el-input
                  v-model="subJectData.keyword"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </el-col>
            <!-- 第二行 -->
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>试题类型：</span>
                <el-select
                  v-model="formData.questionType"
                  placeholder="请选择"
                  @keyup.enter="handleFilter"
                  @change="handleProvince"
                  filterable
                >
                  <el-option
                    v-for="item in questionType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select></div
            ></el-col>

            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>难度：</span>
                <el-select v-model="formData.difficulty" placeholder="请选择">
                  <el-option
                    v-for="item in difficulty"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select></div
            ></el-col>

            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>方向：</span>
                <el-select v-model="formData.direction" placeholder="请选择">
                  <el-option
                    v-for="item in direction"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select></div
            ></el-col>

            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>录入人：</span>
                <el-select
                  v-model="formData.user"
                  placeholder="请选择"
                  @keyup.enter="handleFilter"
                  @change="handleProvince"
                  filterable
                >
                  <el-option
                    v-for="item in userList"
                    :key="item.id"
                    :label="item.username"
                    :value="item.id"
                  ></el-option>
                </el-select></div
            ></el-col>

            <!-- 第三行 -->
            <el-col :span="6" class="move-col">
              <div class="grid-content bg-purple">
                <span>题目备注：</span>
                <el-input
                  v-model="formData.remark"
                  placeholder="请输入内容"
                ></el-input></div
            ></el-col>

            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>企业简称：</span>
                <el-input
                  v-model="formData.shortName"
                  placeholder="请输入内容"
                ></el-input></div
            ></el-col>

            <!-- 城市下拉框 -->
            <el-col :span="6" class="move-col">
              <div class="grid-content bg-purple">
                <span>城市：</span>
                <el-select
                  v-model="formData.province"
                  placeholder="请选择"
                  @keyup.enter="handleFilter"
                  @change="handleProvince"
                  filterable
                >
                  <el-option
                    v-for="item in citySelect.province"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="formData.city"
                  @keyup.enter="handleFilter"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in citySelect.cityDate"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="2" style="margin-left: 190px">
              <div>
                <el-button size="small" @click="onClear"> 清除 </el-button>
                <el-button size="small" type="primary" @click="onSave">
                  搜索
                </el-button>
              </div>
            </el-col>
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
          <el-table-column prop="number" label="试题编号" width="180">
          </el-table-column>
          <el-table-column prop="subject" label="学科" width="180">
          </el-table-column>
          <el-table-column prop="catalog" label="目录"> </el-table-column>
          <el-table-column
            prop="questionType"
            label="题型"
            :formatter="typeFormatter"
          >
          </el-table-column>
          <el-table-column prop="tags" label="题干"> </el-table-column>
          <el-table-column
            prop="addDate"
            label="录入时间"
            :formatter="timeFormatter"
          >
          </el-table-column>
          <el-table-column
            prop="difficulty"
            label="难度"
            :formatter="diffFormatter"
          >
          </el-table-column>
          <el-table-column prop="creator" label="录入人"> </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="{ row }">
              <el-button
                plain
                type="primary"
                icon="el-icon-view"
                circle
                @click="editBtn(row)"
              ></el-button>
              <el-button
                plain
                type="success"
                icon="el-icon-edit"
                circle
                @click="editBtn(row)"
              ></el-button>
              <el-button
                plain
                type="danger"
                icon="el-icon-delete"
                circle
                @click="delBtn(row)"
              ></el-button>
              <!-- 禁用 -->
              <el-tooltip
                v-if="row.state === 1"
                class="item"
                effect="dark"
                content="禁用"
                placement="top"
              >
                <el-button
                  plain
                  type="warning"
                  icon="el-icon-close"
                  circle
                  @click="closeBtn(row)"
                ></el-button>
              </el-tooltip>
              <!-- 开启 -->
              <el-tooltip
                v-else
                class="item"
                effect="dark"
                content="开启"
                placement="top"
              >
                <el-button
                  plain
                  type="warning"
                  icon="el-icon-check"
                  circle
                  @click="closeBtn(row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page-change">
          <el-pagination
            background
            :page-sizes="[5, 10, 20, 30]"
            :page-size="subJectData.pagesize"
            layout="prev, pager, next,sizes,jumper"
            :total="tableData.counts"
            @current-change="currentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { simple } from "@/api/hmmm/subjects";
import { list } from "@/api/hmmm/questions";
import { simple as directorySimple } from "@/api/hmmm/directorys";
import { simple as tagSimple } from "@/api/hmmm/tags";
import { simple as userSimple } from "@/api/base/users";
import { citys, provinces } from "@/api/hmmm/citys.js";
// 引入映射数据文件
import { questionType, difficulty, direction } from "@/api/hmmm/constants";
export default {
  name: "questions",
  data() {
    return {
      subjectList: [], //科目列表
      tagList: [], //目录列表
      userList: [], //人员列表
      questionType,
      difficulty,
      direction,
      // 表格数组
      tableList: [],
      tableData: {},
      //城市列表数据
      citySelect: {
        province: [],
        cityDate: [],
      },
      // 搜索数据对象
      formData: {
        page: 1,
        pagesize: 10,
        questionType: "",
        difficulty: "",
        direction: "",
        user: "",
        remark: "",
        shortName: "",
      },
      // 学科对象
      subJectData: {
        subjectID: "",
        tags: "",
        catalogID: "",
        keyword: "",
        page: 1,
        pagesize: 5,
      },
      directoryList: [],
      tableLoading: false,
      page: {
        page: 1,
        pagesize: 5,
      },
    };
  },
  components: {},

  created() {
    this.getSubjectList();
    this.getCityData();
    this.getQuestionList(this.page);
    this.getUserList();
    this.$notify.success("author to 李佳琪");
  },

  methods: {
    // 获取学科简单列表
    async getSubjectList() {
      const { data } = await simple();
      this.subjectList = data;
    },
    // 获取所有题库列表数据
    async getQuestionList(obj) {
      this.tableLoading = true;
      const { data } = await list(obj);
      this.tableData = data;
      console.log(data);
      this.tableList = data.items;
      this.tableLoading = false;
    },
    // 选择完科目以后获取二级目录列表
    async clickSubject() {
      const { data } = await directorySimple(this.subJectData);
      // 目录列表赋值
      this.directoryList = data;
      // 获取标签的列表
      const res = await tagSimple(this.subJectData);
      this.tagList = res.data;
      this.subJectData.tags = res.data[0] ? res.data[0].value : "";
      // 判断若返回的数据有二级目录则渲染第一项--否则返回空
      this.subJectData.catalogID = data[0] ? data[0].value : "";
    },
    // 获取城市下拉列表数据
    getCityData() {
      this.citySelect.province = provinces();
    },
    // 选省获取到市
    handleProvince(e) {
      this.citySelect.cityDate = citys(e);
      this.formData.city = this.citySelect.cityDate[0];
    },
    // 格式化时间
    timeFormatter(a, b, val) {
      return dayjs(val).format("YYYY-MM-DD");
    },
    // 格式化题型
    typeFormatter(a, b, val) {
      return { 1: "单选", 2: "多选", 3: "简答" }[val];
    },
    // 格式化难度
    diffFormatter(a, b, val) {
      return { 1: "简单", 2: "一般", 3: "困难" }[val];
    },
    // 搜索按钮
    async onSave() {
      this.getQuestionList(this.subJectData);
    },
    // 获取录入人数据
    async getUserList() {
      const { data } = await userSimple();
      this.userList = data;
    },
    // 清除按钮
    onClear() {
      this.formData = {
        page: 1,
        pagesize: 10,
        questionType: "",
        difficulty: "",
        direction: "",
        user: "",
        remark: "",
        shortName: "",
      };
      this.subJectData = {
        subjectID: "",
        tags: "",
        catalogID: "",
        keyword: "",
        page: 1,
        pagesize: 5,
      };
    },
    // 点击分页
    async currentChange(num) {
      this.subJectData.page = num;
      this.getQuestionList(this.subJectData);
    },
    // 切换分页数量
    handleSizeChange(val) {
      this.subJectData.pagesize = val;
      this.getQuestionList(this.subJectData);
    },
    // 修改
    editBtn(row) {},
    // 禁用按钮
    closeBtn(row) {},
    // 删除按钮
    delBtn(row) {},
  },
};
</script>

<style scoped lang="less">
.companys {
  padding: 15px;
  .el-col {
    margin-bottom: 10px;
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
.move-col {
  margin-left: 20px;
}
.move-col-right {
  margin-right: 20px;
}
</style>
