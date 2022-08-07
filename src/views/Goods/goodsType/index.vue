<template>
  <!-- 商品类型 -->
  <div class="app-main">
    <my-search nameOne="商品类型搜索" @search="searchBtn"> </my-search>
    <result-list
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
    ></result-list>
    <!-- 新建 -->
    <my-dialog
      dialogTitle="新增商品类型"
      :dialogVisible="addOpreation"
      @close="addOpreation = false"
    >
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="商品类型名称：" prop="className">
          <el-input
            type="text"
            v-model="formData.className"
            placeholder="请输入"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancleFn">取消</el-button>
          <el-button @click="saveFn">确认</el-button>
        </el-form-item>
      </el-form>
    </my-dialog>
    <!-- 修改 -->
    <my-dialog
      dialogTitle="修改商品类型"
      :dialogVisible="editOpreation"
      @close="editOpreation = false"
    >
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="商品类型名称：" prop="className">
          <el-input
            type="text"
            v-model="formData.className"
            placeholder="请输入"
            maxlength="10"
            show-word-limit
          ></el-input>
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
  addskuClass,
  editskuClass,
  delskuClass,
} from "@/api/goods";
export default {
    components: {
    MySearch,
    ResultList,
    MyDialog,
  },
  data() {
    const validatetype = async (rule, value, callback) => {
      let isRepeat = false;
      const res = await getskuClass({ className: value });

      if (this.addOpreation) {
        // 新增判断
        if (res.totalCount !== "0") {
          isRepeat = true;
        }
      } else if (this.editOpreation) {
        // 编辑判断
        if (res.totalCount === "0") {
          isRepeat = false;
        } else {
          isRepeat = res.currentPageRecords
            ?.filter((item) => item.classId !== this.formData.classId)
            .some((item) => item.className === value);
          // console.log(isRepeat);
        }
      }
      if (isRepeat) {
        callback(new Error("名称重复"));
      } else {
        callback();
      }
    };
    return {
      tableArr: [{ prop: "className", label: "商品类型名称" }],
      operationArr: {
        opeWidth: "200",
        ope: [
          // 操作
          { title: "修改", color: false },
          { title: "删除", color: true },
        ],
      },
      tableData: [],
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      addOpreation: false,
      editOpreation: false,
      formData: {
        className: "",
        classId: "",
      },
      rules: {
        className: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatetype, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getskuClass();
  },
  methods: {
    // 搜索
    searchBtn(val) {
      this.getskuClass({
        className: val,
      });
    },
    // 点击新建
    clickAddBtn() {
      this.addOpreation = true;
      // console.log(this.addOpreation);
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
        className: "",
      };
    },
    // 确定按钮
    saveFn() {
      // console.log(this.formData);
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.addOpreation) {
            // 添加商品类型
            await addskuClass(this.formData.className);
            this.getskuClass();
            this.addOpreation = false;
          } else if (this.editOpreation) {
            // 修改商品类型
            await editskuClass(this.formData);
            this.getskuClass();
            this.editOpreation = false;
          }
          this.formData = {
            className: "",
          };
        } else {
          console.log("操作失败");
          return false;
        }
      });
    },
    // 获取商品类型数据
    async getskuClass(params) {
      const res = await getskuClass(params);
      // console.log(res);
      this.pageIndex = res.pageIndex;
      this.totalPage = res.totalPage;
      this.totalCount = res.totalCount;
      this.tableData = res.currentPageRecords;
      // 添加序号类数据
      this.tableData.forEach(
        (item, index) =>
          (item.itemIndex = (this.pageIndex - 1) * 10 + index + 1)
      );
    },
    // 操作
    operationBtn(row, val) {
      console.log(row);
      if (val === "修改") {
        // console.log("修改");
        this.editOpreation = true;
        this.formData.className = row.className;
        this.formData.classId = row.classId;
      } else if (val === "删除") {
        // console.log("删除");
        this.$confirm("此操作将永久删除该商品类型, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        })
          .then(async () => {
            await delskuClass(row.classId);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getskuClass();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    // 点击上一页
    upPage() {
      this.getskuClass({
        pageIndex: --this.pageIndex,
        pageSize: 10,
      });
    },
    // 点击下一页
    nextPage() {
      this.getskuClass({
        pageIndex: ++this.pageIndex,
        pageSize: 10,
      });
    },
  },

};
</script>

<style></style>
