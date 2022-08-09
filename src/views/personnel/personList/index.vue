<template>
  <div class="app-main">
    <my-search nameOne="人员搜索" @search="searchUser" />

    <ResultList
      :tableData="tableData"
      :totalPage="totalPage"
      :totalCount="totalCount"
      :pageIndex="pageIndex"
      :tableArr="tableArr"
      :operation="operationArr"
      @upPage="upPage"
      @nextPage="nextPage"
      @operationBtn="operationBtn"
      @clickAddBtn="clickAddBtn"
    ></ResultList>

    <!-- 修改弹层 -->
    <MyDialog :dialogVisible="editDialog" :dialogTitle="dialogTitle" @close="closeDialog" v-if="editDialog">
      <EditInfo @close="editDialog=false" @success="getUserList()" :userInfo="userInfo" ref="edit"/>
    </MyDialog>
  </div>
</template>

<script>
import { getUserList, deluserInfo } from "@/api/personnel";
import MySearch from "@/components/Search.vue";
import ResultList from "@/components/ResultList.vue";
import MyDialog from "@/components/Dialog.vue";
import EditInfo from "./componments/editInfo.vue";
export default {
  data() {
    return {
      dialogTitle: "",
      tableData: [],
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      tableArr: [
        { prop: "userName", label: "人员名称" },
        { prop: "regionName", label: "归属区域" },
        { prop: "role.roleName", label: "角色" },
        { prop: "mobile", label: "联系电话" },
      ],
      operationArr: {
        ope: [
          // 操作
          { title: "修改", color: false },
          { title: "删除", color: true },
        ],
      },
      editDialog: false,
      userInfo: {}, // 点击当前行的信息
    };
  },
  created() {
    this.getUserList();
  },
  components: {
    MySearch,
    ResultList,
    MyDialog,
    EditInfo,
  },
  methods: {
    async getUserList(data) {
      const res = await getUserList(data);
      // console.log(res);
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
      this.getUserList({
        pageIndex: --this.pageIndex,
        pageSize: 10,
      });
    },
    // 点击下一页
    nextPage() {
      this.getUserList({
        pageIndex: ++this.pageIndex,
        pageSize: 10,
      });
    },
    // 点击修改
    async operationBtn(row, val) {
      if (val === "修改") {
        this.dialogTitle = "编辑人员";
        this.editDialog = true;
        this.userInfo = row;
      } else if (val === "删除") {
        await deluserInfo(row.id);
        this.getUserList();
        this.$message.success("删除成功");
      }
    },
    //点击新增
    clickAddBtn() {
      this.dialogTitle = "新增人员";
      this.editDialog = true;
      this.userInfo={}
    },
    // 点击搜索
    searchUser(val) {
      this.getUserList({ userName: val });
    },
    // 关闭谈层 x 号
    closeDialog() {
      this.editDialog = false;
      this.$refs.edit.$refs.Form.resetFields();
      this.$refs.edit.ruleForm = {
        userName: "", // 用户名
        roleId: "", //角色Id integer
        mobile: "", // 手机号
        regionId: "", // 所属区域Id
        regionName: "", //所属区域名称
        status: true, //启用状态
        image: "", //头像Url
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
