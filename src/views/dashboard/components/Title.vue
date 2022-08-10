<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-10 15:28:39
 * @LastEditors: sj
 * @LastEditTime: 2022-08-10 15:46:23
-->
<template>
   <div class="title">
      {{title}}
    <span v-if="time">{{start}} ~ {{end}}</span>
   </div>
</template>

<script>
import dayjs from "dayjs"
export default {
  data(){
    return {
      start:dayjs().startOf('month').format("YYYY.MM.DD"),
      end:dayjs(Date.now()).format("YYYY.MM.DD"),
    }
  },
  props:{
    title:{
      type: String,
      default: ''
    },
    time:{
      type:Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
 .title {
      font-size: 16px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
    span {
    margin-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #999
    }
}
</style>
