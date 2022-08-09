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
                  <div class="num">5</div>
                  <div class="text">当日销售量（个）</div>
                </div>
              </el-col>
              <el-col class="stats">
                <div class="item">
                  <div class="num">5</div>
                  <div class="text">当前销售额（元）</div>
                </div>
              </el-col>
              <el-col class="stats">
                <div class="item">
                  <div class="num">5</div>
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
                  <div class="num">3225</div>
                  <div class="text">当月销售量（个）</div>
                </div>
              </el-col>
              <el-col class="stats">
                <div class="item">
                  <div class="num">2</div>
                  <div class="text">当月销售额（元）</div>
                </div>
              </el-col>
              <el-col class="stats">
                <div class="item">
                  <div class="num">31.</div>
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
          <el-form-item label="合作商：">
            <!-- <el-select placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="日期：">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
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
        <div>笔数统计：<span :style="{ color: 'red' }">3225</span>个</div>
        <div>收入统计：<span :style="{ color: 'red' }">3225</span>元</div>
        <div>分成统计：<span :style="{ color: 'red' }">3225</span>元</div>
      </div>
      <!-- 表格数据渲染 -->
      <div>
        <!-- table -->
        <result-list
          :isShowBtn="false"
          :isShowPagination="false"
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
export default {
  data() {
    return {
      value1: "",
      tableArr: [
        { prop: "skuName", label: "订单日期" },
        { prop: "skuImage", label: "合作商" },
        { prop: "brandName", label: "分成比例" },
        { prop: "unit", label: "收入(元)" },
        { prop: "price", label: "笔数" },
        { prop: "className", label: "分成金额(元)" },
      ],
      tableData: [],
    };
  },
  methods:{
    onSubmit(){},
  },
  components:{
    ResultList,
  }
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
    }
  }
}
</style>
