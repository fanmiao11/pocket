<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-06 23:42:10
 * @LastEditors: sj
 * @LastEditTime: 2022-08-10 23:32:08
-->
<template>
  <div class="app-main">
    <el-row type="flex">
      <el-col style="width: 75%; margin-right: 20px">
        <el-row type="flex">
          <el-col class="workOrder box">
            <MyTitle title="工单统计" />
            <div class="body">
              <div v-for="(item, index) in workList" :key="index">
                <span>{{ headerInfo[0][item.value]+headerInfo[1][item.value]}}</span>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </el-col>
          <el-col class="salesOrder box">
            <MyTitle title="销售统计" />
            <div class="body">
              <div>
                <span class="rightNumColor">{{orders}}</span>
                <span class="rightDesColor">订单量（个）</span>
              </div>
              <div>
                <span class="rightNumColor">{{amount}}</span>
                <span class="rightDesColor">销售额（万元）</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="salseEcharts box">
          <div class="header">
            <MyTitle title="销售数据" />
            <div class="week-month-year">
              <div
                class="item"
                @click="clickTime(item.time)"
                :class="{ isChecked: currentTime === item.time }"
                v-for="(item, index) in timeList"
                :key="index"
              >
                {{ item.value }}
              </div>
            </div>
          </div>

          <div class="echarts">
             <LineEcharts :series="series" :xAxis="xAxis"/>
             <BarEcharts :series="seriesRegion" :xAxis="xAxisRegion"/>
          </div>
        </el-row>
      </el-col>
      <el-col class="top-right box">
        <MyTitle title="商品热榜" />
        <div class="content">
          <el-row v-for="(item, index) in topTenList" :key="index">
            <el-col :span="5" :class="{top1: index==0, top2: index==1, top3: index==2}" class="top">{{ index+1}}</el-col>
            <el-col :span="13" class="sku-name">{{item.skuName}}</el-col>
            <el-col :span="6" class="count">{{item.count}}单</el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" style="margin-top: 20px">
      <el-col class="business box">
        <div class="header">
          <MyTitle title="合作商点位数Top5" :time="false" />
          <svg-icon icon-class="more" />
        </div>
      </el-col>
      <el-col class="control box">
        <div class="header">
          <MyTitle title="异常设备监控" :time="false" />
          <svg-icon icon-class="more" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getHeaderInfo } from "@/api/personnel";
import { getorderCount ,getorderAmount ,getamountCollect,getregionCollect,getskuTop} from '@/api/report'
import dayjs from "dayjs";
import MyTitle from "./components/Title.vue";
import LineEcharts from './components/LineEcharts.vue'
import BarEcharts from './components/BarEcharts.vue'
export default {
  name: "Dashboard",
  data() {
    return {
      workList: [
        { name: "工单总数（个）", value: "total" },
        { name: "完成工单（个）", value: "completedTotal" },
        { name: "进行工单（个）", value: "cancelTotal" },
        { name: "取消工单（个）", value: "workerCount" },
      ],
      salseList: [
        { name: "订单量（个）", value: this.orders },
        { name: "销售额（万元）", value: this.amount },
      ],
      timeList: [
        { time: "week", value: "周" },
        { time: "month", value: "月" },
        { time: "year", value: "年" },
      ],
      currentTime: "",
      startTime: dayjs().startOf("month").format("YYYY-MM-DD 00:00:00"),
      endTime: dayjs(Date.now()).format("YYYY-MM-DD 23:59:59"),
      start: dayjs().startOf("month").format("YYYY-MM-DD"),
      end: dayjs(Date.now()).format("YYYY-MM-DD"),
      headerInfo: [{}, {}], //工单数据
      orders: '',// 订单总数
      amount:'',//  销售额总数
      collectType: 1,
      xAxis:[],
      series:[],
      seriesRegion:[],
      xAxisRegion:[],
      topTenList:[]
    };
  },
  created(){
    this.clickTime('week')
    this.getHeaderInfo()
    this.getorderCount()
    this.getorderAmount()
    this.getamountCollect()
    this.getregionCollect()
    this.getskuTop()
  },
  methods: {
    clickTime(time) {
      this.currentTime = time;
      if(time ==='year'){this.collectType=2}
      this.startTime = dayjs().startOf(time).format(`YYYY-MM-DD 00:00:00`);
      this.getamountCollect()
      this.getregionCollect()
    },
    // 头部列表数据  工单
    async getHeaderInfo() {
      const res = await getHeaderInfo(this.startTime, this.endTime)
      if (res[0]) {
        this.headerInfo = res;
      }
    },
   // 订单总数
   async getorderCount(){
    this.orders= await getorderCount({start:this.startTime,end:this.endTime})
   },
    // 销售额总数
   async getorderAmount(){
    const res= await getorderAmount({start:this.startTime,end:this.endTime})
     this.amount = (res/1000000).toFixed(2)

   },
     // 获取销售额统计
  async getamountCollect(){
    const res = await getamountCollect(this.collectType,this.start,this.end)
    // console.log(res);
    this.series = res.series
    this.xAxis = res.xAxis
  },
     // 地区汇总销售额数据
  async getregionCollect(){
    const res = await getregionCollect(this.start,this.end)
    // console.log(res);
    this.seriesRegion = res.series
    this.xAxisRegion = res.xAxis
  },
  //获取销售前几的商品
  async getskuTop(){
    const res = await getskuTop(10,this.start,this.end)
    this.topTenList= res
    console.log(res);
  }
  },
  components: {
    MyTitle,
    LineEcharts,
    BarEcharts
  },
};
</script>

<style lang="scss" scoped>
.isChecked {
  background: #fff;
  -webkit-box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
  box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
  border-radius: 7px;
  font-weight: 600;
  color: #333;
}
.box {
  padding: 20px;
  border-radius: 20px;
}
.workOrder {
  padding-left: 10px;
  padding-right: 10px;
  width: 54%;
  margin-right: 20px;
  background-color: #e9f3ff;
  background-image: url("../../assets/bg11.png"), url("../../assets/bg22.png");
  background-repeat: no-repeat, no-repeat;
  background-position: 0 0, calc(100% - 12px) 100%;
}
.salesOrder {
  width: 45%;
  padding-left: 10px;
  padding-right: 10px;
  background: #fbefe8 url("../../assets/bg33.png") no-repeat calc(100% - 12px)
    100%;
}
.body {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.body > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.body > div span:nth-child(1) {
  height: 50px;
  font-size: 36px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  line-height: 50px;
  color: #072074;
  text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
}
.body > div span:nth-child(2) {
  height: 17px;
  margin-top: 3px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #91a7dc;
  line-height: 17px;
}
.rightNumColor {
  text-shadow: 2px 4px 7px rgb(255 99 85 / 50%) !important;
  color: #ff5757 !important;
}
.rightDesColor {
  color: #de9690 !important;
}

.salseEcharts {
  height: calc(40vh - 68px);
  min-height: 352px;
  margin-top: 20px;
  background: #fff;
  border-radius: 20px;
}

.week-month-year {
  width: 129px;
  height: 34px;
  background: rgba(233, 243, 255, 0.37);
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.item {
  width: 37px;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  color: #9ca3b4;
  cursor: pointer;
  text-align: center;
}
.header {
  display: flex;
  justify-content: space-between;
}

.top-right {
  background: #fff;
  width: 25%;
}

.business {
  width: 58%;
  background-color: #fff;
  margin-right: 20px;
}
.control {
  width: 42%;
  background-color: #fff;
}
.echarts {
  display: flex;
  width: 100%;
  height: 100%;
}
.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 90%;

  .top1 {
    width: 21px;
    height: 20px;
    background: url('./assets/bg1.png') no-repeat !important;
    color: #8e5900
  }
  .top2 {
    width: 21px;
    height: 20px;
    background: url('./assets/bg2.png') no-repeat !important;
    color: #494949;
  }
   .top3 {
    width: 21px;
    height: 20px;
    background: url('./assets/bg3.png') no-repeat !important;
    color: #cf6d3d;
  }
  .top {
    display: inline-block;
    width: 16px;
    height: 20px;
     background: url('./assets/bg4.png') no-repeat;
    text-align: center;
    font-size: 12px;
    font-family: zihun143-zhengkuchaojihei,zihun143;
    font-weight: 400;
    color: #e9b499;
    line-height: 14px;
    margin-right: 10px;
  }
   .sku-name {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: #333;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
   }

   .count {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #737589;
    line-height: 20px;
    text-align: right
   }
}
</style>
