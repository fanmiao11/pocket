<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-09 09:04:27
 * @LastEditors: sj
 * @LastEditTime: 2022-08-09 14:25:10
-->
<template>
  <!-- 策略管理 -->
  <div class="app-main">
    <!-- 搜索 -->
    <my-search nameOne="策略搜索" @search="searchBtn"> </my-search>
    <!-- table -->
    <result-list
      :isShowPagination="false"
      :tableArr="tableArr"
      :operation="operationArr"
      :tableData="tableData"
      @operationBtn="operationBtn"
      class="result"
    >
    </result-list>
  </div>
</template>

<script>
import { getTacticalList } from '@/api/tactical'
import MySearch from "@/components/Search.vue";
import ResultList from "@/components/ResultList.vue";
export default {
  created(){},
  data() {
    return {
      tableArr: [
        { prop: "skuName", label: "策略名称" },
        { prop: "skuImage", label: "策略方案" },
        { prop: "brandName", label: "创建日期" },
      ],
      operationArr: {
        opeWidth: "200",
        ope: [
          // 操作
          { title: "查看详情", color: false },
          { title: "修改", color: false },
          { title: "删除", color: true },
        ],
      },
      tableData: [],
    };
  },
  methods: {
    searchBtn(val){},
    operationBtn() {},
    async getTacticalList(){
      const res = await getTacticalList()
      console.log(res);
    }
  },
  components: {
    MySearch,
    ResultList,
  },
};
</script>

<style></style>
