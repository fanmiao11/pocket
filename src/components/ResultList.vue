<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-05 23:06:21
 * @LastEditors: sj
 * @LastEditTime: 2022-08-06 20:05:46
-->
<template>
   <div class="result">
        <div class="operation-btn">
          <my-buttom bcColor="orange" icon="el-icon-circle-plus-outline"  @click.native="$emit('addOpreation')">新建</my-buttom>
          <my-buttom bcColor="lightsalmon">工单配置</my-buttom>
        </div>

        <div class="result-list">
          <el-table :data="tableData" style="width: 100%" row-key="String" ref="table">
            <el-table-column prop="id" label="序号"></el-table-column>
            <el-table-column :prop="item.prop" :label="item.label" v-for="(item,index) in tableArr" :key="index" :formatter="formatter"></el-table-column>
            <!-- <el-table-column prop="taskCode" label="工单编号" >
            </el-table-column>
            <el-table-column prop="innerCode" label="设配编号">
            </el-table-column>
            <el-table-column prop="taskType.typeName" label="工单类型" > </el-table-column>
            <el-table-column prop="createType" label="工单方式" :formatter="formatterType">
            </el-table-column>
            <el-table-column prop="taskStatusTypeEntity.statusName" label="工单状态">
            </el-table-column>
            <el-table-column prop="userName" label="运营人员"> </el-table-column>
            <el-table-column prop="createTime" label="创建日期" :formatter="formatterDate"> </el-table-column> -->
             <el-table-column
      fixed="right"
      label="操作"
      prop="taskId"
    >
      <template slot-scope="scope">
        <el-button type="text" @click="handleClick(scope.row)">详情查看</el-button>
      </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <my-pagination v-bind="$attrs" v-on="$listeners"></my-pagination>
          <!-- <el-pagination layout="slot" size="10" class="pagination">
            <slot>
              <span>共{{totalCount}}条记录 第{{pageIndex}}/{{totalPage}}页</span>
            </slot>
              <el-button class="pageBtn" @click="upPage" ref="upBtn">上一页</el-button>
                <el-button class="pageBtn" @click="nextPage" ref="nextBtn">下一页</el-button>
          </el-pagination> -->
        </div>
      </div>
</template>

<script>
import MyPagination from '@/components/Pagination.vue'
import MyButtom from '@/components/Button.vue'
import dayjs from 'dayjs'
export default {
  props:{
    tableArr:{
    type: Array,
    default: [],
   },
   tableData:{
    type: Array,
    default: [],
   }
  },
 components:{
  MyButtom,
  MyPagination
 },
 methods:{
  formatter(row, column,cellValue){
    //  console.log(cellValue);
    //  console.log(column);
     if(column.label === '创建日期'){
      return  dayjs(row.updateTime).format('YYYY.MM.DD HH:mm:ss')
     }else if(column.label === '工单方式'){
      return row.createType ? '手动':'自动'
     }else {
      return cellValue
     }
  },
  handleClick(row){
    // console.log(row);
   this.$emit('operationMoreMsgBtn',row.taskId)
  }
 }
}
</script>

<style lang="scss" scoped>
  .result {
    padding: 20px 15px 19px 17px;
    background-color: #fff;

    .operation-btn {
      margin-bottom: 20px;
    }
    ::v-deep .el-table th.is-leaf {
          line-height: 1.15;
    padding: 10px 0px 9px;
    background: rgb(243, 246, 251);
    font-weight: 500;
    text-align: left;
    color: rgb(102, 102, 102);
    border-bottom: 0;
    }
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

  }

</style>
