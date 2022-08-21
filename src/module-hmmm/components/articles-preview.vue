<template>
  <div class="container">
    <el-dialog
      :visible="visible"
      title="预览文章"
      width="800px"
      @close="onClose"
    >
      <!-- 标题 -->
      <h2 v-html="preData.title"></h2>
      <!-- 作者信息 -->
      <div>
        <span>{{ preData.createTime }}</span>
        <span style="margin: 0 10px">{{ preData.username }}</span>
        <i class="el-icon-view" style="margin-right: 10px"></i>
        <span>{{ preData.visits }}</span>
      </div>
      <br>
      <!-- 内容区域 -->
      <div class="content">
        <div v-html="preData.articleBody"> </div>
      </div>
      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="onClose">{{ $t("table.cancel") }}</el-button>
        <el-button type="primary">{{ $t("table.confirm") }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    // 父组件传入的文章详情对象
    preData: {
      type: Object,
      default: {},
    },
  },
  methods: {
    onClose() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style scoped lang="scss">
.el-dialog__footer {
  text-align: center;
}
.content {
    background: #f5f5f5;
    padding: 10px;
}
</style>
