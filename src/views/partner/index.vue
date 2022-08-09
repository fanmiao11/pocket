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
      <my-search nameOne="合作商搜索" @search="onsearch"></my-search>
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
      <partnerElastic
        ref="addDept"
        :addOpreation="addOpreation"
        :visible.sync="addOpreation"
        @addsuccess="loadArea({ pageSize: 10 })"
      ></partnerElastic>
      <!-- 工单详情弹出层 -->
      <partnerDetails
        :Details="Details"
        :getOpreation="getOpreation"
        @close="getOpreation = false"
      ></partnerDetails>
    </div>
  </div>
</template>

<script>
import ResultList from "@/components/ResultList.vue";
import MySearch from "@/components/Search.vue";
import MyButtom from "@/components/Button.vue";
import { getPartnerApi, delPartnerApi, putPartnerApi } from "@/api/partner";
import partnerElastic from "./component/partnerElastic.vue";
import partnerDetails from "./component/partnerDetails.vue";

export default {
  data() {
    return {
      addOpreation: false,
      getOpreation: false,
      tableArr: [
        { prop: "name", label: "合作商名称" },
        { prop: "account", label: "账号" },
        { prop: "vmCount", label: "设备数量" },
        { prop: "ratio", label: "分成比例" },
        { prop: "contact", label: "联系人" },
        { prop: "mobile", label: "联系电话" },
      ],
      tableData: [],
      Details: [],
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      operationArr: {
        opeWidth: "300",
        ope: [
          // 操作
          { title: "重置密码", color: false },
          { title: "查看详情", color: false },
          { title: "修改", color: false },
          { title: "删除", color: true },
        ],
      },
    };
  },
  created() {
    this.loadArea({ pageSize: 10 });
  },
  methods: {
    // 渲染
    async loadArea(data) {
      // console.log(data);
      const res = await getPartnerApi(data);
      this.pageIndex = res.pageIndex;
      res.currentPageRecords.forEach((item, index) => {
        // console.log(item);
        item.ratio = item.ratio + "%";
        item.itemIndex = (this.pageIndex - 1) * 10 + index + 1;
      });
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
      if (val === this.operationArr.ope[0].title) {
        try {
          await this.$confirm("此操作将重置该密码, 是否继续?", "提示", {
            confirmButtonText: "重置",
            cancelButtonText: "取消",
            type: "warning",
          });
          await putPartnerApi(row.id);
          this.$message.success("重置成功");
          this.loadArea({
            pageIndex: this.pageIndex,
            pageSize: 10,
            isRepair: false,
          });
        } catch (error) {}
      }
      // 查看详情
      else if (val === this.operationArr.ope[1].title) {
        const res = await getPartnerApi(row);
        this.Details = res.currentPageRecords;
        this.getOpreation = true;
      }
      // 编辑
      else if (val === this.operationArr.ope[2].title) {
        const res = await getPartnerApi(row);
        // console.log(res.currentPageRecords);
        this.$refs.addDept.getPartnerById(res.currentPageRecords[0]);
        this.addOpreation = true;
      }
      // 删除
      else if (val === this.operationArr.ope[3].title) {
        try {
          await this.$confirm("此操作将永久删除该部门, 是否继续?", "提示", {
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            type: "warning",
          });
          await delPartnerApi(row.id);
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
        this.loadArea({ pageSize: 10 });
      }
    },
  },
  components: {
    MyButtom,
    MySearch,
    ResultList,
    partnerElastic,
    partnerDetails,
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
