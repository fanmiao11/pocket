<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 20:20:38
 * @LastEditors: sj
 * @LastEditTime: 2022-08-07 00:00:47
-->
<template>
  <div class="app-main">
     <my-search nameOne="人员搜索"/>

     <ResultList></ResultList>

  </div>
</template>

<script>
import MySearch from '@/components/Search.vue'
import ResultList from '@/components/ResultList.vue'
export default {
   components:{
    MySearch,
    ResultList
   }
}
</script>

<style>

</style>
