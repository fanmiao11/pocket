<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-30 20:09:42
 * @LastEditors: sj
 * @LastEditTime: 2022-08-04 18:10:27
-->
<template>
  <div class="app-main">
    <div class="opeartion">
      <!--  搜索栏 -->
      <div class="search">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="工单编号：">
            <el-input v-model="taskCode" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="工单状态">
            <el-select v-model="taskStatus" placeholder="请选择">
              <el-option label="代办" value="1"></el-option>
              <el-option label="进行" value="2"></el-option>
              <el-option label="取消" value="3"></el-option>
              <el-option label="完成" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="searchBtn"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <!-- 结果列表 -->
      <div class="result">
        <div class="operation-btn">
          <el-button
            icon="el-icon-circle-plus-outline"
            class="addNewBtn"
            @click="addOpreation = true"
            >新建</el-button
          >
          <el-button class="typeBtn">工单配置</el-button>
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
        <el-button type="text" @click="operationMoreMsgBtn(tableData.taskId)">详情查看</el-button>
      </template>
    </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-pagination layout="slot" :total="50" size="10" class="pagination">
            <slot>
              <span>共{{totalCount}}条记录 第{{pageIndex}}/{{totalPage}}页</span>
            </slot>
              <el-button class="pageBtn" @click="upPage" ref="upBtn">上一页</el-button>
                <el-button class="pageBtn" @click="nextPage" ref="nextBtn">下一页</el-button>
          </el-pagination>
        </div>
      </div>


      <!-- 新增工单弹层 -->
      <addOpreation :addOpreation="addOpreation" @close="addOpreation=false"></addOpreation>
      <!--  工单详情弹出层 -->
      <operationMoreMsg :operationMoreMsg="operationMoreMsg" @close="operationMoreMsg=false"></operationMoreMsg>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import {operationSearch} from '@/api/operation'
import operationMoreMsg from './component/operationMoreMsg.vue'
import addOpreation from './component/addOperation.vue'
export default {
  data() {
    return {
      operationMoreMsg: false,
      addOpreation: false,
      taskCode:'',
      taskStatus: '',
      tableData: [],
      pageIndex: '',
      totalPage: '',
      totalCount: '',
      taskId:'',
      num: 1
    };
  },
  created(){
    this.operationSearch()
  },
  methods: {
    searchBtn() {
      if(this.taskCode===''&&this.taskStatus==='') return this.$message('查询不能为空')
      this.operationSearch({
        taskCode: this.taskCode,
        status: this.taskStatus
      })
    },
    async operationSearch(data){
       const res = await operationSearch(data)
       console.log(res);
       this.tableData=res.currentPageRecords
       this.pageIndex=res.pageIndex
       this.totalPage=res.totalPage
       this.totalCount=res.totalCount
    },
    // 点击上一页
    upPage(){
      if(this.pageIndex === '1') {
        this.$refs.upBtn.disabled = true;
        return
      }
      this.operationSearch({
        pageIndex: --this.pageIndex,
        pageSize: 10,
        isRepair: false
      })
    },
    // 点击下一页
    nextPage(){
      if(this.pageIndex >= this.totalPage){
        this.$refs.nextBtn.disabled = true;
         return
      }
       this.operationSearch({
        pageIndex: ++this.pageIndex,
        pageSize: 10,
        isRepair: false
      })
    },
    // 查看详情
    operationMoreMsgBtn(id){
      console.log(id);
      this.formatter()
       this.operationMoreMsg = true
    },
    // 时间格式化
    formatterDate(row, column){
      return  dayjs(column.updateTime).format('YYYY-MM-DD HH:mm:ss')
    },
    // 工单方式处理
    formatterType(row, column){
      return column.createType ? '手动':'自动'
    }
      },
  components:{
    operationMoreMsg,
    addOpreation
  }
};
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
    .addNewBtn {
      width: 80px !important;
      height: 36px;
      padding: 0;
      background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
      border: none;
      color: #fff;
    }

    .typeBtn {
      width: 80px !important;
      height: 36px;
      padding: 0;
      background-color: #fbf4f0 !important;
      border: none;
      color: #655b56 !important;
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
