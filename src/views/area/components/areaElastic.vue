<template>
  <my-dialog
    dialogTitle="新增区域"
    :dialogVisible="addOpreation"
    @close="handleClose"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="区域名称" prop="regionName">
        <el-input
          v-model="ruleForm.regionName"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="备注说明" prop="remark">
        <el-input
          type="textarea"
          v-model="ruleForm.remark"
          maxlength="40"
          show-word-limit
          placeholder="请输入备注(不超过40字)"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <MyButtom bcColor="lightsalmon">取消</MyButtom>
        <MyButtom bcColor="orange">确认</MyButtom>
      </el-form-item>
    </el-form>
  </my-dialog>
</template>

<script>
import MyDialog from "@/components/Dialog.vue";
import MyButtom from "@/components/Button.vue";
export default {
  data() {
    return {
      ruleForm: {
        regionName: "",
        remark: "",
      },
      rules: {
        regionName: [{ required: true, message: "不可为空", trigger: "blur" }],
        remark: [{ required: true, message: "不可为空", trigger: "blur" }],
      },
    };
  },
  props: {
    addOpreation: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
  components: {
    MyDialog,
    MyButtom,
  },
};
</script>

<style scoped></style>
