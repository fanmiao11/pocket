<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-05 23:10:34
 * @LastEditors: sj
 * @LastEditTime: 2022-08-06 01:21:24
-->
<template>
   <el-pagination layout="slot" size="10" class="pagination">
            <slot>
              <span>共{{totalCount}}条记录 第{{pageIndex}}/{{totalPage}}页</span>
            </slot>
              <el-button class="pageBtn" @click="upPage" ref="upBtn">上一页</el-button>
                <el-button class="pageBtn" @click="nextPage" ref="nextBtn">下一页</el-button>
          </el-pagination>
</template>

<script>
export default {
  props:{
      totalCount:{
    type: [Number,String],
    default:''
   },
   totalPage:{
    type: [Number,String],
    default:''
   },
   pageIndex:{
     type: [Number,String],
    default:''
   }
  }
}
</script>

<style>

</style>
