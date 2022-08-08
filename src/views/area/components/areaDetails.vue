<template>
  <my-dialog
    dialogTitle="区域详情"
    :dialogVisible="getOpreation"
    @close="handleClose"
  >
    <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="区域名称:"
        ><span>{{ Detailsname }}</span></el-form-item
      >

      <el-form-item label="备注说明:">
        <el-table
          :data="Details"
          stripe
          style="width: 100%"
          empty-text="暂无数据"
        >
          <el-table-column type="index" width="80" label="序号">
          </el-table-column>
          <el-table-column prop="name" label="点位名称" width="180">
          </el-table-column>
          <el-table-column prop="vmCount" label="设备数量"> </el-table-column>
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
    Detailsname: {
      type: String,
    },
    Details: {
      type: Array,
      default: [],
    },
  },
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
