<template>
  <my-dialog
    dialogTitle="点位详情"
    :dialogVisible="getOpreation"
    @close="handleClose"
  >
    <el-form ref="ruleForm" class="demo-ruleForm">
      <el-form-item>
        <el-table
          :data="Details"
          stripe
          style="width: 100%"
          empty-text="暂无数据"
        >
          <el-table-column type="index" width="80" label="序号">
          </el-table-column>
          <el-table-column prop="innerCode" label="机器编号"> </el-table-column>
          <el-table-column prop="vmStatus" label="设备状态"> </el-table-column>
          <el-table-column prop="lastSupplyTime" label="最后一次供货时间">
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </my-dialog>
</template>

<script>
import MyDialog from "@/components/Dialog.vue";
export default {
  data() {
    return {};
  },
  props: {
    getOpreation: {
      type: Boolean,
      default: false,
    },
    Details: {
      type: Array,
      default: [],
    },
  },
  created() {},
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
  components: {
    MyDialog,
  },
};
</script>

<style scoped></style>
