<template>
  <el-dialog
    :visible="visible"
    width="1000px"
    @close="onClose"
    style="backgroundcolor: transparent"
    :show-close="false"
  >
    <div class="close">
      <i class="el-icon-close" @click="onClose"></i>
    </div>
    <center>
      <video :src="videoSrc" width="900" height="650" controls autoplay muted></video>
    </center>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    videoSrc: {
      type: String,
      default: "#",
    },
  },
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    onClose() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  background: rgba(0, 0, 0, 0) !important; //弹出层透明
  // border: rgb(40, 118, 193) 1px solid;
  // backdrop-filter: blur(3px); //模糊
}
::v-deep .el-dialog__title {
  background: rgba(0, 0, 0, 0) !important; //弹出层透明
}
::v-deep .el-dialog__header {
  background: rgba(0, 0, 0, 0) !important; //弹出层透明 ;
}
::v-deep .el-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  border-radius: 2px;
  -webkit-box-shadow: 0px 0px 0px 0px;
  box-shadow: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 50%;
}
.close {
  width: 50px;
  height: 50px;
  position: absolute;
  top: -50px;
  left: 50%;
  -webkit-transform: translate(-50%);
  transform: translate(-50%);
  background: rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 0 5px rgb(0 0 0 / 40%);
  box-shadow: 0 0 5px rgb(0 0 0 / 40%);
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}
.close:hover {
  background: rgba(70, 70, 70, 0.4);
}
</style>
