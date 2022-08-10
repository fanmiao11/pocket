<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
<<<<<<< HEAD
 * @Date: 2022-08-09 21:27:00
 * @LastEditors: sj
 * @LastEditTime: 2022-08-10 16:40:10
-->

<template>
    <div class="bar" ref="bar" style="width: 100%; height:100%;">工单统计图</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props:{
    collectList:{
      type: Array
    },
     data1:{
      type: Array
    },
     data2:{
      type: Array
    },
    data3:{
      type: Array
    },
  },
  created () {

  },
  mounted () {
    this.inOrigin()
  },
  watch:{
    collectList(){
      collectList.length && this.inOrigin()
    }
  },
  methods: {
     // 工单状态柱形图
    inOrigin(){
      let myChart = this.$echarts.init(this.$refs.bar)

      let optionBar = {
        color:['#7f96f8','#ec635e'],
   tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
      formatter: '{b0}<br />{a0}数: {c0}个'
      // {a}（系列名称）series.name，{b}（类目值）y轴对应的值，{c}（数值）
  },
   legend: {
    data: ['完成工单','取消工单'],
    bottom: 30+'px',
  },
  xAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: this.data3
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '完成工单',
      type: 'bar',
      data: this.data1
    },
    {
      name: '取消工单',
      type: 'bar',
      data: this.data2
    }
  ]
};
    myChart.setOption(optionBar)
  },

  }
}
</script>

<style scoped>

</style>
