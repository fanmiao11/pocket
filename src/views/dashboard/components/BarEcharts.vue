<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-10 16:45:20
 * @LastEditors: sj
 * @LastEditTime: 2022-08-10 23:06:35
-->
<template>
  <div ref="bar" style="width: 100%; height:100%;"></div>
</template>

<script>
export default {
 props:{
    series:{
      type:Array,
      default:[]
    },
        xAxis:{
      type:Array,
      default:[]
    },
  },
  watch:{
    series(val){
     val.length && this.inOrigin()
    }
  },
   mounted () {
    this.inOrigin()
  },
  methods: {
     // 工单状态柱形图
    inOrigin(){
      let myChart = this.$echarts.init(this.$refs.bar)

      let optionBar = {
         color: ["#97aff9"],
         title: {
          text: "销售额分布",
          left: "40%",
        },
          xAxis: [{
    type: 'category',
    data: this.xAxis
  }],
  yAxis: {
    type: 'value',
    name: "单位：元",
  },
  series: [
    {
      data: this.series,
      type: 'bar',
      barWidth: '10'
    }
  ]
};
    myChart.setOption(optionBar)
  },

  }
}
</script>

<style>

</style>
