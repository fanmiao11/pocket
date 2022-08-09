<template>
  <my-dialog
    :dialogTitle="dialogTitle"
    :dialogVisible="addOpreation"
    @close="onClose"
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
        <MyButtom bcColor="lightsalmon" @click.native="onClose">取消</MyButtom>
        <MyButtom bcColor="orange" @click.native="onSave">确认</MyButtom>
      </el-form-item>
    </el-form>
  </my-dialog>
</template>

<script>
import MyDialog from "@/components/Dialog.vue";
import MyButtom from "@/components/Button.vue";
import { addAreaApi, getAreaIdApi, editAreaApi } from "@/api/area";
export default {
  data() {
    return {
      ruleForm: {
        regionName: "",
        remark: "",
        id: "",
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
  computed: {
    dialogTitle() {
      // console.log(this.ruleForm.id);
      return this.ruleForm.id ? "编辑部门" : "添加部门";
    },
  },
  methods: {
    onClose() {
      console.log(111);
      this.$emit("update:visible", false);
      this.$refs.ruleForm.resetFields();
      this.ruleForm = {
        regionName: "",
        remark: "",
      };
    },

    async onSave() {
      try {
        if (this.ruleForm.id) {
          await editAreaApi(this.ruleForm);
          this.$message.success("修改部门成功");
          this.onClose();
          this.$emit("addsuccess");
        } else {
          // await this.$refs.ruleForm.validate();
          await addAreaApi(this.ruleForm);
          this.$message.success("新增部门成功");
          this.onClose();
          this.$emit("addsuccess");
        }
      } catch (error) {
        this.$message.error("操作部门失败");
      }
    },
    async getAreaById(id) {
      const res = await getAreaIdApi(id);
      this.ruleForm.regionName = res.name;
      this.ruleForm.remark = res.remark;
      this.ruleForm.id = res.id;
      console.log(this.ruleForm);
    },
  },
  components: {
    MyDialog,
    MyButtom,
  },
};
</script>

<style scoped></style>
