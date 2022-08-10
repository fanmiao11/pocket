<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 20:11:13
 * @LastEditors: sj
 * @LastEditTime: 2022-08-03 20:11:13
-->
<template>
  <div class="app-main">
    <d-search nameOne="设备编号" @search="searchFn" />
    <el-card v-loading="loading">
      <result-list
        secondBtnContent="批量操作"
        :isShowSecondBtn="true"
        :totalPage="totalPage"
        :totalCount="totalCount"
        :pageIndex="pageIndex"
        :tableData="tableData"
        :tableArr="tableArr"
        @upPage="upPage"
        @nextPage="nextPage"
        @clickAddBtn="clickAddBtn"
        @clickSecondBtn="policyListFn"
        @handleSelectionChange="handleSelectionChange"
        @operationBtn="operationBtn"
        :operation="{
          opeWidth: '200',
          ope: [
            { title: '货道', color: false },
            { title: '策略', color: false },
            { title: '修改', color: false },
          ],
        }"
        :selection="true"
      />
    </el-card>
    <!-- 新增弹框 -->
    <d-dialog
      dialogTitle="新增设备"
      :dialogVisible="dialogVisible"
      @close="closeFn"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-form-item label="设备编号："> 系统自动生成 </el-form-item>
        <el-form-item label="选择型号：" prop="vmType">
          <el-select v-model="form.vmType" clearable placeholder="请选择">
            <el-option
              v-for="item in typeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择点位：" prop="nodeId">
          <el-select v-model="form.nodeId" clearable placeholder="请选择">
            <el-option
              v-for="item in nodeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="footer-btn">
        <my-buttom bcColor="lightsalmon" @click.native="closeFn"
          >取消</my-buttom
        >
        <my-buttom bcColor="orange" @click.native="addVm">确认</my-buttom>
      </div>
    </d-dialog>
    <!-- 批量操作弹框 -->
    <d-dialog
      :dialogTitle="dialogTitle"
      :dialogVisible="policyDialog"
      @close="closePolicy"
    >
      <el-form
        ref="policyForm"
        :model="policyForm"
        :rules="policyRules"
        label-width="140px"
        v-loading="policyLoading"
      >
        <el-form-item label="选择策略：" prop="policy">
          <el-select v-model="policyForm.policy" clearable placeholder="请选择">
            <el-option
              v-for="item in policyList"
              :key="item.policyId"
              :label="item.policyName"
              :value="item.policyId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="footer-btn">
        <my-buttom bcColor="lightsalmon" @click.native="closePolicy"
          >取消</my-buttom
        >
        <my-buttom bcColor="orange" @click.native="policyChange"
          >确认</my-buttom
        >
      </div>
    </d-dialog>
    <!-- 修改功能弹窗 -->
    <revise-dialog
      :show="reviseDialogShow"
      @close="reviseDialogShow = false"
      :formData="rowData"
      ref="oo"
      :nodeArr="nodeArr"
    ></revise-dialog>
    <!-- 货道弹框 -->
    <channel-dialog
      :show="channelDialogShow"
      @close="channelDialogShow = false"
      :formData="rowData"
    ></channel-dialog>
  </div>
</template>

<script>
import DSearch from "@/components/Search.vue";
import ResultList from "@/components/ResultList.vue";
import DDialog from "@/components/Dialog.vue";
import MyButtom from "@/components/Button.vue";
import ReviseDialog from "./components/reviseDialog.vue";
import ChannelDialog from "./components/channelDialog.vue";
import {
  getSearchList,
  addVm,
  getTypeList,
  searchNode,
  getPolicyList,
  applyPolicy,
} from "@/api/vm";

export default {
  components: {
    DSearch,
    ResultList,
    DDialog,
    MyButtom,
    ReviseDialog,
    ChannelDialog,
  },

  data() {
    return {
      policyLoading: false,
      searchParams: {}, // 搜索数据
      searchList: [], // table渲染列表（根据搜索获得）
      tableData: [], //table 渲染数据
      pageIndex: "", // 当前页数
      totalPage: "", //  总页数
      totalCount: "", // 总共多少条记录
      loading: false, // 控制加载
      tableArr: [
        { prop: "innerCode", label: "设备编号" },
        { prop: "type.name", label: "设备型号" },
        { prop: "node.addr", label: "详细地址" },
        { prop: "ownerName", label: "合作商" },
        { prop: "vmStatus", label: "运营状态" },
      ],
      dialogVisible: false, // 控制新增弹框显隐
      // form 表单内容
      form: {
        vmType: "",
        nodeId: "",
        createUserId: 1, // 创建人id
      },
      // 校验规则
      rules: {
        vmType: [{ required: true, message: "请输入", trigger: "change" }],
        nodeId: [{ required: true, message: "请输入", trigger: "change" }],
      },
      typeArr: [], // 类型列表
      nodeArr: [], //点位列表
      policyList: [], //策略列表
      policyDialog: false, //控制策略弹框显隐
      // policy 表单内容
      policyForm: {
        policy: "",
      },
      // policy表单验证
      policyRules: {
        policy: [{ required: true, message: "请输入", trigger: "change" }],
      },
      // 多选框内容
      checkboxList: [],
      dialogTitle: "批量策略管理",
      reviseDialogShow: false, // 修改弹窗显隐
      rowData: {}, // 表格单列数据（点击操作）
      channelDialogShow: false,
    };
  },

  created() {
    this.getSearchList(this.searchParams);
  },

  methods: {
    // 获取渲染列表
    async getSearchList(data) {
      this.loading = true;
      const res = await getSearchList(data);
      this.pageIndex = res.pageIndex;
      this.totalPage = res.totalPage;
      this.totalCount = res.totalCount;
      this.changeTableData(res.currentPageRecords);
      this.loading = false;
    },
    // 更改数据
    changeTableData(arr) {
      let arr1 = arr;
      arr1.forEach((ele, index) => {
        if (ele.vmStatus === 0) {
          ele.vmStatus = "未投放";
        } else if (ele.vmStatus === 1) {
          ele.vmStatus = "运营";
        } else {
          ele.vmStatus = "撤机";
        }
        ele.itemIndex = (this.pageIndex - 1) * 10 + index + 1;
        // dayjs(ele.createTime);
        // ele.createTime = dayjs().format("YYYY.MM.DD HH.mm.ss");
        this.tableData = arr1;
        // console.log(this.tableData);
      });
    },
    // 点击上一页
    upPage() {
      this.getSearchList({
        pageIndex: --this.pageIndex,
        pageSize: 10,
        isRepair: false,
      });
    },
    // 点击下一页
    nextPage() {
      this.getSearchList({
        pageIndex: ++this.pageIndex,
        pageSize: 10,
        isRepair: false,
      });
    },
    // 搜索
    searchFn(val) {
      this.getSearchList({ innerCode: val });
    },
    // 点击新增按钮
    async clickAddBtn() {
      this.dialogVisible = true;
      // 售货机类型列表 用来获取所有型号
      const TypeList = await getTypeList({
        pageIndex: 1,
        pageSize: 100000,
      });
      // 数组去重，获取所有型号
      const typeArr = [];
      TypeList.currentPageRecords.forEach((ele) => {
        typeArr.push({ label: ele.name, value: ele.typeId });
      });
      this.typeArr = Array.from(new Set(typeArr));
      this.getNodeArr();
    },
    // 获取所有点位
    async getNodeArr() {
      this.nodeArr = [];
      const nodeArr = [];
      const { currentPageRecords } = await searchNode();
      currentPageRecords.forEach((ele) => {
        nodeArr.push({ label: ele.name, value: ele.id });
      });
      this.nodeArr = Array.from(new Set(nodeArr));
    },
    // 弹框确定按钮
    async addVm() {
      if (this.form.vmType === "" || this.form.nodeId === "")
        return this.$message.error("请填写完整");
      try {
        await addVm(this.form);
        this.dialogVisible = false;
        this.form = {
          vmType: "",
          nodeId: "",
          createUserId: 1, // 创建人id
        };
        this.getSearchList(this.searchParams);
      } catch (error) {}
    },
    // 弹框关闭
    closeFn() {
      this.dialogVisible = false;
      this.$refs.form.resetFields();
      this.form = {
        vmType: "",
        nodeId: "",
        createUserId: 1, // 创建人id
      };
    },
    // 批量操作
    async policyListFn() {
      this.dialogTitle = "批量策略管理";
      if (!this.checkboxList.length)
        return this.$message.warning("请勾选售货机");
      this.policyDialog = true;
      this.policyList = await getPolicyList();
    },
    // 关闭批量操作弹框
    closePolicy() {
      this.policyDialog = false;
      this.$refs.policyForm.resetFields();
      this.policyForm = {
        policy: "",
      };
    },
    // 多选框
    handleSelectionChange(vel) {
      // console.log(vel);
      this.checkboxList = [];
      vel.forEach((ele) => {
        this.checkboxList.push(ele.innerCode);
      });
    },
    // 更改策略
    async policyChange() {
      try {
        this.policyLoading = true;
        await applyPolicy(this.checkboxList, this.policyForm.policy);
        this.closePolicy();
        this.policyLoading = false;
        this.checkboxList = [];
        // console.log(arr);
      } catch (error) {
        this.policyLoading = false;
      }
    },
    // 点击操作
    async operationBtn(row, vel) {
      if (vel === "策略") {
        this.checkboxList = [];
        this.dialogTitle = "策略管理";
        this.policyDialog = true;
        this.checkboxList.push(row.innerCode);
        this.policyList = await getPolicyList();
      }
      if (vel === "修改") {
        this.reviseDialogShow = true;
        this.rowData = row;
        this.$refs.oo.form.nodeId = row.nodeId;
        this.getNodeArr();
        // console.dir(row);
      }
      if (vel === "货道") {
        this.channelDialogShow = true;
        this.rowData = row;
        // console.log(row);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 85%;
}
.footer-btn {
  width: 100%;
  text-align: center;
  // position: relative;
  // top: -15px;
}
</style>
