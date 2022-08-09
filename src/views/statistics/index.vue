<template>
  <!-- 对账统计 -->
  <div class="app-main">
    <!-- 统计栏 -->
    <div>
      <el-row class="statistics">
        <!-- 日销售统计 -->
        <el-col class="day">
          <div class="grid-content">
            日销售统计
            <div class="box">
              <el-col class="stats">
                <div class="item">
                  <div class="num">{{ dayOrderCount }}</div>
                  <div class="text">当日销售量（个）</div>
                </div>
              </el-col>
              <el-col class="stats">
                <div class="item">
                  <div class="num">{{ dayOrderAmount }}</div>
                  <div class="text">当前销售额（元）</div>
                </div>
              </el-col>
              <el-col class="stats">
                <div class="item">
                  <div class="num">{{ dayTotalBill }}</div>
                  <div class="text">当日分成（元）</div>
                </div>
              </el-col>
            </div>
          </div>
        </el-col>
        <!-- 月销售统计 -->
        <el-col class="month">
          <div class="grid-content">
            月销售统计
            <div class="box">
              <el-col class="stats">
                <div class="item">
                  <div class="num">{{ monthOrderCount }}</div>
                  <div class="text">当月销售量（个）</div>
                </div>
              </el-col>
              <el-col class="stats">
                <div class="item">
                  <div class="num">
                    {{ Number(monthOrderAmount / 10000).toFixed(2) }}
                  </div>
                  <div class="text">当月销售额（万元）</div>
                </div>
              </el-col>
              <el-col class="stats">
                <div class="item">
                  <div class="num">{{ monthTotalBill }}</div>
                  <div class="text">当月分成（元）</div>
                </div>
              </el-col>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 主体 -->
    <div class="app-container">
      <!-- 查询 -->
      <div>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="合作商：" v-model="formData">
            <el-select placeholder="请选择" v-model="formData.partnerId">
              <el-option
                v-for="item in partners"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期：">
            <el-date-picker
              v-model="formData.dateArr"
              type="daterange"
              range-separator="~"
              :start-placeholder="start"
              :end-placeholder="end"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
              :picker-options="pickerOptions"
            >
              >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 表头统计 -->
      <div class="report">
        <div>
          笔数统计：<span :style="{ color: 'red' }">{{ searchOrderCount }}</span
          >个
        </div>
        <div>
          收入统计：<span :style="{ color: 'red' }">{{
            searchOrderAmount
          }}</span
          >元
        </div>
        <div>
          分成统计：<span :style="{ color: 'red' }">{{ searchTotalBill }}</span
          >元
        </div>
      </div>
      <!-- 表格数据渲染 -->
      <div>
        <!-- table -->
        <result-list
          :isShowBtn="false"
          :isShowPagination="isShowPagination"
          :isShowOpe="false"
          :tableArr="tableArr"
          :tableData="tableData"
          class="result"
        >
        </result-list>
      </div>
    </div>
  </div>
</template>

<script>
import ResultList from "@/components/ResultList.vue";
import {
  getpartnercollect,
  gettotalBill,
  getorderAmount,
  getorderCount,
} from "@/api/report";
import { getPartnerApi } from "@/api/partner";

import dayjs from "dayjs";
export default {
  data() {
    return {
      // start: dayjs().startOf("month").format("YYYY-MM-DD"),
      // end: dayjs(new Date()).format("YYYY-MM-DD"),

      // dateArr: [this.start + "+00:00:00", this.end + "+23:59:59"],
      formData: {
        partnerId: "",
        dateArr: [],
      },
      pickerOptions: {
        disabledDate(data) {
          return data > new Date();
        },
      },
      tableArr: [
        { prop: "date", label: "订单日期" },
        { prop: "ownerName", label: "合作商" },
        { prop: "ratio", label: "分成比例" },
        { prop: "orderTotalMoney", label: "收入(元)" },
        { prop: "orderCount", label: "笔数" },
        { prop: "totalBill", label: "分成金额(元)" },
      ],
      tableData: [],
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      dayTotalBill: "",
      dayOrderAmount: "",
      dayOrderCount: "",
      monthTotalBill: "",
      monthOrderAmount: "",
      monthOrderCount: "",
      searchOrderCount: "",
      searchOrderAmount: "",
      searchTotalBill: "",
      partners: [], // 合作商
    };
  },
  computed: {
    start() {
      return dayjs().startOf("month").format("YYYY-MM-DD");
    },
    end() {
      return dayjs(new Date()).format("YYYY-MM-DD");
    },
    isShowPagination() {
      if (this.totalPage === "1" || this.totalPage === "0") {
        return false;
      } else {
        return true;
      }
    },
  },
  async created() {
    this.getpartnercollect({
      start: this.start,
      end: this.end,
    });
    // 日销售统计
    this.dayTotalBill =
      (await gettotalBill({
        start: this.end + " 00:00:00",
        end: this.end + " 23:00:00",
      })) / 100;
    // 日收入统计 （元）
    this.dayOrderAmount =
      (await getorderAmount({
        start: this.end + " 00:00:00",
        end: this.end + " 23:00:00",
      })) / 100;
    // 日销售量（个）
    this.dayOrderCount = await getorderCount({
      start: this.end + " 00:00:00",
      end: this.end + " 23:00:00",
    });
    // 月销售统计
    this.monthTotalBill =
      (await gettotalBill({
        start: this.start + " 00:00:00",
        end: this.end + " 23:00:00",
      })) / 100;
    // 月收入统计 （万元）
    this.monthOrderAmount =
      (await getorderAmount({
        start: this.start + " 00:00:00",
        end: this.end + " 23:00:00",
      })) / 100;
    // 月销售量（个）
    this.monthOrderCount = await getorderCount({
      start: this.start + " 00:00:00",
      end: this.end + " 23:00:00",
    });
    // 销售量（个）
    this.searchOrderCount = await getorderCount({
      partnerId: this.formData.partnerId,
      start: this.formData.dateArr[0] || this.start + " 00:00:00",
      end: this.formData.dateArr[1] || this.end + " 00:00:00",
    });
    // 收入统计 （万元）
    this.searchOrderAmount =
      (await getorderAmount({
        partnerId: this.formData.partnerId,
        start: this.formData.dateArr[0] || this.start + " 00:00:00",
        end: this.formData.dateArr[1] || this.end + " 00:00:00",
      })) / 100;
    // 销售统计
    this.searchTotalBill =
      (await gettotalBill({
        partnerId: this.formData.partnerId,
        start: this.formData.dateArr[0] || this.start + " 00:00:00",
        end: this.formData.dateArr[1] || this.end + " 00:00:00",
      })) / 100;

    this.getPartner();
  },
  methods: {
    async onSubmit() {
      let partnerName = "";
      // 根据选择的合作商id遍历出合作商name
      this.partners.forEach((item) => {
        if (item.id === Number(this.formData.partnerId)) {
          partnerName = item.name;
        }
      });
      // 销售量（个）
      this.searchOrderCount = await getorderCount({
        partnerId: this.formData.partnerId,
        start: this.formData.dateArr[0] || this.start + " 00:00:00",
        end: this.formData.dateArr[1] || this.end + " 00:00:00",
      });
      // 收入统计 （万元）
      this.searchOrderAmount =
        (await getorderAmount({
          partnerId: this.formData.partnerId,
          start: this.formData.dateArr[0] || this.start + " 00:00:00",
          end: this.formData.dateArr[1] || this.end + " 00:00:00",
        })) / 100;
      // 销售统计
      this.searchTotalBill =
        (await gettotalBill({
          partnerId: this.formData.partnerId,
          start: this.formData.dateArr[0] || this.start + " 00:00:00",
          end: this.formData.dateArr[1] || this.end + " 00:00:00",
        })) / 100;

      // 查询日期条件
      if (this.formData.dateArr.length === 0) {
        this.getpartnercollect({
          partnerName,
          start: this.start,
          end: this.end,
        });
      } else {
        // const index = this.formData.dateArr[0].indexOf(" ");
        this.getpartnercollect({
          partnerName,
          start: this.formData.dateArr[0].slice(0, 10),
          end: this.formData.dateArr[1].slice(0, 10),
        });
      }
    },
    async getpartnercollect(params) {
      const res = await getpartnercollect(params);
      // console.log(res);
      this.tableData = res.currentPageRecords;
      this.pageIndex = res.pageIndex;
      this.totalPage = res.totalPage;
      this.totalCount = res.totalCount;
      this.tableData.forEach((item, index) => {
        item.itemIndex = (this.pageIndex - 1) * 10 + index + 1;
        item.ratio = item.ratio + "%";
        item.orderTotalMoney = "+" + item.orderTotalMoney / 100;
        item.totalBill = "+" + item.totalBill / 100;
      });
    },
    // async gettotalBill(params){
    //   const res = await gettotalBill(params)
    //   return res/100
    // }
    // 获取合作商
    async getPartner() {
      const res = await getPartnerApi({
        pageSize: 10,
      });
      // console.log(res);
      this.partners = res.currentPageRecords;
    },
  },
  components: {
    ResultList,
  },
};
</script>

<style lang="scss">
.app-main {
  // 统计栏
  .statistics {
    // 日销售统计
    display: flex;
    .day {
      background: #e9f3ff;
      // background-image: url(./assets/1.png,./assets/2.png),url(./assets/day.png);
      background-image: url(./assets/1.png), url(./assets/day.png);
      background-repeat: no-repeat, no-repeat;
      background-position: 0 0, calc(100% - 12px) 100%;
      border-radius: 20px;
      margin-right: 10px;
    }
    // 月销售统计
    .month {
      background: #fbefe8 url(./assets/month.png) no-repeat calc(100% - 12px)
        100%;
      border-radius: 20px;
      margin-left: 10px;
    }
    .grid-content {
      height: calc(25vh - 30px);
      min-height: 166px;
      padding: 20px;
      border-radius: 20px;
      .box {
        display: flex;
        // justify-content: center;
        height: 100%;
        align-items: center;

        .stats {
          padding: 0 0;
          .item {
            .num {
              color: #072074;
              height: 50px;
              font-size: 36px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              line-height: 50px;
              text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
            }
            .text {
              // text-align: center;
              height: 17px;
              margin-top: 3px;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #91a7dc;
              line-height: 17px;
            }
          }
        }
      }
    }
  }
  .app-main .statistics .month .grid-content .box .stats .item .num {
    color: #ff5757;
    text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
  }
  .app-main .statistics .month .grid-content .box .stats .text {
    color: #de9690;
  }
  // 主体
  .app-container {
    .report {
      display: flex;
      div {
        margin-right: 50px;
      }
    }
  }
}
</style>
