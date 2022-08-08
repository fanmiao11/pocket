<template>
  <div class="app-main">
    <!-- 搜索 -->
    <my-search nameOne="商品类型搜索" @search="searchBtn"> </my-search>
    <!-- table -->
    <result-list
      :isShowSecondBtn="true"
      secondBtnContent="导入数据"
      :tableArr="tableArr"
      :operation="operationArr"
      :tableData="tableData"
      :totalPage="totalPage"
      :totalCount="totalCount"
      :pageIndex="pageIndex"
      @upPage="upPage"
      @nextPage="nextPage"
      @operationBtn="operationBtn"
      @clickAddBtn="clickAddBtn"
      @clickSecondBtn="clickSecondBtn"
      class="result"
    >
    </result-list>
    <!-- 新建 -->
    <my-dialog
      dialogTitle="新增商品"
      :dialogVisible="addOpreation"
      @close="addOpreation = false"
    >
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="商品名称：" prop="skuName">
          <el-input
            type="text"
            v-model="formData.skuName"
            placeholder="请输入"
            maxlength="15"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌：" prop="brandName">
          <el-input
            type="text"
            v-model="formData.brandName"
            placeholder="请输入"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商品价格(元)：" prop="price">
          <el-input-number
            :style="{ width: '100%' }"
            v-model="formData.price"
            controls-position="right"
            :min="0.5"
            :step="0.5"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="商品类型：" prop="className">
          <el-select
            :style="{ width: '100%' }"
            v-model="formData.classId"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in skuClass"
              :key="item"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格：" prop="unit">
          <el-input
            type="text"
            v-model="formData.unit"
            placeholder="请输入"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商品图片：" prop="skuImage">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :http-request="httpRequest"
          >
            <img
              v-if="formData.skuImage"
              :src="formData.skuImage"
              class="avatar"
            />
            <i v-else class="avatar-uploader-icon">
              <svg-icon icon-class="upload" />
            </i>
            <div slot="tip" class="el-upload__tip">
              支持扩展名：jpg、png，文件不得大于100kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancleFn">取消</el-button>
          <el-button @click="saveFn">确认</el-button>
        </el-form-item>
      </el-form>
    </my-dialog>
    <!-- 导入数据 -->
    <my-dialog
      dialogTitle="数据导入"
      :dialogVisible="importOpreation"
      @close="importOpreation = false"
    >
      <el-form>
        <el-upload
          ref="fileImport"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="handlefileSuccess"
          :http-request="fileHttpRequest"
          :auto-upload="false"
          :limit="1"
        >
          <el-button>上传文件</el-button>
          <div slot="tip" class="el-upload__tip">
            支持扩展名：xls、xlsx，文件不得大于1M
          </div>
        </el-upload>
        <el-form-item>
          <el-button @click="cancelImportFn">取消</el-button>
          <el-button @click="saveImportFn">确认</el-button>
        </el-form-item>
      </el-form>
    </my-dialog>
    <!-- 修改 -->
    <my-dialog
      dialogTitle="修改商品"
      :dialogVisible="editOpreation"
      @close="editOpreation = false"
    >
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="商品名称：" prop="skuName">
          <el-input
            type="text"
            v-model="formData.skuName"
            placeholder="请输入"
            maxlength="15"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌：" prop="brandName">
          <el-input
            type="text"
            v-model="formData.brandName"
            placeholder="请输入"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商品价格(元)：" prop="price">
          <el-input-number
            :style="{ width: '100%' }"
            v-model="formData.price"
            controls-position="right"
            :min="0"
            :step="0.5"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="商品类型：">
          <el-select
            :style="{ width: '100%' }"
            v-model="formData.classId"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in skuClass"
              :key="item"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格：" prop="unit">
          <el-input
            type="text"
            v-model="formData.unit"
            placeholder="请输入"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商品图片：" prop="skuImage">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :http-request="httpRequest"
          >
            <img
              v-if="formData.skuImage"
              :src="formData.skuImage"
              class="avatar"
            />
            <i v-else class="avatar-uploader-icon">
              <svg-icon icon-class="upload" />
            </i>
            <div slot="tip" class="el-upload__tip">
              支持扩展名：jpg、png，文件不得大于100kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancleFn">取消</el-button>
          <el-button @click="saveFn">确认</el-button>
        </el-form-item>
      </el-form>
    </my-dialog>
  </div>
</template>

<script>
import MySearch from "@/components/Search.vue";
import ResultList from "@/components/ResultList.vue";
import MyDialog from "@/components/Dialog.vue";
import {
  getskuClass,
  getskus,
  fileupload,
  addskus,
  editskus,
  importskus,
} from "@/api/goods";

export default {
  data() {
    const validatetype = async (rule, value, callback) => {
      callback();
    };
    return {
      searchText: "",
      tableArr: [
        { prop: "skuName", label: "商品名称" },
        { prop: "skuImage", label: "商品图片" },
        { prop: "brandName", label: "品牌" },
        { prop: "unit", label: "规格" },
        { prop: "price", label: "商品价格" },
        { prop: "className", label: "商品类型" },
        { prop: "createTime", label: "创建日期" },
      ],
      operationArr: {
        opeWidth: "100",
        ope: [
          // 操作
          { title: "修改", color: false },
        ],
      },
      tableData: [],
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      addOpreation: false,
      editOpreation: false,
      importOpreation: false,
      formData: {
        skuName: "",
        brandName: "",
        price: undefined,
        classId: "",
        unit: "",
        skuImage: "",
        skuId: "",
      },
      rules: {
        skuName: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatetype, trigger: "blur" },
        ],
        brandName: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatetype, trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatetype, trigger: "blur" },
        ],
        classId: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatetype, trigger: "blur" },
        ],
        unit: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatetype, trigger: "blur" },
        ],
        skuImage: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatetype, trigger: "blur" },
        ],
      },
      skuClass: {},
      imageUrl: "",
    };
  },
  components: {
    MySearch,
    ResultList,
    MyDialog,
  },
  async created() {
    await this.getskuClass();
    await this.getskus();
  },
  methods: {
    // 获取商品类型
    async getskuClass() {
      // 第一次请求 获取到所有商品类型的总数
      const { totalCount } = await getskuClass();
      // 第二次请求根据第一次请求回来的数据 获取所有的商品类型
      const { currentPageRecords } = await getskuClass({
        pageSize: totalCount,
      });
      // 通过循环每一条数据 把classId和className以键值对的方式存进skuClass对象
      currentPageRecords.forEach((item) => {
        this.skuClass[item.classId] = item.className;
      });
    },
    // 获取商品数据
    async getskus(params) {
      const res = await getskus(params);
      // console.log(res);
      this.pageIndex = res.pageIndex;
      this.totalCount = res.totalCount;
      this.totalPage = res.totalPage;
      this.tableData = res.currentPageRecords;
      this.tableData.forEach(
        (item, index) =>
          (item.itemIndex = (this.pageIndex - 1) * 10 + index + 1)
      );
      // 处理商品类型数据 根据id拿到对应类型 存进tableData数组的每一条对应数据里
      this.tableData.forEach((item) => {
        item.className = this.skuClass[item.classId];
      });
      // console.log(this.tableData);
    },

    // 搜索
    searchBtn(val) {
      // console.log("搜索");
      this.searchText = val;
      this.getskus({
        skuName: val,
      });
    },
    // 点击新建
    clickAddBtn() {
      this.addOpreation = true;
      // console.log(this.addOpreation);
    },
    // 导入数据
    clickSecondBtn() {
      this.importOpreation = true;
      // console.log("导入数据");
    },
    // 取消按钮
    cancleFn() {
      if (this.addOpreation) {
        this.addOpreation = false;
      } else if (this.editOpreation) {
        this.editOpreation = false;
      }
      // 重置校验规则和表单数据
      this.$refs.form.resetFields();
      this.formData = {
        skuName: "",
        brandName: "",
        price: "",
        classId: "",
        unit: "",
        skuImage: "",
        skuId: "",
      };
    },
    // 确定按钮
    saveFn() {
      console.log(this.formData);
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.addOpreation) {
            // 添加商品
            const res = await addskus({
              skuName: this.formData.skuName,
              skuImage: this.formData.skuImage,
              price: this.formData.price * 100,
              classId: this.formData.classId,
              unit: this.formData.unit,
              brandName: this.formData.brandName,
            });
            // console.log(res);
            this.$message.success("添加成功");
            this.getskus();
            this.addOpreation = false;
          } else if (this.editOpreation) {
            // 修改商品
            const res = await editskus({
              skuName: this.formData.skuName,
              skuImage: this.formData.skuImage,
              price: this.formData.price * 100,
              classId: this.formData.classId,
              unit: this.formData.unit,
              brandName: this.formData.brandName,
              skuId: this.formData.skuId,
            });
            // console.log(res);
            this.getskus();
            //       this.getskuClass();
            this.editOpreation = false;
          }
          this.formData = {
            skuName: "",
            brandName: "",
            price: "",
            classId: "",
            unit: "",
            skuImage: "",
          };
        } else {
          console.log("操作失败");
          return false;
        }
      });
    },
    // 操作
    operationBtn(row, val) {
      if (val === "修改") {
        // console.log(row.className);
        this.editOpreation = true;
        this.formData.skuName = row.skuName;
        this.formData.brandName = row.brandName;
        this.formData.price = row.price / 100;
        this.formData.classId = row.classId;
        this.formData.className = row.className;
        this.formData.unit = row.unit;
        this.formData.skuImage = row.skuImage;
        this.formData.skuId = row.skuId;
      }
    },
    // 点击上一页
    async upPage() {
      await this.getskus({
        skuName: this.searchText,
        pageIndex: --this.pageIndex,
      });
    },
    // 点击下一页
    nextPage() {
      this.getskus({
        skuName: this.searchText,
        pageIndex: ++this.pageIndex,
      });
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.formData.skuImage = URL.createObjectURL(file.raw);
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    //实现图片上传功能
    async httpRequest(item) {
      //验证图片格式大小信息
      const isJPG =
        item.file.type == "image/jpeg" || item.file.type == "image/png";
      const isLt2M = item.file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      //图片格式大小信息没问题 执行上传图片的方法
      if (isJPG && isLt2M == true) {
        //定义FormData对象 存储文件
        let mf = new FormData();
        //将图片文件放入mf
        mf.append("fileName", item.file);
        this.formData.skuImage = await fileupload(mf);
        console.log(this.formData.skuImage);
      }
    },
    // 上传文件
    handlefileSuccess() {
      this.importOpreation = false;
    },
    async fileHttpRequest(item) {
      const extension = item.file.name.substring(
        item.file.name.lastIndexOf(".") + 1
      );
      const isLt1M = item.file.size / 1024 / 1024 < 1;
      const isxls = extension === "xls" || extension === "xlsx";
      if (!isxls) {
        this.$message.warning("只能上传excel的文件");
      } else if (!isLt1M) {
        this.$message.warning("文件大小不得超过1M");
      }
      // 格式大小信息没问题 执行上传文件
      if (isLt1M && isxls) {
        //定义FormData对象 存储文件
        let mf = new FormData();
        //将文件放入mf
        mf.append("fileName", item.file);
        const res = await importskus(mf);
      }
    },
    cancelImportFn() {
      this.importOpreation = false;
    },
    saveImportFn() {
      // 手动上传文件
      this.$refs.fileImport.submit();
      // this.importOpreation = false;
    },
  },
};
</script>

<style lang="scss">
.app-main {
  .result img {
    display: block;
    width: 24px;
    height: 24px;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 50%;
    background: #f3f6fb;
    border: 1px solid #f3f6fb;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 76px;
  height: 76px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 16px;
  color: #8c939d;
  width: 76px;
  height: 76px;
  line-height: 76px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 76px;
  height: 76px;
  display: block;
  object-fit: contain;
}
</style>
