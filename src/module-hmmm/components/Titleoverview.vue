<template>
  <el-dialog
    title="题目预览"
    :visible.sync="dialogVisible"
    :before-close="onClose"
  >
    <el-row>
      <el-col :span="6" class="preview">【题型】：{{ questionType }}</el-col>
      <el-col :span="6" class="preview">【编号】：{{ detailList.id }}</el-col>
      <el-col :span="6" class="preview">【难度】：{{ difficulty }}</el-col>
      <el-col :span="6" class="preview">【标签】：{{ detailList.tags }}</el-col>
      <el-col :span="6" class="preview"
        >【学科】：{{ detailList.subjectName }}</el-col
      >
      <el-col :span="6" class="preview"
        >【目录】：{{ detailList.directoryName }}</el-col
      >
      <el-col :span="6" class="preview"
        >【方向】：{{ detailList.direction }}</el-col
      >
    </el-row>
    <hr />
    【题干】：
    <div style="color: blue" v-html="detailList.question"></div>
    <div v-if="!(questionType == '简答')">
      <div style="padding-bottom: 5px">
        {{ questionType }}题 选项：（以下选中的选项为正确答案）
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
    <template #footer>
      <el-button type="primary" @click="onClose">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { difficulty, questionType } from "@/api/hmmm/constants";
export default {
  data() {
    return {
      dialogVisible: false,
      showVideo: false,
    };
  },
  props: {
    detailList: {
      required: true,
    },
  },
  created() {},
  methods: {
    onClose() {
      this.dialogVisible = false;
    },
  },
  computed: {
    //题目类型
    questionType() {
      const title = questionType.find((item) => {
        return item.value == this.detailList.questionType;
      });
      return title ? title.label : "未知";
    },
    // 难度类型
    difficulty() {
      const style = difficulty.find((item) => {
        return item.value == this.detailList.difficulty;
      });
      return style ? style.label : "未知";
    },
  },
};
</script>

<style lang="scss" scoped>
.preview {
  padding: 10px 0;
}
.el-button--medium {
  padding: 10px 20px;
  font-size: 14px;
  float: right;
  border-radius: 4px;
  margin-top: -30px;
}
</style>
