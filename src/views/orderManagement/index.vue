<template>
  <!-- 订单管理 -->
  <div class="app-main">
    <!-- 搜索 -->
    <my-search nameOne="商品类型搜索" @search="searchBtn"> </my-search>
    <!-- table -->
    <result-list
      :isShowBtn="false"
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
import MySearch from "@/components/Search.vue";
import ResultList from "@/components/ResultList.vue";
export default {
  data() {
    return {
      tableArr: [
        { prop: "skuName", label: "订单编号" },
        { prop: "skuImage", label: "商品名称" },
        { prop: "brandName", label: "订单金额(元)" },
        { prop: "unit", label: "设备编号" },
        { prop: "price", label: "订单状态" },
        { prop: "className", label: "订单日期" },
      ],
      operationArr: {
        opeWidth: "100",
        ope: [
          // 操作
          { title: "查看详情", color: false },
        ],
      },
      tableData: [],
    };
  },
  methods: {
    searchBtn(val){},
    operationBtn() {},
  },
  components: {
    MySearch,
    ResultList,
  },
};
</script>

<style></style>
