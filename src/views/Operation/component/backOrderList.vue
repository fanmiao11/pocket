<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-07 10:05:27
 * @LastEditors: sj
 * @LastEditTime: 2022-08-07 10:05:27
-->
<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-06 21:05:21
 * @LastEditors: sj
 * @LastEditTime: 2022-08-06 23:11:52
-->
<template>
  <my-dialog
    dialogTitle="补货详情"
    :dialogVisible="isBackOrderList"
    @close="$emit('close')"
  >
        <el-table
      :data="backOrderList"
      style="width: 100%"
      max-height='400px'
      class="backOrderList"
      >
      <el-table-column
        prop="channelCode"
        label="货道编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="skuName"
        label="商品"
        width="180">
      </el-table-column>
      <el-table-column
        prop="expectCapacity"
        label="补货数量">
      </el-table-column>
    </el-table>
  </my-dialog>
</template>

<script>
import { getBackOrderListApi } from '@/api/operation'
import MyDialog from '@/components/Dialog.vue'
export default {
  data(){
    return {
      backOrderList:[]
    }
  },
  props:{
    isBackOrderList:{
      type:Boolean,
      default:false,
    },
    moreTask:{
      type: Object,
      default: ()=>{ return {}}
    }
  },
  components:{
    MyDialog
  },
  created(){
    this.getBackOrderList()
  },
  methods:{
    // 获取补货详情
    async getBackOrderList(){

      this.backOrderList = await getBackOrderListApi(this.moreTask)

    }
  }
}
</script>

<style lang="scss" scoped>
.backOrderList {
  .el-table__header{
    thead {
     ::v-deep tr {
          background-color: aqua;
      }
    }
  }

}
.el-dialog__body{
  padding: 20px 20px 30px;
  color: #666;
}

</style>
