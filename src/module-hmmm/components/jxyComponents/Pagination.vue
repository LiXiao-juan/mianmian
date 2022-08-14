<template>
  <el-pagination
    class="pagination"
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[20, 30, 50, 100]"
    :page-size="20"
    layout="prev, pager, next, sizes, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    params: {
      type: Object,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },

  created() {},

  methods: {
    handleSizeChange(val) {
      this.params.pagesize = val;
      this.$emit("pager");
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.$emit("pager");
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style scoped>
.pagination {
  text-align: right;
  margin-top: 20px;
}
</style>
