<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-09 09:04:27
 * @LastEditors: sj
 * @LastEditTime: 2022-08-09 14:25:10
-->
<template>
  <!-- 策略管理 -->
  <div class="app-main">
    <!-- 搜索 -->
    <my-search nameOne="策略搜索" @search="searchBtn"> </my-search>
    <!-- table -->
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
      class="result"
    >
    </result-list>
    <!-- 新建 -->
    <my-dialog
      dialogTitle="新增商品类型"
      :dialogVisible="opreationVisible"
      @close="addOpreation = false"
    >
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="商品类型名称：" prop="policyName">
          <el-input
            type="text"
            v-model="formData.policyName"
            placeholder="请输入"
            maxlength="15"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="策略方案：" prop="discount">
          <el-input-number
            :style="{ width: '100%' }"
            v-model="formData.discount"
            controls-position="right"
            :min="0"
            :max="100"
            :step="1"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancleFn">取消</el-button>
          <el-button @click="saveFn">确认</el-button>
        </el-form-item>
      </el-form>
    </my-dialog>
    <!-- 策略详情 -->
    <el-dialog
      title="策略详情"
      :visible.sync="detailVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="策略名称:"
          ><span>{{ currentRow.policyName }}</span></el-form-item
        >

        <el-form-item label="策略方案:">
          <el-table
            :data="details"
            stripe
            style="width: 100%"
            empty-text="暂无数据"
          >
            <el-table-column prop="itemIndex" width="80" label="序号">
            </el-table-column>
            <el-table-column prop="nodeName" label="点位名称" width="180">
            </el-table-column>
            <el-table-column prop="innerCode" label="设备编号">
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <my-pagination
            :totalCount="vmtotalCount"
            :totalPage="vmtotalPage"
            :pageIndex="vmpageIndex"
            @upPage="upPage"
            @nextPage="nextPage"
          ></my-pagination>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTacticalList,
  addpolicy,
  editpolicy,
  delpolicy,
  getvmlist,
} from "@/api/tactical";
import MySearch from "@/components/Search.vue";
import ResultList from "@/components/ResultList.vue";
import MyDialog from "@/components/Dialog.vue";
import MyPagination from "@/components/Pagination.vue";

export default {
  data() {
    const validatetype = async (rule, value, callback) => {
      callback();
    };
    return {
      tableArr: [
        { prop: "policyName", label: "策略名称" },
        { prop: "discount", label: "策略方案" },
        { prop: "createTime", label: "创建日期" },
      ],
      operationArr: {
        opeWidth: "200",
        ope: [
          // 操作
          { title: "查看详情", color: false },
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
      detailVisible: false,
      formData: {
        policyName: "",
        discount: undefined,
        policyId: "",
      },
      rules: {
        policyName: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatetype, trigger: "blur" },
        ],
        discount: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatetype, trigger: "blur" },
        ],
      },
      currentRow: {},
      details: [],
      vmpageIndex: "",
      vmtotalPage: "",
      vmtotalCount: "",
    };
  },
  created() {
    this.getTacticalList();
  },
  computed: {
    opreationVisible() {
      return this.addOpreation || this.editOpreation;
    },
  },
  methods: {
    // 搜索按钮
    searchBtn(val) {
      this.formData.policyName = val;
      this.getTacticalList(this.formData);
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
        policyName: "",
        discount: undefined,
        policyId: "",
      };
    },
    // 确定按钮
    saveFn() {
      // console.log(this.formData);
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.addOpreation) {
            // 添加策略
            const res = await addpolicy(this.formData);
            // console.log(res);
            this.getTacticalList();
            this.addOpreation = false;
            // console.log("添加");
          } else if (this.editOpreation) {
            // 修改策略
            await editpolicy(this.formData);
            this.getTacticalList();
            this.editOpreation = false;
            // console.log("修改");
          }
          this.formData = {
            policyName: "",
            discount: undefined,
            policyId: "",
          };
        } else {
          console.log("操作失败");
          return false;
        }
      });
    },
    handleClose(done) {
      done();
    },
    // 操作
    async operationBtn(row, val) {
      if (val === "查看详情") {
        console.log("查看详情");
        this.detailVisible = true;
        this.currentRow = row;
        // console.log(this.currentRow);
        const res = await getvmlist({
          policyId: row.policyId,
        });
        // console.log(res);
        this.details = res.currentPageRecords;
        this.vmpageIndex = res.pageIndex;
        this.vmtotalPage = res.totalPage;
        this.vmtotalCount = res.totalCount;
        this.details.forEach((item, index) => {
          item.itemIndex = (this.vmpageIndex - 1) * 10 + index + 1;
        });
      } else if (val === "修改") {
        console.log("修改");
        this.editOpreation = true;
        this.formData.policyName = row.policyName;
        this.formData.discount = row.discount;
        this.formData.policyId = row.policyId;
      } else if (val === "删除") {
        console.log("删除");
        this.$confirm("此操作将永久删除该策略, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        })
          .then(async () => {
            await delpolicy({
              policyName: row.policyName,
              policyId: row.policyId,
            });
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getTacticalList();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    // 获取数据
    async getTacticalList(params) {
      const res = await getTacticalList(params);
      // console.log(res);
      this.tableData = res.currentPageRecords;
      this.pageIndex = res.pageIndex;
      this.totalPage = res.totalPage;
      this.totalCount = res.totalCount;
      this.tableData.forEach((item, index) => {
        item.itemIndex = (this.pageIndex - 1) * 10 + index + 1;
      });
    },
    // 点击上一页
    async upPage() {
      if (this.detailVisible) {
        const res = await getvmlist({
          policyId: this.currentRow.policyId,
          pageIndex: --this.vmpageIndex,
        });
        this.details = res.currentPageRecords;
        this.vmpageIndex = res.pageIndex;
        this.details.forEach((item, index) => {
          item.itemIndex = (this.vmpageIndex - 1) * 10 + index + 1;
        });
      } else {
        this.getskuClass({
          policyName: this.formData.policyName,
          pageIndex: --this.pageIndex,
          pageSize: 10,
        });
      }
    },
    // 点击下一页
    async nextPage() {
      if (this.detailVisible) {
        const res = await getvmlist({
          policyId: this.currentRow.policyId,
          pageIndex: ++this.vmpageIndex,
        });
        this.details = res.currentPageRecords;
        this.vmpageIndex = res.pageIndex;
        this.details.forEach((item, index) => {
          item.itemIndex = (this.vmpageIndex - 1) * 10 + index + 1;
        });
      } else {
        this.getTacticalList({
          policyName: this.formData.policyName,
          pageIndex: ++this.pageIndex,
          pageSize: 10,
        });
      }
    },
  },
  components: {
    MySearch,
    ResultList,
    MyDialog,
    MyPagination,
  },
};
</script>

<style></style>
