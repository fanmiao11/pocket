<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 20:20:38
 * @LastEditors: sj
 * @LastEditTime: 2022-08-08 20:16:45
-->
<template>
  <div class="app-main">
     <my-search nameOne="人员搜索"/>

     <ResultList></ResultList>

  </div>
</template>

<script>
import MySearch from '@/components/Search.vue'
import ResultList from '@/components/ResultList.vue'
export default {
   components:{
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

<style>

</style>
