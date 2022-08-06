<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-30 20:09:42
 * @LastEditors: sj
 * @LastEditTime: 2022-08-06 20:26:06
-->
<template>
  <div class="app-main">
    <div class="opeartion">
      <!--  搜索栏 -->
      <my-search
      nameOne="工单编号"
      nameTwo="工单状态"
      :optionArr="optionArr"
      :Two="true"
      @search="searchBtn"></my-search>

      <!-- 结果列表 -->
      <!-- <div class="result">
        <div class="operation-btn">
          <my-buttom bcColor="orange" icon="el-icon-circle-plus-outline"  @click.native="addOpreation = true">新建</my-buttom>
          <my-buttom bcColor="lightsalmon">工单配置</my-buttom>
        </div>

        <div class="result-list">
          <el-table :data="tableData" style="width: 100%" row-key="String" ref="table">
            <el-table-column type="index" label="序号" ></el-table-column>
            <el-table-column prop="taskCode" label="工单编号" >
            </el-table-column>
            <el-table-column prop="innerCode" label="设配编号">
            </el-table-column>
            <el-table-column prop="taskType.typeName" label="工单类型" > </el-table-column>
            <el-table-column prop="createType" label="工单方式" :formatter="formatterType">
            </el-table-column>
            <el-table-column prop="taskStatusTypeEntity.statusName" label="工单状态">
            </el-table-column>
            <el-table-column prop="userName" label="运营人员"> </el-table-column>
            <el-table-column prop="createTime" label="创建日期" :formatter="formatterDate"> </el-table-column>
             <el-table-column
      fixed="right"
      label="操作"
      prop="taskId"
    >
      <template >
        <el-button type="text" @click="operationMoreMsgBtn()">详情查看</el-button>
      </template>
    </el-table-column>
          </el-table> -->

          <!-- 分页 -->
          <!-- <el-pagination layout="slot" size="10" class="pagination">
            <slot>
              <span>共{{totalCount}}条记录 第{{pageIndex}}/{{totalPage}}页</span>
            </slot>
              <el-button class="pageBtn" @click="upPage" ref="upBtn">上一页</el-button>
                <el-button class="pageBtn" @click="nextPage" ref="nextBtn">下一页</el-button>
          </el-pagination>
        </div>
      </div> -->

      <result-list
      :tableData="tableData"
      :totalPage="totalPage"
      :totalCount="totalCount"
      :pageIndex="pageIndex"
      @addOpreation="addOpreation=true"
      @operationMoreMsgBtn="operationMoreMsgBtn"
      :tableArr="tableArr"
      @upPage="upPage"
      @nextPage="nextPage"
      ></result-list>

      <!-- 新增工单弹层 -->
      <addOpreation :addOpreation="addOpreation" @close="addOpreation=false" ></addOpreation>
      <!--  工单详情弹出层 -->
      <operationMoreMsg :operationMoreMsg="operationMoreMsg" @close="operationMoreMsg=false" :moreTask="moreTask"></operationMoreMsg>
    </div>
  </div>
</template>

<script>
import ResultList from '@/components/ResultList.vue'
import MySearch from '@/components/Search.vue'
import MyButtom from '@/components/Button.vue'
import {operationSearch, getMoreTask} from '@/api/operation'
import operationMoreMsg from './component/operationMoreMsg.vue'
import addOpreation from './component/addOperation.vue'
export default {
  data() {
    return {
      operationMoreMsg: false,
      addOpreation: false,
      tableData: [],
      pageIndex: '',
      totalPage: '',
      totalCount: '',
      optionArr:["代办","进行","取消","完成"],
      tableArr:[
        {prop: 'taskCode',label:'工单编号'},
        {prop: 'innerCode',label:'设配编号'},
        {prop: 'taskType.typeName',label:'工单类型'},
        {prop: 'createType',label:'工单方式'},
        {prop: 'taskStatusTypeEntity.statusName',label:'工单状态'},
        {prop: 'userName',label:'运营人员'},
        {prop: 'createTime',label:'创建日期'}
      ],
      moreTask:{},//工单详情
    };
  },
  created(){
    this.operationSearch()
  },
  methods: {
    searchBtn(taskCode,status) {
      this.operationSearch({taskCode,status})
    },
    async operationSearch(data){
       const res = await operationSearch(data)
       console.log(res);
       this.pageIndex=res.pageIndex
       res.currentPageRecords.forEach((item,index) => item.id =(this.pageIndex -1) *10 + index + 1)
       this.tableData = res.currentPageRecords
       console.log(this.tableData);
       this.totalPage=res.totalPage
       this.totalCount=res.totalCount
    },
    // 点击上一页
    upPage(){
      this.operationSearch({
        pageIndex: --this.pageIndex,
        pageSize: 10,
        isRepair: false
      })
    },
    // 点击下一页
    nextPage(){

       this.operationSearch({
        pageIndex: ++this.pageIndex,
        pageSize: 10,
        isRepair: false
      })
    },
    // 查看工单详情
    async operationMoreMsgBtn(taskId){
       const res = await getMoreTask(taskId);
       console.log(res);
       this.moreTask=res
       this.operationMoreMsg = true
    },
  },
  components:{
    operationMoreMsg,
    addOpreation,
    MyButtom,
    MySearch,
    ResultList
  }
}
</script>

<style lang="scss" scoped>
.opeartion {
  .search {
    height: 64px;
    margin-bottom: 20px;
    padding-left: 17px;
    background-color: #fff;
    display: flex;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
    }
  }

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
}
</style>
