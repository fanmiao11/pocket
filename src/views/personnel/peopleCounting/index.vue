<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 20:21:46
 * @LastEditors: sj
 * @LastEditTime: 2022-08-09 01:12:55
-->
<template>
  <div class="app-main">
    <el-row class="top" type="flex">
      <el-col class="topCom box top-left" style="margin-right: 20px">
        <div class="title">运营人员（当天）</div>
        <div class="body">
          <div>
            <span>25</span>
            <span>工单总数（个）</span>
          </div>
          <div>
            <span>25</span>
            <span>完成工单（个）</span>
          </div>
          <div>
            <span>25</span>
            <span>拒绝工单（个）</span>
          </div>
          <div>
            <span>25</span>
            <span>运营人员数（个）</span>
          </div>
        </div>
      </el-col>
      <el-col class="topCom box top-right">
        <div class="title">运维人员（当天）</div>
        <div class="body">
          <div>
            <span class="rightNumColor">25</span>
            <span class="rightDesColor">工单总数（个）</span>
          </div>
          <div>
            <span class="rightNumColor">25</span>
            <span class="rightDesColor">完成工单（个）</span>
          </div>
          <div>
            <span class="rightNumColor">25</span>
            <span class="rightDesColor">拒绝工单（个）</span>
          </div>
          <div>
            <span class="rightNumColor">25</span>
            <span class="rightDesColor">运营人员数（个）</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="bottom" type="flex">
      <el-col class="box bom-left bom" style="margin-right: 25px">
        <div class="header">
          <div class="title">工单状态</div>
          <div class="date">
              <el-date-picker
                class="time"
                v-model="value1"
                type="daterange"
                range-separator="~"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :start-placeholder="startTime"
                :end-placeholder="endTime"
                :disabledDate="nochoose"
              >
              </el-date-picker>
            <div class="week-month-year">
               <div class="week item" @click="clickWeek" :class="{isChecked: weekCurrent}">周</div>
               <div class="month item" @click="clickMonth" :class="{isChecked: monthCurrent}">月</div>
               <div class="year item" @click="clickYear" :class="{isChecked: yearCurrent}">年</div>
            </div>
          </div>
        </div>

        <div class="main">
          <el-empty :image="emptyImg" description="暂无数据" class="empty"></el-empty>
        </div>
      </el-col>
      <el-col class="box bom-right bom">4</el-col>
    </el-row>
  </div>
</template>

<script>
import emptyImg from "@/assets/empty.87.png";
import dayjs from "dayjs"
export default {
  data() {
    return {
      value1:'',
      startTime: '',
      endTime: '',
      emptyImg,
      weekCurrent: true,
      monthCurrent: false,
      yearCurrent: false,
    }
  },
  created(){
    this.endTime= this.startY = dayjs(Date.now()).format("YYYY-MM-DD")
   this.clickWeek()
  },
  methods:{
    clickWeek(){
       this.weekCurrent= true
       this.monthCurrent=false
       this.yearCurrent=false
       this.startTime = dayjs().startOf('week').format(`YYYY-MM-DD`)

    },
    clickMonth(){
       this.weekCurrent= false
       this.monthCurrent=true
       this.yearCurrent=false
       this.startTime = dayjs().startOf('month').format("YYYY-MM-DD")

    },
    clickYear(){
       this.weekCurrent= false
       this.monthCurrent=false
       this.yearCurrent=true
       this.startTime = dayjs().startOf('year').format("YYYY-MM-DD")
    },
    nochoose(data){
      return true
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  padding: 20px;
  border-radius: 20px;
}

.title {
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333;
  margin-bottom: 35px;
}

.top {
  .top-left {
    background-color: #e9f3ff;
    background-image: url("../../../assets/bg11.png"),
      url("../../../assets/bg22.png");
    background-repeat: no-repeat, no-repeat;
    background-position: 0 0, calc(100% - 12px) 100%;
  }

  .top-right {
    background: #fbefe8 url("../../../assets/bg33.png") no-repeat
      calc(100% - 12px) 100%;
  }

  .body {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .topCom {
    height: calc(25vh - 30px);
    min-height: 166px;
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
}

.bottom {
  .bom {
    background-color: #fff;
    height: calc(75vh - 90px);
    min-height: 542px;
    margin-top: 20px;
    background: #fff;
  }

  .bom-left {
    width: 75%;
  }
  .bom-right {
    width: 25%;
  }

  .header {
    display: flex;
    justify-content: space-between;
  }

  .time{
    width: 252px;
    margin-right: 21px;
  }
  ::v-deep .el-range-input::placeholder {
    color: #000;
  }

  .week-month-year {
    width: 129px;
    height: 34px;
    background: rgba(233,243,255,.37);
    border-radius: 10px
  }
  .date {
    display: flex;
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

  .week-month-year {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .isChecked {
    background: #fff;
    -webkit-box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
    box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
    border-radius: 7px;
    font-weight: 600;
    color: #333
  }

  .main {
    height: 100%;
    width: 100%;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    position: relative
  }
  .empty {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
