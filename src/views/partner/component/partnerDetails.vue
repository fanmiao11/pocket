<template>
  <my-dialog
    dialogTitle="区域详情"
    :dialogVisible="getOpreation"
    @close="handleClose"
  >
    <el-form
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      :inline="true"
    >
      <div>
        <el-form-item label="合作商名称:"
          ><span>{{
            Details[0] ? Details[0].name : "name"
          }}</span></el-form-item
        >
        <el-form-item label="联系人:"
          ><span>{{
            Details[0] ? Details[0].contact : "contact"
          }}</span></el-form-item
        >
      </div>
      <div>
        <el-form-item label="联系电话:"
          ><span>{{
            Details[0] ? Details[0].mobile : "mobile"
          }}</span></el-form-item
        >
        <el-form-item label="分成比例:"
          ><span
            >{{ Details[0] ? Details[0].ratio : "ratio" }}%</span
          ></el-form-item
        >
      </div>
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
