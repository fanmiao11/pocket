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
      title="订单详情"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 出货状态 -->
      <div class="task-status">
        <!-- title A-->
        <!--  出货成功 -->
        <template v-if="currentDetail.status === '出货成功'">
          <img src="../../assets/下载 (2).png" style="margin: 0 16px 0 22px" />
          <span>{{ currentDetail.status }}</span>
          <img src="../../assets/pic_4.3b5af41c.png" class="pic" />
        </template>
        <!--  支付完成 -->
        <template v-else-if="currentDetail.status === '支付完成'">
          <img src="../../assets/下载 (3).png" style="margin: 0 16px 0 22px" />
          <span>{{ currentDetail.status }}</span>
          <img src="../../assets/pic_1.834b274c.png" class="pic" />
        </template>
        <!--  创建和出货失败 -->
        <template v-else>
          <img src="../../assets/下载 (1).png" style="margin: 0 16px 0 22px" />
          <span>{{ currentDetail.status }}</span>
          <img src="../../assets/pic_3.e8208e34.png" class="pic" />
        </template>
        <!-- title S-->
      </div>
      <!-- 数据 -->
      <el-form class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单编号:">
              <span>{{ currentDetail.orderNo }}</span>
            </el-form-item>

            <el-form-item label="设备编号:">
              <span>{{ currentDetail.innerCode }}</span>
            </el-form-item>

            <el-form-item label="完成时间:">
              <span>{{ currentDetail.updateTime }}</span>
            </el-form-item>
            <el-form-item label="设备地址:">
              <span>{{ currentDetail.addr }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="商品名称:">
              <span>{{ currentDetail.skuName }}</span>
            </el-form-item>
            <el-form-item label="订单金额:">
              <span>{{ currentDetail.price }}</span>
            </el-form-item>
            <el-form-item label="创建时间:">
              <span>{{ currentDetail.createTime }}</span>
            </el-form-item>
            <el-form-item label="支付方式:">
              <span>{{
                { 1: "支付宝支付", 2: "微信支付" }[currentDetail.payType]
              }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
      currentDetail: {},
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
    operationBtn(row) {
      console.log(row);
      this.dialogVisible = true;
      this.currentDetail = row;
    },
    handleClose(done) {
      done();
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

<style lang="scss">
.task-status {
  display: flex;
  align-items: center;
  height: 54px;
  margin-bottom: 25px;
  background-color: hsla(0, 0%, 92.5%, 0.39);
  .pic {
    margin-right: 76px;
    margin-bottom: 7px;
  }
  span {
    flex: 1;
  }
}
</style>
