<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-10 16:37:23
 * @LastEditors: sj
 * @LastEditTime: 2022-08-10 23:47:00
-->
<template>
  <div ref="line" style="width: 100%; height: 100%"></div>
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
  mounted() {
    this.inOrigin();
  },
  methods: {
    // 工单状态柱形图
    inOrigin() {
      let myChart = this.$echarts.init(this.$refs.line);
      let optionLine = {
        color: ["#eb635d"],
        title: {
          text: "销售额趋势图",
          left: "40%",
        },
        grid: {
          top: '18%',
          left: '20%',//原来是10%，修改为20%
          right: '2%',
          bottom: '24%',
        },
        xAxis:[
          {
          type: "category",
          data: this.xAxis,
          }
        ],
        yAxis: {
          type: "value",
          name: "单位：元",
        },
        series: [
          {
            data: this.series,
            type: "line",
          },
        ],
      };
      myChart.setOption(optionLine);
    },
  },
};
</script>

<style></style>
