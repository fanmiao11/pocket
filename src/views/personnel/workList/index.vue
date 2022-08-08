<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 20:23:04
 * @LastEditors: sj
 * @LastEditTime: 2022-08-08 20:05:40
-->
<template>
  <div class="app-main">
    <my-search :Two="true" nameOne="人员搜索" nameTwo="角色" :optionArr="optionArr" @search="searchBtn"> </my-search>

    <ResultList
    :isShowBtn="false"
    :tableArr="tableArr"
    :tableData="tableData"
    :totalPage="totalPage"
    :totalCount="totalCount"
    :pageIndex="pageIndex"
    :operation="operationArr"
    @operationBtn="operationBtn"
    @upPage="upPage"
    @nextPage="nextPage"
    ></ResultList>

    <!-- 查看详情弹层 -->
    <my-dialog dialogTitle="人员详情" :dialogVisible="userDialog" @close="userDialog=false">
      <UserWorkInfo :id="userId" v-if="userDialog"/>
    </my-dialog>
  </div>
</template>

<script>
import {getUserWorkList} from '@/api/personnel'
import MySearch from "@/components/Search.vue"
import ResultList from '@/components/ResultList.vue'
import MyDialog from '@/components/Dialog.vue'
import UserWorkInfo from './components/userWorkInfo.vue'
export default {
  data() {
    return {
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      optionArr: ['运营员','维修员'],
      tableArr:[
       { prop: "userName", label: "人员名称" },
       { prop: "roleName", label: "角色" },
       { prop: "mobile", label: "联系电话" },
       { prop: "workCount", label: "完成工单(本月)" },
       { prop: "progressTotal", label: "工单进行中" },
       { prop: "cancelCount", label: "拒绝工单(本月)" },
      ],
      operationArr: {
       ope: [
          { title: "查看详情", color: false },
       ]
      },
      tableData: [],
      isRepair:'',
      user:'',
      userDialog: false,
      userId:'',
    }
  },
  created() {
    this.getUserWorkList()
  },
  methods:{
    // 获取人员工作量列表
    async getUserWorkList(data) {
      const res= await getUserWorkList(data)
       this.pageIndex = res.pageIndex;
      res.currentPageRecords.forEach(
        (item, index) =>
          (item.itemIndex = (this.pageIndex - 1) * 10 + index + 1)
      );
      this.tableData = res.currentPageRecords;
      this.totalPage = res.totalPage;
      this.totalCount = res.totalCount;
    },
    // 点击查询
    searchBtn(user,role){
     if(role === 2){this.isRepair=true}
     else if(role === 1){this.isRepair=false}
     this.user = user
      this.getUserWorkList({
        pageIndex: 1,
        pageSize: 10,
        userName: this.user,
        isRepair: this.isRepair
      })
    },
    // 查看详情
    operationBtn(row, val){
      this.userId = row.userId
      this.userDialog = true

    },
     // 点击上一页
    upPage() {
      this.getUserWorkList({
        pageIndex: --this.pageIndex,
        pageSize: 10,
        userName: this.user,
        isRepair: this.isRepair
      });
    },
    // 点击下一页
    nextPage() {
      this.getUserWorkList({
        pageIndex: ++this.pageIndex,
        pageSize: 10,
        userName: this.user,
        isRepair: this.isRepair
      })
    }
  },
  components:{
    MySearch,
    ResultList,
    MyDialog,
    UserWorkInfo
  }
}
</script>

<style>

</style>
