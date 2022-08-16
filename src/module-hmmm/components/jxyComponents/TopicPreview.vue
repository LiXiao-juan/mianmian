<template>
  <el-dialog
    title="题目预览"
    :visible.sync="dialogVisible"
    :before-close="onClose"
  >
    <el-row>
      <el-col :span="6" class="questions-preview"
        >【题型】：{{ questionType }}</el-col
      >
      <el-col :span="6" class="questions-preview"
        >【编号】：{{ detailList.id }}</el-col
      >
      <el-col :span="6" class="questions-preview"
        >【难度】：{{ difficulty }}</el-col
      >
      <el-col :span="6" class="questions-preview"
        >【标签】：{{ detailList.tags }}</el-col
      >
      <el-col :span="6" class="questions-preview"
        >【学科】：{{ detailList.subjectName }}</el-col
      >
      <el-col :span="6" class="questions-preview"
        >【目录】：{{ detailList.directoryName }}</el-col
      >
      <el-col :span="6" class="questions-preview"
        >【方向】：{{ detailList.direction }}</el-col
      >
    </el-row>
    <hr />
    【题干】：
    <div style="color: blue" v-html="detailList.question"></div>
    <div>
      <div style="padding-bottom: 5px">
        多选题 选项：（以下选中的选项为正确答案）
      </div>
      <div
        style="padding: 8px 0px"
        v-for="item in detailList.options"
        :key="item.id"
      >
        <el-checkbox
          v-model="item.isRight"
          :true-label="1"
          :false-label="0"
          onclick="return false;"
          >{{ item.title }}</el-checkbox
        >
      </div>
    </div>
    <hr />
    【参考答案】：<el-button
      type="danger"
      size="small"
      @click="showVideo = !showVideo"
      >视频答案预览</el-button
    >
    <div class="video" style="width: 400px; height: 300px" v-if="showVideo">
      <video
        controls="controls"
        :src="detailList.videoURL"
        style="width: 400px; height: 300px"
      ></video>
    </div>
    <hr />
    【答案解析】:
    <div
      data-v-61b2ab32=""
      style="display: inline-block"
      v-html="detailList.answer"
    ></div>
    <hr />
    【题目备注】：{{ detailList.remarks }}
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onClose">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { difficulty, questionType } from "@/api/hmmm/constants";
export default {
  props: {
    detailList: {
      required: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      showVideo: false,
    };
  },

  created() {},

  methods: {
    onClose() {
      this.dialogVisible = false;
    },
  },
  computed: {
    /* 题目难度 */
    difficulty() {
      const obj = difficulty.find((item) => {
        return item.value == this.detailList.difficulty;
      });
      return obj ? obj.label : "未知";
    },
    /* 题型 */
    questionType() {
      const obj = questionType.find((item) => {
        return item.value == this.detailList.questionType;
      });
      return obj ? obj.label : "未知";
    },
  },
};
</script>

<style lang="less" scoped>
.questions-preview {
  padding: 10px 0;
}
</style>
