<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-07 10:05:58
 * @LastEditors: sj
 * @LastEditTime: 2022-08-07 11:29:14
-->
<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-30 20:09:42
 * @LastEditors: sj
 * @LastEditTime: 2022-08-07 10:05:51
-->
<template>
  <div class="app-main" v-loading="loading">
    <div class="opeartion">
      <!--  搜索栏 -->
      <my-search
        nameOne="工单编号"
        nameTwo="工单状态"
        :optionArr="optionArr"
        :Two="true"
        @search="searchBtn"
      ></my-search>

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
        @clickAddBtn="addOpreation = true"
        @operationBtn="operationMoreMsgBtn"
        :tableArr="tableArr"
        @upPage="upPage"
        @nextPage="nextPage"
        :isShowSecondBtn="true"
        secondBtnContent="工单配置"
        :operation="operationArr"
        @clickSecondBtn="showWorkOrderConfiguration"
      ></result-list>

      <!-- 工单配置弹层 -->
      <el-dialog
        :modal="false"
        title="工单配置:"
        :visible.sync="workOrderConfiguration"
        width="640px"
      >
        <workOrderConfiguration ref="workOrderConfiguration" :num="num" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="workOrderConfiguration = false">取 消</el-button>
          <el-button
            style="background: #ff6c28; color: #fff"
            @click.native="replenishmentWarning"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 新增工单弹层 -->
      <addOpreation
        :addOpreation="addOpreation"
        @close="addOpreation = false"
      ></addOpreation>
      <!--  工单详情弹出层 -->
      <operationMoreMsg
        :operationMoreMsg="operationMoreMsg"
        @close="operationMoreMsg = false"
        :moreTask="moreTask"
        @refresh="searchBtn(null, 1)"
      ></operationMoreMsg>
    </div>
  </div>
</template>

<script>
import ResultList from "@/components/ResultList.vue";
import MySearch from "@/components/Search.vue";
import MyButtom from "@/components/Button.vue";
import {
  operationSearch,
  getMoreTask,
  replenishmentWarningApi,
  getReplenishmentWarningApi,
} from "@/api/operation";
import operationMoreMsg from "./component/operationMoreMsg.vue";
import addOpreation from "./component/addOperation.vue";
import workOrderConfiguration from "./component/workOrderConfiguration.vue";
export default {
  data() {
    return {
      num: null,
      workOrderConfiguration: false,
      operationMoreMsg: false,
      addOpreation: false,
      tableData: [],
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      optionArr: ["代办", "进行", "取消", "完成"],
      tableArr: [
        { prop: "taskCode", label: "工单编号" },
        { prop: "innerCode", label: "设配编号" },
        { prop: "taskType.typeName", label: "工单类型" },
        { prop: "createType", label: "工单方式" },
        { prop: "taskStatusTypeEntity.statusName", label: "工单状态" },
        { prop: "userName", label: "运营人员" },
        { prop: "createTime", label: "创建日期" },
      ],
      moreTask:{},//工单详情
      operationArr:{
        ope:[ // 操作
        {title: '查看详情', color: false},
      ]
      }
    };
  },
  created() {
    this.operationSearch();
  },
  methods: {
    async searchBtn(taskCode, status) {
      this.loading = true;
      this.status = status;
      this.operationSearch({ taskCode, status,isRepair: false, });
      this.loading = false;
    },
    // 获取页面所有的数据
    async operationSearch(data) {
      this.loading = true;
      const res = await operationSearch({isRepair: false,...data});
      this.pageIndex = res.pageIndex;
      res.currentPageRecords.forEach(
        (item, index) =>
          (item.itemIndex = (this.pageIndex - 1) * 10 + index + 1)
      );
      this.tableData = res.currentPageRecords;
      this.totalPage = res.totalPage;
      this.totalCount = res.totalCount;
      this.loading = false;
    },
    // 点击上一页
    upPage() {
      this.operationSearch({
        status: this.status,
        pageIndex: --this.pageIndex,
        pageSize: 10,
        isRepair: false,
      });
    },
    // 点击下一页
    nextPage() {
      this.operationSearch({
        status: this.status,
        pageIndex: ++this.pageIndex,
        pageSize: 10,
        isRepair: false,
      });
    },
    // 查看工单详情
    async operationMoreMsgBtn(row, val) {
      const res = await getMoreTask(row?.taskId);
      this.moreTask = res;
      this.operationMoreMsg = true;
    },
    // 获取工单配置弹层并赋值
    async showWorkOrderConfiguration() {
      const res = await getReplenishmentWarningApi();
      this.num = res;
      this.workOrderConfiguration = true;
    },
    // 设置工单配置弹层并修改
    async replenishmentWarning() {
      try {
        await replenishmentWarningApi({
          alertValue: this.$refs.workOrderConfiguration.index,
        });
        this.workOrderConfiguration = false;
        this.operationSearch(this.data);
      } catch (error) {}
    },
  },
  components: {
    operationMoreMsg,
    addOpreation,
    MyButtom,
    MySearch,
    ResultList,
    workOrderConfiguration,
  },
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
        font-size: 16px !important;
        color: #dbdfe5 !important;
      }

      .pageBtn {
        width: 70px;
        height: 32px;
        margin: 0 16px;
        border-radius: 2px;
        background-color: #d5ddf8;
      }
    }
  }
}
.dialog-footer {
  position: relative;
  left: -200px;

  button:nth-of-type(1) {
    position: relative;
    left: -20px;
  }
}
</style>
