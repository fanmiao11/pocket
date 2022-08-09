<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-08 14:42:25
 * @LastEditors: sj
 * @LastEditTime: 2022-08-08 20:03:59
-->
<template>
  <div class="userWorkInfo">
    <div class="userInfo">
      <el-row style="margin-bottom: 15px;">
      <el-col :span="8">
        <span>人员名称：</span>
        <span>{{userInfo.userName}}</span>
      </el-col>
      <el-col :span="8">
        <span>角色：</span>
        <span>{{userInfo.roleName}}</span>
      </el-col>
      <el-col :span="8">
        <span>联系电话：</span>
        <span>{{userInfo.mobile}}</span>
      </el-col>
    </el-row>
     <el-row>
      <el-col :span="8">
        <span>负责区域：</span>
        <span>{{userInfo.regionName}}</span>
      </el-col>
    </el-row>
    </div>

    <div class="workTable">
      <el-row type="flex" class="th rowStyle">
        <el-col class="item"></el-col>
        <el-col class="item">总工单数</el-col>
        <el-col class="item">拒绝工单</el-col>
        <el-col class="item">完成工单</el-col>
        <el-col>进行中工单</el-col>
      </el-row>
      <el-row type="flex" class="rowStyle">
         <el-col class="item">本周</el-col>
         <el-col class="item">{{ weekWork.total}}</el-col>
         <el-col class="item">{{ weekWork.cancelCount}}</el-col>
         <el-col class="item">{{ weekWork.workCount}}</el-col>
         <el-col>{{ weekWork.progressTotal}}</el-col>
      </el-row>
      <el-row type="flex" class="rowStyle">
         <el-col class="item">本月</el-col>
         <el-col class="item">{{monthWork.total}}</el-col>
         <el-col class="item">{{monthWork.cancelCount}}</el-col>
         <el-col class="item">{{monthWork.workCount}}</el-col>
         <el-col>{{monthWork.progressTotal}}</el-col>
      </el-row>
      <el-row type="flex" class="rowStyle" style="border-bottom: 1px solid #d8dde3">
         <el-col class="item">本年</el-col>
         <el-col class="item">{{yearWork.total}}</el-col>
         <el-col class="item">{{yearWork.cancelCount}}</el-col>
         <el-col class="item">{{yearWork.workCount}}</el-col>
         <el-col>{{yearWork.progressTotal}}</el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import { getUserWork ,getuserInfo} from '@/api/personnel'
import dayjs from "dayjs"
export default {
  props:{
    id:{
      type: [Number, String]
    }
  },
  data() {
    return {
     startY: '',
     startM: '',
     startW: '',
     end: '',
     userInfo:{},
     yearWork: {},
     monthWork: {},
     weekWork: {},
    }
  },
   created(){
     this.getuserInfo(this.id)

      //  当天最后时间时间  结束时间
    this.end = dayjs(Date.now()).format("YYYY-MM-DD 23:59:59")
    this.startY = dayjs().startOf('year').format("YYYY-MM-DD HH:mm:ss")
    this.startM = dayjs().startOf('month').format("YYYY-MM-DD HH:mm:ss")
    this.startW = dayjs().startOf('week').format("YYYY-MM-DD HH:mm:ss")
    this.yearWorkFn({
      userId: this.id,
      start: this.startY,
      end: this.end
    })

   this.monthWorkFn({
    userId: this.id,
    start: this.startM,
    end: this.end
   })

    this.weekWorkFn({
    userId: this.id,
    start: this.startW,
    end: this.end
   })
   },
   methods:{
    // 本年
    async yearWorkFn(data){
       this.yearWork = await getUserWork(data)
    },
      // 本月
    async monthWorkFn(data){
       this.monthWork = await getUserWork(data)
    },
      // 本周
    async weekWorkFn(data){
       this.weekWork = await getUserWork(data)
    },
    // 获取用户基本信息
    async getuserInfo(id){
     this.userInfo = await getuserInfo(id)

    }
   }
}
</script>

<style lang="scss" scoped>
 .userWorkInfo {
  width: 579px;
    min-height: 277px;
    margin: 0px auto;

    .userInfo {
          height: 86px;
    padding: 19px 19px 0;
    background: #f3f6fb;
    }

    .workTable {
      .rowStyle {
      height: 40px;
      border-top: 1px solid #d8dde3;
      border-left: 1px solid #d8dde3;
      line-height: 40px;
      border-right: 1px solid #d8dde3;
      text-align: center;

       .item {
        line-height: 40px;
        border-right: 1px solid #d8dde3;
        text-align: center;
       }
      }
       .th {
        margin-top: 26px;
        background: #f7f8fd
       }
    }
 }
</style>
