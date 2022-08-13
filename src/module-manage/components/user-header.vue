<template>
  <div>
    <el-row type="flex">
      <el-col>
        <el-input
          v-model="input"
          placeholder="根据用户名搜索"
          size="small"
        ></el-input>
        <el-button size="small" style="margin-left: 15px" @click="clearAble"
          >清空</el-button
        >
        <el-button
          type="primary"
          size="small"
          style="margin-left: 15px"
          @click="searchUser"
          >搜索</el-button
        >
      </el-col>
      <el-col>
        <el-row justify="end" type="flex">
          <slot name="right" />
        </el-row>
      </el-col>
    </el-row>
    <el-tag type="info">
      <i :class="leftIcon"></i>
      <slot name="left-tag" />
    </el-tag>
  </div>
</template>

<script>
// import { list } from "@/api/base/users.js";
export default {
  name: "UserHeader",
  data() {
    return {
      input: "",
      params: {
        page: 1,
        pagesize: 10,
      },
    };
  },
  props: {
    leftIcon: {
      type: String,
      default: "el-icon-info",
    },
  },

  created() {},

  methods: {
    // 清空输入框
    clearAble() {
      this.input = "";
    },
    // 搜索用户
    async searchUser() {
      // const res = await list(
      //   this.params.page,
      //   this.params.pagesize,
      //   this.input
      // );
      // console.log(res);
    },
  },
};
</script>

<style scoped>
.el-input {
  width: 200px;
  height: 32px;
  position: relative;
  font-size: 13px;
  display: inline-block;
}
.el-tag {
  width: 100%;
  padding: 8px 16px;
  margin: 0;
  margin-top: 20px;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  opacity: 1;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  transition: opacity 0.2s;
  line-height: 1.15;
  margin-bottom: 20px;
  height: 35px;
  font-size: 13px;
}
.el-icon-info {
  font-size: 16px;
  width: 16px;
  margin-right: 5px;
}
</style>
