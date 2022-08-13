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
              >
                新增试题
              </el-button>
            </el-col>
            <!-- 第二行 -->
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>学科：</span>
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
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>二级目录：</span>
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
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>标签：</span>
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
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>关键字：</span>
                <el-input
                  v-model="keywords"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </el-col>
            <!-- 第二行 -->
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>试题类型：</span>
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
                </el-select></div
            ></el-col>

            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>难度：</span>
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
                </el-select></div
            ></el-col>

            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>方向：</span>
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
                </el-select></div
            ></el-col>

            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>录入人：</span>
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
                </el-select></div
            ></el-col>

            <!-- 第三行 -->
            <el-col :span="6" class="move-col">
              <div class="grid-content bg-purple">
                <span>题目备注：</span>
                <el-input
                  v-model="keywords"
                  placeholder="请输入内容"
                ></el-input></div
            ></el-col>

            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>企业简称：</span>
                <el-input
                  v-model="keywords"
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
          <el-table-column prop="id" label="序号" width="180">
          </el-table-column>
          <el-table-column prop="number" label="企业编号" width="180">
          </el-table-column>
          <el-table-column prop="shortName" label="企业简称"> </el-table-column>
          <el-table-column prop="tags" label="标签"> </el-table-column>
          <el-table-column prop="creatorID" label="创建者"> </el-table-column>
          <el-table-column
            prop="addDate"
            label="创建日期"
            :formatter="timeFormatter"
          >
          </el-table-column>
          <el-table-column prop="remarks" label="备注"> </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            align=""
            :formatter="stateFormatter"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-button
                plain
                type="primary"
                icon="el-icon-edit"
                circle
                @click="editBtn(row)"
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
                  type="success"
                  icon="el-icon-check"
                  circle
                  @click="closeBtn(row)"
                ></el-button>
              </el-tooltip>
              <el-button
                plain
                type="danger"
                icon="el-icon-delete"
                circle
                @click="delBtn(row)"
              ></el-button>
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
  </div>
</template>

<script>
import dayjs from "dayjs";
import { citys, provinces } from "@/api/hmmm/citys.js";
import { list, remove, disabled } from "@/api/hmmm/companys";
export default {
  name: "questions",
  data() {
    return {
      keywords: "",
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
        tags: "",
        province: "",
        city: "",
        shortName: "",
        state: "",
      },
      tableLoading: false,
      page: {
        page: 1,
        pagesize: 10,
      },
    };
  },
  components: {},

  created() {
    this.getCityData();
    this.getCompanysList();
  },

  methods: {
    // 获取所有企业列表数据
    async getCompanysList(obj) {
      this.tableLoading = true;
      const { data } = await list(obj);
      this.tableData = data;
      this.tableList = data.items;
      this.tableLoading = false;
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
    // 格式化状态
    stateFormatter(a, b, val) {
      return { 0: "禁用", 1: "启用" }[val];
    },
    // 搜索按钮
    async onSave() {
      this.getCompanysList(this.formData);
    },
    // 清除按钮
    onClear() {
      this.formData = {
        page: 1,
        pagesize: 10,
        tags: "",
        province: "",
        city: "",
        shortName: "",
        state: "",
      };
    },
    // 点击分页
    async currentChange(num) {
      this.page.page = num;
      this.getCompanysList(this.page);
    },
    // 切换分页数量
    handleSizeChange(val) {
      this.page.pagesize = val;
      this.getCompanysList(this.page);
    },
    // 修改
    editBtn(row) {
      console.log(row);
      this.addVisible = true;
      this.$refs.addCompany.editUpdate(row);
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
        await disabled(row);
        // 重新获取列表
        this.getCompanysList();
        this.$message({
          type: "success",
          message: `${{ 0: "禁用", 1: "启用" }[row.state]}成功!`,
        });
      });
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
        this.getCompanysList();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
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
