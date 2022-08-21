<template>
  <el-pagination
    class="pagination"
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="paginationPagesizeArray"
    :page-size="paginationPagesize"
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
    paginationPagesizeArray: {
      type: Array,
      default: () => [20, 30, 50, 100],
    },
    paginationPagesize: {
      type: Number,
      default: 20,
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
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.$emit("pager");
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
