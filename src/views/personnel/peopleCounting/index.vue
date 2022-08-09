<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 20:21:46
 * @LastEditors: sj
 * @LastEditTime: 2022-08-09 14:46:50
-->
<template>
  <div class="app-main">
    <el-row class="top" type="flex">
      <el-col class="topCom box top-left" style="margin-right: 20px">
        <div class="title">运营人员（当天）</div>
        <div class="body">
          <div>
            <span>{{headerInfo[0].total}}</span>
            <span>工单总数（个）</span>
          </div>
          <div>
            <span>{{headerInfo[0].completedTotal}}</span>
            <span>完成工单（个）</span>
          </div>
          <div>
            <span>{{headerInfo[0].cancelTotal}}</span>
            <span>拒绝工单（个）</span>
          </div>
          <div>
            <span>{{headerInfo[0].workerCount}}</span>
            <span>运营人员数（个）</span>
          </div>
        </div>
      </el-col>
      <el-col class="topCom box top-right">
        <div class="title">运维人员（当天）</div>
        <div class="body">
          <div>
            <span class="rightNumColor">{{headerInfo[1].total}}</span>
            <span class="rightDesColor">工单总数（个）</span>
          </div>
          <div>
            <span class="rightNumColor">{{headerInfo[1].completedTotal}}</span>
            <span class="rightDesColor">完成工单（个）</span>
          </div>
          <div>
            <span class="rightNumColor">{{headerInfo[1].cancelTotal}}</span>
            <span class="rightDesColor">拒绝工单（个）</span>
          </div>
          <div>
            <span class="rightNumColor">{{headerInfo[1].workerCount}}</span>
            <span class="rightDesColor">运营人员数（个）</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="bottom" type="flex">
      <el-col class="box bom-left bom" style="margin-right: 25px">
        <div class="header">
          <div class="title" style="margin-bottom:0">工单状态</div>
          <div class="date">
              <el-date-picker
                class="time"
                v-model="value"
                type="daterange"
                range-separator="~"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :start-placeholder="startTime"
                :end-placeholder="endTime"
                :pickerOptions="pickerOptions"
                @change="chooseDate"
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
          <div  class="empty" v-if="isShowEmpty">
            <img :src="emptyImg" alt="">
            <p>暂无数据</p>
          </div>
          <barEcharts ref="barEar" v-else :collectList="collectList" :data1="data1" :data2="data2" :data3="data3"/>
        </div>
      </el-col>
      <el-col class="box bom-right bom">
          <div class="header">
          <div class="title" style="margin-bottom:0">人效排名（月度）</div>
          <el-select placeholder="全部" class="select" v-model="area" @change="changeArea">
             <el-option :label="item.name" :value="item.id" v-for="item in areaList" :key="item.id"></el-option>
           </el-select>
        </div>

        <div class="role-group">
           <div class="role-list">
            <div class="role" :class="{isChecked: lCurrent}" @click="clickL">运营人员</div>
            <div class="role" :class="{isChecked: rCurrent}" @click="clickR">运维人员</div>
           </div>
        </div>

        <div class="role-content">
           <div class="empty2" v-if="isShowEmpty2">
            <img :src="emptyImg" alt="">
            <p>暂无数据</p>
          </div>
          <div v-else> 排名表 </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getHeaderInfo,getAreaList,getToTen ,getCollectReport} from '@/api/personnel'
import emptyImg from "@/assets/empty.87.png";
import dayjs from "dayjs"
import barEcharts from './components/echarts.vue'
export default {
  data() {
    return {
      value:'',
      startTime: dayjs(Date.now()).format("YYYY-MM-DD"),
      endTime: dayjs(Date.now()).format("YYYY-MM-DD"),
      emptyImg,
      weekCurrent: true,
      monthCurrent: false,
      yearCurrent: false,
      headerInfo: [{},{}],
      pickerOptions:{
       disabledDate(data){
        return data > Date.now()
       }
      },
      lCurrent: true, // 运营人员样式
      rCurrent: false, // 运维人员样式
      area:'',
      areaList:[],
      roleCurrent: false, //  当前选择的是哪个角色 true：运维工单;false：运营工单
      isShowEmpty: false,
      isShowEmpty2: false,
      collectList:[], // echarts 渲染的列表数据
      data1:[],
      data2:[],
      data3:[],
    }
  },
  created(){
   this.clickWeek()

   this.getHeaderInfo(
    dayjs(Date.now()).format("YYYY-MM-DD 00:00:00"),
    dayjs(Date.now()).format("YYYY-MM-DD 23:59:59")
   )

   this.getAreaList({pageIndex:1,pageSize: 100000})

   this.getToTen(
     dayjs().startOf('month').format("YYYY-MM-DD"),
     this.endTime,
     this.roleCurrent,
     0
   )

   this.getCollectReport(
    dayjs().startOf('week').format(`YYYY-MM-DD`),
    this.endTime
   )
  },
  methods:{
    clickWeek(){
       this.weekCurrent= true
       this.monthCurrent=false
       this.yearCurrent=false
       this.startTime = dayjs().startOf('week').format(`YYYY-MM-DD`)
       this.getCollectReport()

    },
    clickMonth(){
       this.weekCurrent= false
       this.monthCurrent=true
       this.yearCurrent=false
       this.startTime = dayjs().startOf('month').format("YYYY-MM-DD")
       this.getCollectReport()
    },
    clickYear(){
       this.weekCurrent= false
       this.monthCurrent=false
       this.yearCurrent=true
       this.startTime = dayjs().startOf('year').format("YYYY-MM-DD")
        this.getCollectReport()
    },
    //点击运营人员
    clickL(){
      this.lCurrent = true
      this.rCurrent = false
      this.roleCurrent = false
      this.getAreaList(
     dayjs().startOf('month').format("YYYY-MM-DD"),
     this.endTime,
     this.roleCurrent,
     this.area
      )
    },
    //点击运维人员
     clickR(){
      this.lCurrent = false
      this.rCurrent = true
      this.roleCurrent = true
      this.getAreaList(
     dayjs().startOf('month').format("YYYY-MM-DD"),
     this.endTime,
     this.roleCurrent,
     this.area
      )
    },
    // 头部列表数据  当天
    async getHeaderInfo(start,end) {
      const res = await getHeaderInfo(start,end)
      if(res[0]) {this.headerInfo=res}
    },
    // 获取地区
    async getAreaList(data){
      const {currentPageRecords} = await getAreaList(data)
      this.areaList=currentPageRecords
    },
    // 获取人员排名
    async getToTen(start, end, isRepair, regionId){
      const res = await getToTen(start, end, isRepair, regionId)
      if(!res[0]){ this.isShowEmpty2 = true}
    },
    // 选择地区 重新获取排名
    changeArea() {
      this.getToTen(
       dayjs().startOf('month').format("YYYY-MM-DD"),
     this.endTime,
     this.roleCurrent,
     this.area
      )
    },
    // 获取工单统计
    async getCollectReport() {
      const res = await getCollectReport( this.startTime,
        this.endTime)
        this.collectList=res
       if(!this.collectList[0]){ this.isShowEmpty = true}
       else{ this.isShowEmpty = false}
    },
    // 选择日期
   async chooseDate(){
    console.log(this.value);
      this.startTime =this.value[0]
      this.endTime = this.value[1]
      await this.getCollectReport()
      this.data1 = this.collectList.map(item => item.finishCount)
      this.data2 = this.collectList.map(item => item.cancelCount)
      this.data3 = this.collectList.map(item => dayjs(item.collectDate).format(`MM月DD日`))
      console.log(this.collectList);
    }
  },
  components: {
    barEcharts
  }
}


</script>

<style lang="scss" scoped>
.box {
  padding: 20px;
  border-radius: 20px;
}

.title {
  font-size: 18px;
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
    align-items: center;
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
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .select {
    width: 88px;

   .el-input__inner {
        height: 32px;
        line-height: 32px;
        padding-right: 30px;
        cursor: pointer;
   }
  }

  .role-group {
    width: 177px;
    margin: 15px auto 0;

    .role-list {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 34px;
    background: rgba(233,243,255,.37);
    border-radius: 10px;

    .role {
     width: 78px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    font-size: 14px;
    color: #000;
    cursor: pointer;
    }
    }
  }

    .role-content {
      position: relative;
      width: 100%;
      height: 100%;
    }

   ::v-deep .empty2 {
    text-align: center;
    position: absolute;
     top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
   }
}
</style>
