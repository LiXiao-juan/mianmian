<template>
  <div>
    <div class="companys">
      <el-card class="box-card">
        <div class="text item">
          <!-- 搜索区域 -->
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>标签名称：</span>
                <el-input v-model="input" placeholder="请输入"></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>城市：</span>
                <el-form-item>
                  <el-select
                    v-model="formData.province"
                    placeholder="请选择活动区域"
                  >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>地区：</span>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>企业简称：</span>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>状态：</span>
                <el-input
                  v-model="formData.shortName"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-button size="small" class="button-box">清除</el-button>
                <el-button size="small" type="primary">搜索</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 提示栏 -->
        <el-alert type="info" :closable="false"> 123 </el-alert>
        <Lalert></Lalert>

        <!-- 表格 -->
        <el-table
          :data="tableData"
          style="width: 100%"
          header-row-style="{ backgroundColor: '#fafafa'; }"
        >
          <el-table-column prop="date" label="序号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="企业编号" width="180">
          </el-table-column>
          <el-table-column prop="address" label="企业简称"> </el-table-column>
          <el-table-column prop="address" label="标签"> </el-table-column>
          <el-table-column prop="address" label="创建者"> </el-table-column>
          <el-table-column prop="address" label="创建日期"> </el-table-column>
          <el-table-column prop="address" label="备注"> </el-table-column>
          <el-table-column prop="address" label="状态"> </el-table-column>
          <el-table-column prop="address" label="操作"> </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { list } from "@/api/hmmm/companys";
export default {
  data() {
    return {
      input: "",
      // 表格数组
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
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
    };
  },
  components: {},

  created() {
    this.getCompanysList();
  },

  methods: {
    async getCompanysList() {
      await list();
    },
  },
};
</script>

<style scoped lang="less">
.companys {
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
      .button-box {
        padding-left: 10px;
      }
    }
  }
}
::v-deep .el-input--medium .el-input__inner {
  width: 70%;
  height: 36px;
  line-height: 36px;
}
</style>
