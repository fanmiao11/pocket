<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-07 10:05:58
 * @LastEditors: sj
 * @LastEditTime: 2022-08-07 10:05:59
-->
<template>
  <div class="app-main">
    <div class="opeartion">
      <!--  搜索栏 -->
      <my-search nameOne="区域搜索" @search="onsearch"></my-search>
      <!-- 列表 -->
      <result-list
        :tableArr="tableArr"
        :tableData="tableData"
        :totalPage="totalPage"
        :totalCount="totalCount"
        :pageIndex="pageIndex"
        @upPage="upPage"
        @nextPage="nextPage"
        :operation="operationArr"
        @clickAddBtn="addOpreation = true"
        @operationBtn="operationMoreMsgBtn"
      ></result-list>

      <!-- 编辑工单弹层 -->
      <area-elastic
        ref="addDept"
        :addOpreation="addOpreation"
        :visible.sync="addOpreation"
        @addsuccess="loadArea"
      ></area-elastic>
      <!-- 工单详情弹出层 -->
      <area-details
        :Details="Details"
        :Detailsname="Detailsname"
        :getOpreation="getOpreation"
        @close="getOpreation = false"
      ></area-details>
    </div>
  </div>
</template>

<script>
import ResultList from "@/components/ResultList.vue";
import MySearch from "@/components/Search.vue";
import MyButtom from "@/components/Button.vue";
import { getAreaApi, getAreaMoreApi, delAreaApi } from "@/api/area";
import areaElastic from "./components/areaElastic.vue";
import areaDetails from "./components/areaDetails.vue";
export default {
  data() {
    return {
      addOpreation: false,
      getOpreation: false,
      tableArr: [
        { prop: "name", label: "区域名称" },
        { prop: "nodeCount", label: "点位数" },
        { prop: "remark", label: "备注说明" },
      ],
      tableData: [],
      Details: [],
      Detailsname: "",
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      operationArr: {
        opeWidth: "200",
        ope: [
          // 操作
          { title: "查看详情", color: false },
          { title: "修改", color: false },
          { title: "删除", color: true },
        ],
      },
    };
  },
  created() {
    this.loadArea();
  },
  methods: {
    // 渲染
    async loadArea(data) {
      const res = await getAreaApi(data);
      console.log(res);
      this.pageIndex = res.pageIndex;
      res.currentPageRecords.forEach(
        (item, index) =>
          (item.itemIndex = (this.pageIndex - 1) * 10 + index + 1)
      );
      this.tableData = res.currentPageRecords;
      this.totalPage = res.totalPage;
      this.totalCount = res.totalCount;
    },
    // 点击上一页
    upPage() {
      this.loadArea({
        pageIndex: --this.pageIndex,
        pageSize: 10,
        isRepair: false,
      });
    },
    // 点击下一页
    nextPage() {
      this.loadArea({
        pageIndex: ++this.pageIndex,
        pageSize: 10,
        isRepair: false,
      });
    },
    async operationMoreMsgBtn(row, val) {
      // console.log(row, val);
      // 查看详情
      if (val === this.operationArr.ope[0].title) {
        const res = await getAreaMoreApi(row.id);
        this.Details = res.currentPageRecords;
        this.Detailsname = row.name;
        this.getOpreation = true;
        // console.log(this.Details);
      }
      // 编辑
      else if (val === this.operationArr.ope[1].title) {
        this.$refs.addDept.getAreaById(row.id);
        this.addOpreation = true;
      }
      // 删除
      else if (val === this.operationArr.ope[2].title) {
        try {
          await this.$confirm("此操作将永久删除该部门, 是否继续?", "提示", {
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            type: "warning",
          });
          await delAreaApi(row.id);
          this.$message.success("删除成功");
          this.loadArea({
            pageIndex: this.pageIndex,
            pageSize: 10,
            isRepair: false,
          });
        } catch (error) {}
      }
    },
    onsearch(taskCode) {
      if (taskCode) {
        let arr = [];
        this.tableData.forEach((item) => {
          if (item.name.indexOf(taskCode) !== -1) {
            arr.push(item);
          }
        });
        console.log(arr);
        this.tableData = arr;
      } else {
        this.loadArea();
      }
    },
  },
  components: {
    MyButtom,
    MySearch,
    ResultList,
    areaElastic,
    areaDetails,
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
</style>
