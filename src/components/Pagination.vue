<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-05 23:10:34
 * @LastEditors: sj
 * @LastEditTime: 2022-08-06 14:33:06
-->
<template>
   <el-pagination layout="slot" size="10" class="pagination">
            <slot>
              <span>共{{totalCount}}条记录 第{{pageIndex}}/{{totalPage}}页</span>
            </slot>
              <el-button class="pageBtn" @click="upPage" :disabled="upPageBtn">上一页</el-button>
              <el-button class="pageBtn" @click="nextPage" :disabled="nextPageBtn">下一页</el-button>
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
  },
  methods:{
    upPage(){
      this.$emit('upPage');
    },
    nextPage(){
      this.$emit('nextPage');
    }
  },
  computed:{
    upPageBtn(){
     return this.pageIndex === '1'? true : false;
    },
     nextPageBtn(){
     return this.pageIndex === this.totalCount? true : false;
    },
  }
}
</script>

<style lang="scss" scoped>
    .pagination {
    display: flex;
    justify-content: space-between;
     background: #fff;
    padding: 32px 16px;
     span {
      flex: 1;
      font-size: 16px!important;
      color: #dbdfe5!important;
     }


    .pageBtn {
     width: 70px;
    height: 32px;
    margin: 0 16px;
    border-radius: 2px;
    background-color: #d5ddf8
    }
   }

</style>
