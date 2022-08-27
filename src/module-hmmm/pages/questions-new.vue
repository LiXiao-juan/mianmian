<template>
  <div class="container">
    <div class="question-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ queryId ? "试题修改" : "试题录入" }}</span>
        </div>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="学科：" prop="subjectID">
            <el-select
              v-model="form.subjectID"
              placeholder="请选择"
              style="width: 400px"
              @change="subjectChange"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in subjectList"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="目录：" prop="catalogID">
            <el-select
              v-model="form.catalogID"
              placeholder="请选择"
              style="width: 400px"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in catalogList"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业：" prop="enterpriseID">
            <el-select
              v-model="form.enterpriseID"
              placeholder="请选择"
              style="width: 400px"
            >
              <el-option
                :label="item.company"
                :value="item.id"
                v-for="item in companyList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市：" prop="city">
            <el-select
              v-model="form.province"
              placeholder="请选择"
              style="width: 198px"
              @change="handleProvince"
            >
              <el-option
                v-for="item in citySelect.provincesList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
            <el-select
              v-model="form.city"
              placeholder="请选择"
              style="width: 198px; margin-left: 2px"
            >
              <el-option
                v-for="item in citySelect.citysList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="方向：" prop="direction">
            <el-select
              v-model="form.direction"
              placeholder="请选择"
              style="width: 400px"
            >
              <el-option
                v-for="(item, index) in direction"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型：">
            <el-radio-group
              v-model="form.questionType"
              @change="defaultQusetion"
            >
              <el-radio
                v-for="item in questionType"
                :key="item.value"
                :label="item.value"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="难度：">
            <el-radio-group v-model="form.difficulty">
              <el-radio
                v-for="item in difficulty"
                :key="item.value"
                :label="item.value"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="题干：" prop="question">
            <MyQuillEditor
              v-model="form.question"
              :editorIndex="1"
              ref="editorFirst"
            ></MyQuillEditor>
          </el-form-item>
          <el-form-item label="选项：" v-if="form.questionType !== 3">
            <!-- 单选 -->
            <el-radio-group
              v-model="radioList"
              v-if="form.questionType === 1"
              @change="radioChange"
            >
              <div
                v-for="(item, index) in form.options"
                :key="index"
                class="question-style"
              >
                <el-radio :label="item.code" class="question-style"
                  >{{ item.code }}:</el-radio
                >
                <el-input
                  v-model="item.title"
                  style="width: 270px; margin-left: -20px"
                ></el-input>
                <el-upload
                  class="avatar-uploader"
                  action="#"
                  :show-file-list="false"
                  :http-request="onRequest"
                  :before-upload="beforeUpload"
                  @click.native="imgIndex = index"
                >
                  <img v-if="item.img" :src="item.img" class="avatar" />
                  <p v-else>上传图片</p>
                  <i
                    class="el-icon-circle-close"
                    @click="removeImg(index, $event)"
                  ></i>
                </el-upload>
              </div>
            </el-radio-group>
            <!-- 单选 -->
            <!-- 复选 -->
            <el-checkbox-group
              v-model="checkboxList"
              v-if="form.questionType === 2"
              @change="checked"
            >
              <div
                v-for="(item, index) in form.options"
                :key="index"
                class="question-style"
              >
                <el-checkbox class="question-style" :label="item.code"
                  >{{ item.code }}:
                </el-checkbox>
                <el-input
                  style="width: 270px; margin-left: 10px"
                  v-model="item.title"
                ></el-input>
                <el-upload
                  class="avatar-uploader"
                  action="#"
                  :show-file-list="false"
                  :http-request="onRequest"
                  :before-upload="beforeUpload"
                  @click.native="imgIndex = index"
                >
                  <img v-if="item.img" :src="item.img" class="avatar" />
                  <p v-else>上传图片</p>
                  <i class="el-icon-circle-close" @click="removeImg(index)"></i>
                </el-upload>
              </div>
            </el-checkbox-group>
            <!-- 复选 -->
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger"
              size="small"
              :disabled="form.questionType !== 2"
              @click="addCheckbox"
              >+增加选项与答案</el-button
            >
          </el-form-item>
          <el-form-item label="解析视频：">
            <el-input v-model="form.videoURL" class="input"></el-input>
          </el-form-item>
          <el-form-item label="答案解析：" prop="answer">
            <MyQuillEditor
              v-model="form.answer"
              :editorIndex="2"
              ref="editorSecond"
            ></MyQuillEditor>
          </el-form-item>
          <el-form-item label="题目备注：" prop="remarks">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="form.remarks"
              class="input"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="试题标签：" prop="tags">
            <el-select
              v-model="form.tags"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择试题标签"
              class="input"
            >
              <el-option
                v-for="item in tagsList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="update" v-if="this.queryId"
              >确认修改</el-button
            >
            <el-button type="primary" @click="submit" v-else
              >确认提交</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { difficulty, questionType, direction } from "@/api/hmmm/constants";
import { simple as subjectListApi } from "@/api/hmmm/subjects";
import { simple as catalogListApi } from "@/api/hmmm/directorys";
import { list as companyListApi } from "@/api/hmmm/companys";
import { citys, provinces } from "@/api/hmmm/citys.js";
import { add, detail, update } from "@/api/hmmm/questions";
import { simple as getTagsListApi } from "@/api/hmmm/tags";
import MyQuillEditor from "../components/jxyComponents/QuillEditor.vue";
import COS from "cos-js-sdk-v5";
var cos = new COS({
  SecretId: "AKIDl03tVt3ygAPO8dsseARTGo69xWqujJel",
  SecretKey: "uYx53oLceRzINCn9F6j7G9nIciZBYgbJ",
});
// const provinceTowVal = (rules, value, callback) => {
//   if (!!!value.length) {
//     callback(new Error("请选择地区"));
//   } else if (!!!this.form.province.length || !!!this.form.city.length) {
//     callback(new Error());
//   } else {
//     callback();
//   }
// };
export default {
  components: {
    MyQuillEditor,
  },
  data() {
    return {
      difficulty, //难度列表
      questionType, //题型列表
      direction, //方向列表
      subjectList: [], //学科列表
      catalogList: [], //目录列表
      companyList: [], //公司列表
      citySelect: {
        provincesList: provinces(),
        citysList: [],
      }, //城市列表数据
      tagsList: [],
      fileList: [],
      loading: false,
      radioList: [], //单选
      checkboxList: [], //多选
      form: {
        subjectID: "", //学科
        catalogID: "", //目录
        enterpriseID: "", //企业
        province: "", //城市
        city: "", //区县
        direction: "", //方向
        questionType: 1, //题型
        difficulty: 1, //难度
        question: "", //题干
        options: [
          {
            code: "A", //选项
            img: "", //图片链接
            isRight: false, //答案是否正确
            title: "", //选项内容
          },
          {
            code: "B", //选项
            img: "", //图片链接
            isRight: false, //答案是否正确
            title: "", //选项内容
          },
          {
            code: "C", //选项
            img: "", //图片链接
            isRight: false, //答案是否正确
            title: "", //选项内容
          },
          {
            code: "D", //选项
            img: "", //图片链接
            isRight: false, //答案是否正确
            title: "", //选项内容
          },
        ], //选项
        videoURL: "", //解析视频
        answer: "", //答案解析
        remarks: "", //题目备注
        tags: [], //标签
        imgIndex: "", //上传图片的索引号
      },
      rules: {
        subjectID: [
          { required: true, message: "请选择学科", trigger: "change" },
        ],
        catalogID: [
          { required: true, message: "请选择目录", trigger: "change" },
        ],
        enterpriseID: [
          { required: true, message: "请选择企业", trigger: "change" },
        ],
        city: [
          {
            required: true,
            message: "请选择地区",
            trigger: "change",
          },
        ],
        direction: [
          { required: true, message: "请选择方向", trigger: "change" },
        ],
        question: [{ required: true, message: "请输入题干", trigger: "blur" }],
        answer: [
          { required: true, message: "请输入答案解析", trigger: "blur" },
        ],
        remarks: [
          { required: true, message: "请输入题目备注", trigger: "blur" },
        ],
        tags: [{ required: true, message: "请选择试题", trigger: "change" }],
      },
      imgIndex: "",
      queryId: "",
      imgFlag: true,
    };
  },
  created() {
    //判断页面修改或新增
    this.queryId = this.$route.query.id;
    if (this.queryId) {
      this.getDetails();
    }
    //获取学科列表
    this.subjectListApi();
    //获取公司列表
    this.companyListApi();
  },
  methods: {
    onRequest({ file }) {
      cos.putObject(
        {
          Bucket: "jxy-1313341680" /* 必须 */,
          Region: "ap-shanghai" /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: "STANDARD",
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData));
          },
        },
        (err, data) => {
          if (err || data.statusCode != 200) {
            return this.$message.error("上传失败，请重试");
          }

          this.form.options[this.imgIndex].img = "http://" + data.Location;
          console.log("up", this.form.options[this.imgIndex].img);
          this.imgFlag = true;
        }
      );
    },
    beforeUpload(file) {
      const type = ["image/jpeg", "image/gif", "image/bmp"];
      if (!type.includes(file.type)) {
        this.$message.error("请选择" + type.join("、") + "后缀图片");
        return false;
      }
      const maxSize = 2 * 1024 * 1024;
      if (maxSize > file.maxSize) {
        this.$message.error("图片不能超出2MB");
        return false;
      }
    },
    //点击关闭小图标清除图片
    removeImg(index, e) {
      e.stopPropagation();
      this.form.options[index].img = "";
    },
    //获取学科列表
    async subjectListApi() {
      try {
        const res = await subjectListApi();
        this.subjectList = res.data;
      } catch (error) {}
    },
    //获取目录列表
    async catalogListApi() {
      try {
        const res = await catalogListApi({ subjectID: this.form.subjectID });
        this.catalogList = res.data;
        if (this.form.catalogID) {
          this.form.catalogID = "";
        }
      } catch (error) {}
    },
    //获取标签列表
    async getTagsListApi() {
      try {
        const res = await getTagsListApi({ subjectID: this.form.subjectID });
        this.tagsList = res.data;
      } catch (error) {}
    },
    //当学科状态改变
    async subjectChange() {
      await this.catalogListApi();
      await this.getTagsListApi();
    },
    //获取公司列表
    async companyListApi() {
      try {
        const res = await companyListApi({ pagesize: 10000 });
        this.companyList = res.data.items;
      } catch (error) {}
    },
    //二级城市列表
    handleProvince(e) {
      if (this.form.city) {
        this.form.city = null;
      }
      this.citySelect.citysList = citys(e);
      this.formData.city = this.citySelect.cityDate[0];
    },
    //单选框状态数据
    radioChange(label) {
      console.log(label);
      this.form.options.forEach((item) => {
        if (item.code === label) {
          item.isRight = true;
        } else {
          item.isRight = false;
        }
      });
    },
    //多选框状态改变时
    checked(label) {
      this.form.options.forEach((item) => {
        item.isRight = false;
      });
      label.forEach((lab) => {
        this.form.options.find((item) => item.code === lab).isRight = true;
      });
    },
    //增加多选题选项
    addCheckbox() {
      const index = this.form.options.length;
      this.form.options.push({
        code: String.fromCharCode(65 + index), //选项
        img: "", //图片链接
        isRight: false, //答案是否正确
        title: "", //选项内容
      });
    },
    //切换回单选时恢复默认选项
    defaultQusetion() {
      if (this.form.questionType !== 2) {
        this.form.options = [
          {
            code: "A", //选项
            img: "", //图片链接
            isRight: false, //答案是否正确
            title: "", //选项内容
          },
          {
            code: "B", //选项
            img: "", //图片链接
            isRight: false, //答案是否正确
            title: "", //选项内容
          },
          {
            code: "C", //选项
            img: "", //图片链接
            isRight: false, //答案是否正确
            title: "", //选项内容
          },
          {
            code: "D", //选项
            img: "", //图片链接
            isRight: false, //答案是否正确
            title: "", //选项内容
          },
        ];
      }
    },
    //回显
    async getDetails() {
      const { data } = await detail({ id: this.queryId });
      this.form = {
        subjectID: data.subjectID, //学科
        catalogID: data.catalogID, //目录
        enterpriseID: data.enterpriseID, //企业
        province: data.province, //城市
        city: data.city, //区县
        direction: data.direction, //方向
        questionType: parseInt(data.questionType), //题型
        difficulty: parseInt(data.difficulty), //难度
        question: data.question, //题干
        options: data.options,
        videoURL: data.videoURL, //解析视频
        answer: data.answer, //答案解析
        remarks: data.remarks, //题目备注
        tags: data.tags.split(","), //标签
      };
      const res1 = await catalogListApi({ subjectID: this.form.subjectID });
      this.catalogList = res1.data;
      const res2 = await getTagsListApi({ subjectID: this.form.subjectID });
      this.tagsList = res2.data;
      this.$refs.editorFirst.content = data.question;
      this.$refs.editorSecond.concat = data.answer;
    },
    //添加题目
    async submit() {
      try {
        this.$refs.form.validate();
        console.log(add);
        this.form.difficulty = String(this.form.difficulty);
        this.form.questionType = String(this.form.questionType);
        this.form.tags = this.form.tags.join(",");
        await add(this.form);
        this.$message.success("添加成功");
        this.form = {
          subjectID: "", //学科
          catalogID: "", //目录
          enterpriseID: "", //企业
          province: "", //城市
          city: "", //区县
          direction: "", //方向
          questionType: 1, //题型
          difficulty: 1, //难度
          question: "", //题干
          options: [
            {
              code: "A", //选项
              img: "", //图片链接
              isRight: false, //答案是否正确
              title: "", //选项内容
            },
            {
              code: "B", //选项
              img: "", //图片链接
              isRight: false, //答案是否正确
              title: "", //选项内容
            },
            {
              code: "C", //选项
              img: "", //图片链接
              isRight: false, //答案是否正确
              title: "", //选项内容
            },
            {
              code: "D", //选项
              img: "", //图片链接
              isRight: false, //答案是否正确
              title: "", //选项内容
            },
          ], //选项
          videoURL: "", //解析视频
          answer: "", //答案解析
          remarks: "", //题目备注
          tags: [], //标签
        };
        //清除两个富文本编辑器的内容
        this.$refs.editorFirst.deleteText();
        this.$refs.editorSecond.deleteText();
        //清除规则
        this.$refs.form.resetFields();
        this.$router.go(-1);
      } catch (error) {}
    },
    async update() {
      try {
        this.$refs.form.validate();
        this.form.difficulty = String(this.form.difficulty);
        this.form.questionType = String(this.form.questionType);
        this.form.tags = this.form.tags.join(",");
        this.form.id = this.queryId;
        await update(this.form);
        this.form = {
          subjectID: "", //学科
          catalogID: "", //目录
          enterpriseID: "", //企业
          province: "", //城市
          city: "", //区县
          direction: "", //方向
          questionType: 1, //题型
          difficulty: 1, //难度
          question: "", //题干
          options: [
            {
              code: "A", //选项
              img: "", //图片链接
              isRight: false, //答案是否正确
              title: "", //选项内容
            },
            {
              code: "B", //选项
              img: "", //图片链接
              isRight: false, //答案是否正确
              title: "", //选项内容
            },
            {
              code: "C", //选项
              img: "", //图片链接
              isRight: false, //答案是否正确
              title: "", //选项内容
            },
            {
              code: "D", //选项
              img: "", //图片链接
              isRight: false, //答案是否正确
              title: "", //选项内容
            },
          ], //选项
          videoURL: "", //解析视频
          answer: "", //答案解析
          remarks: "", //题目备注
          tags: [], //标签
        };
        //清除两个富文本编辑器的内容
        this.$refs.editorFirst.deleteText();
        this.$refs.editorSecond.deleteText();
        //清除规则
        this.$refs.form.resetFields();
        this.$message.success("修改成功");
        this.$router.go(-1);
      } catch (error) {}
    },
  },
};
</script>

<style scoped lang="scss">
.question-container {
  padding: 0 10px;
  margin: 10px 0;
  ::v-deep .input {
    width: 400px;
  }
}
.question-style {
  display: flex;
  align-items: center;
  height: 80px;
}
//图片上传区域样式
::v-deep .avatar-uploader .el-upload {
  display: inline-block;
  width: 100px;
  height: 60px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  margin-left: 4px;
}
.avatar-uploader {
  width: 100px;
  height: 60px;
  img {
    width: 100%;
    height: 100%;
  }
  p {
    margin: 0;
    height: 59px;
    line-height: 59px;
    font-size: 14px;
  }
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
::v-deep .ql-editor {
  height: 200px;
}
.el-icon-circle-close {
  position: absolute;
  top: -9px;
  right: -9px;
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
  font-size: 18px;
  color: #999;
  cursor: pointer;
}
::v-deep .province .el-form-item {
  display: inline-block;
}
</style>
