<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="设备编号" prop="innerCode">
        <el-input
          v-model="ruleForm.innerCode"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="工单类型" prop="taskType">
        <el-select
          style="width: 100%"
          v-model="ruleForm.taskType.typeName"
          placeholder="请选择"
        >
          <el-option label="补货工单" value="type"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="补货数量">
        <span class="el-icon-document" style="color: #5f84ff"></span>
        <span
          style="color: #5f84ff; cursor: pointer"
          @click="centerDialogVisible = true"
          >补货清单</span
        >
      </el-form-item>

      <el-form-item label="运营人员" prop="userName">
        <el-select
          style="width: 100%"
          v-model="ruleForm.userName"
          placeholder="请选择"
        >
          <!-- <el-option label="补货工单" value="people"></el-option> -->
        </el-select>
      </el-form-item>

      <el-form-item label="备注" prop="tip">
        <el-input
          type="textarea"
          v-model="ruleForm.desc"
          maxlength="40"
          show-word-limit
          placeholder="请输入备注（不超过40字）"
        ></el-input>
      </el-form-item>

      <!-- 补货清单弹窗 -->
      <el-dialog
        :modal="false"
        title="补货详情"
        :visible.sync="centerDialogVisible"
        width="640px"
      >
        <replenishmentDetails :list="replenishmentilst" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button
            style="background: #ff6c28; color: #fff"
            @click="centerDialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import replenishmentDetails from "./replenishmentDetails.vue";
export default {
  props: {
    moreTask: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      ruleForm: {
        innerCode: "",
        taskType: {},
        userName: "",
        desc: "",
      },
      rules: {
        innerCode: [{ required: true, message: "不可为空", trigger: "blur" }],
        taskType: [{ required: true, message: "不可为空", trigger: "blur" }],
        userName: [{ required: true, message: "不可为空", trigger: "blur" }],
      },
      centerDialogVisible: false,
      //假数据
      replenishmentilst: {
        channelCode: "货道编号",
        channelName: "商品名称",
        channelCunt: "当前数量",
        channelAdd: "还可添加",
        channelQquantity: "补满数量",
      },
    };
  },
  watch: {
    moreTask: {
      deep: true,
      handler(newVal, oldVal) {
        this.$refs.ruleForm.resetFields()
        this.ruleForm ={}
        this.ruleForm = newVal;
      },
    },
  },
  components: {
    replenishmentDetails,
  },
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  position: relative;
  left: -200px;

  button:nth-of-type(1) {
    position: relative;
    left: -20px;
  }
}
</style>
>
