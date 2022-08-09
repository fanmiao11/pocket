<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-07 10:05:38
 * @LastEditors: sj
 * @LastEditTime: 2022-08-07 10:05:38
-->
<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-04 13:00:53
 * @LastEditors: sj
 * @LastEditTime: 2022-08-06 22:27:11
-->
<template>
  <my-dialog
    dialogTitle="工单详情"
    :dialogVisible="operationMoreMsg"
    @close="handleClose"
  >
    <div class="task-status">

    <!-- title A-->
      <!--  完成 -->
       <template v-if="iscomplete==4">
        <img src="../../../assets/下载 (2).png" style="margin: 0 16px 0 22px" />
        <span>{{ moreTask.taskStatusTypeEntity?moreTask.taskStatusTypeEntity.statusName : '' }}</span>
        <img src="../../../assets/pic_4.3b5af41c.png" class="pic" />
      </template>
      
      <!--  代办 -->
       <template v-else-if="iscomplete==1">
        <img src="../../../assets/下载 (3).png" style="margin: 0 16px 0 22px" />
        <span>{{moreTask.taskStatusTypeEntity?moreTask.taskStatusTypeEntity.statusName : ''}}</span>
        <img src="../../../assets/pic_1.834b274c.png" class="pic" />
      </template>

       <!--  取消和进行 -->
      <template v-else>
        <img src="../../../assets/下载 (1).png" style="margin: 0 16px 0 22px" />
        <span>{{moreTask.taskStatusTypeEntity?moreTask.taskStatusTypeEntity.statusName : ''}}</span>
        <img src="../../../assets/pic_3.e8208e34.png" class="pic" />
      </template>
     <!-- title S-->
    </div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备编号:">
            <span>{{ moreTask.innerCode }}</span>
          </el-form-item>

          <!-- -->
          <template v-if="iscomplete==4">
            <el-form-item label="完成日期:">
              <span>{{ moreTask.createTime }}</span>
            </el-form-item>
          </template>
          
          <template v-else-if="iscomplete==3">
            <el-form-item label="取消日期:">
              <span>{{ moreTask.createTime }}</span>
            </el-form-item>
          </template>
          <!-- -->

          <el-form-item label="工单类型:">
            <span>{{ moreTask.taskType && moreTask.taskType.typeName }}</span>
          </el-form-item>

          <el-form-item label="工单方式:">
            <span>{{ moreTask.createType ? "手动" : "自动" }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="创建日期:">
            <span>{{ moreTask.updateTime }}</span>
          </el-form-item>

          <el-form-item label="运营人员:">
            <span>{{ moreTask.userName }}</span>
          </el-form-item>

          <el-form-item label="补货数量:">
            <span @click="isBackOrderListFn" style="color:#5F84FF;cursor: pointer;">补货详情</span>
          </el-form-item>

          <!--  -->
          <template v-if="iscomplete == 3">
            <el-form-item label="取消原因:">
              <span>{{moreTask.desc}}</span>
            </el-form-item>
          </template>
         
          <template v-else>
            <el-form-item label="备注:">
              <span>{{moreTask.desc}}</span>
            </el-form-item>
          </template>
          <!--  -->
        </el-col>
      </el-row>
    </el-form>

    <div class="dialog-footer">
      <template v-if="iscomplete==1">
        <my-buttom bcColor="lightsalmon" @click.native="cancelWorkOrder(moreTask)">取消工单</my-buttom>
      </template>
       <template v-if="iscomplete==3">
        <my-buttom bcColor="lightsalmon" @click.native="updateWorkOrder(moreTask)">重新创建</my-buttom>
      </template>
    </div>
    <!-- //// -->
    <!-- 补货清单弹窗 -->
    <el-dialog
      :modal="false"
      title="补货详情"
      :visible.sync="centerDialogVisible"
      width="640px"
    >
      <replenishmentDetails
        :list="replenishmentilst"
        :content="backOrderList"
      />
    </el-dialog>
    <!-- ///// -->

    <!-- 修改清单弹窗 -->
    <el-dialog
      :modal="false"
      title="新增工单"
      :visible.sync="isupdateWorkOrder"
      width="640px"
    >
        <updateWorkOrder :moreTask='moreTask'/>
      <span slot="footer" class="dialog-footer btn1">
        <el-button @click="isupdateWorkOrder = false">取 消</el-button>
        <el-button style="background:#FF6C28;color:#fff" @click="isupdateWorkOrder = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- <backOrderList
      :isBackOrderList="isBackOrderList"
      @close="isBackOrderList = false"
      :moreTask="moreTask"
    /> -->
  </my-dialog>
</template>

<script>
// import backOrderList from "./backOrderList.vue";
import replenishmentDetails from "./replenishmentDetails.vue";
import MyDialog from "@/components/Dialog.vue";
import MyButtom from "@/components/Button.vue";
import { getBackOrderListApi ,delWorkOrderApi} from "@/api/operation";
import updateWorkOrder from './updateOperation.vue'
export default {
  data() {
    return {
      isupdateWorkOrder:false,
      backOrderList: [],
      centerDialogVisible: false,
      formInline: {},
      // isBackOrderList: false,
      replenishmentilst: {
        channelCode: "货道编号",
        channelName: "商品",
        channelCunt: "补货数量",
      },
    };
  },
  props: {
    operationMoreMsg: {
      type: Boolean,
      default: false,
    },
    moreTask: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    handleClose(done) {
      this.$emit("close");
    },
    // 显示工单详情弹框
    isBackOrderListFn() {
      this.centerDialogVisible = true;
      this.getBackOrderList();
    },
    // 获取工单详情页数据
    async getBackOrderList() {
      this.backOrderList = await getBackOrderListApi(this.moreTask);
    },
    // 取消工单
   async cancelWorkOrder(val){
      try {
        await this.$confirm('取消工单后，将不能恢复，是否确认取消?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        await delWorkOrderApi(val?.taskId,{...val?.taskId,...val?.desc})
        this.$message.success('删除成功')
        this.$emit('refresh')
        this.handleClose()
      } catch (error) {}
    },
    // 修改工单
    updateWorkOrder(){
      this.isupdateWorkOrder = true
    }
  },
  components: {
    MyButtom,
    MyDialog,
    replenishmentDetails,
    updateWorkOrder,
    // backOrderList,
  },
  computed: {
    // 根据id判断头部显示的取消或者完成
    iscomplete() {
    return this.moreTask.taskStatusTypeEntity?.statusId
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  ::v-deep .el-dialog {
    margin-top: 5vh;
    width: 630px;
    position: relative;
    margin: 0 auto;
    background: #fff;
    box-sizing: border-box;
    border-radius: 10px;
  }

  .task-status {
    display: flex;
    align-items: center;
    height: 54px;
    margin-bottom: 25px;
    background-color: hsla(0, 0%, 92.5%, 0.39);
    .pic {
      margin-right: 76px;
      margin-bottom: 7px;
    }
    span {
      flex: 1;
    }
  }

  ::v-deep .el-form-item__label {
    width: 120px;
  }

  .dialog-footer {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
.btn1{
    position: relative;
   button:nth-of-type(1){
    position: relative;
    left: -20px;
  }
}
</style>
