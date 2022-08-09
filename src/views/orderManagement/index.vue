<template>
  <!-- 订单管理 -->
  <div class="app-main">
    <!-- 查询 -->
    <div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="订单编号：" v-model="formData">
          <el-input
            v-model="formData.orderNo"
            placeholder="请输入订单编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择日期：">
          <el-date-picker
            v-model="formData.dateArr"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :default-time="['00:00:00', '23:59:59']"
            :picker-options="pickerOptions"
          >
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchBtn"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- table -->
    <result-list
      :isShowBtn="false"
      :tableArr="tableArr"
      :operation="operationArr"
      :tableData="tableData"
      :totalPage="totalPage"
      :totalCount="totalCount"
      :pageIndex="pageIndex"
      @upPage="upPage"
      @nextPage="nextPage"
      @operationBtn="operationBtn"
      class="result"
    >
    </result-list>
    <!-- 查看详情 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
     <el-descriptions title="用户信息">
    <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
    <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
    <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
    <el-descriptions-item label="备注">
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
</el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import MySearch from "@/components/Search.vue";
import ResultList from "@/components/ResultList.vue";
import { getOrders } from "@/api/order";
import dayjs from "dayjs";
export default {
  data() {
    return {
      tableArr: [
        { prop: "orderNo", label: "订单编号" },
        { prop: "skuName", label: "商品名称" },
        { prop: "price", label: "订单金额(元)" },
        { prop: "innerCode", label: "设备编号" },
        { prop: "status", label: "订单状态" },
        { prop: "createTime", label: "订单日期" },
      ],
      operationArr: {
        opeWidth: "100",
        ope: [
          // 操作
          { title: "查看详情", color: false },
        ],
      },
      tableData: [],
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      formData: {
        orderNo: "",
        dateArr: [],
      },
      pickerOptions: {
        disabledDate(data) {
          return data > new Date();
        },
      },
      dialogVisible: false,
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    searchBtn() {
      this.getOrders({
        orderNo: this.formData.orderNo,
        startDate: this.formData.dateArr[0],
        endDate: this.formData.dateArr[1],
      });
    },
    operationBtn() {
      console.log(111111);
      this.dialogVisible = true;
    },
    handleClose(done) {
      done()
    },
    async getOrders(params) {
      const res = await getOrders(params);
      // console.log(res);
      this.tableData = res.currentPageRecords;
      this.pageIndex = res.pageIndex;
      this.totalPage = res.totalPage;
      this.totalCount = res.totalCount;
      this.tableData.forEach((item, index) => {
        item.itemIndex = (this.pageIndex - 1) * 10 + index + 1;
        item.createTime = dayjs(item.createTime).format("YYYY.MM.DD hh:mm:ss");
        item.price = item.price / 100;
        item.status = ["创建", "支付完成", "出货成功", "出货失败"][item.status];
      });
    },
    // 点击上一页
    async upPage() {
      await this.getOrders({
        orderNo: this.formData.orderNo,
        startDate: this.formData.dateArr[0],
        endDate: this.formData.dateArr[1],
        pageIndex: --this.pageIndex,
      });
    },
    // 点击下一页
    nextPage() {
      this.getOrders({
        orderNo: this.formData.orderNo,
        startDate: this.formData.dateArr[0],
        endDate: this.formData.dateArr[1],
        pageIndex: ++this.pageIndex,
      });
    },
  },
  computed: {
    // start() {
    //   return dayjs().startOf("month").format("YYYY-MM-DD");
    // },
    // end() {
    //   return dayjs(new Date()).format("YYYY-MM-DD");
    // },
  },
  components: {
    MySearch,
    ResultList,
  },
};
</script>

<style></style>
