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
      <el-form-item label="合作商名称:" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="联系人:" prop="contact">
        <el-input
          v-model="ruleForm.contact"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="联系电话:" prop="mobile">
        <el-input
          v-model="ruleForm.mobile"
          placeholder="请输入"
          maxlength="11"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="分成比例:" prop="ratio">
        <el-input-number
          v-model="ruleForm.ratio"
          placeholder="请输入"
          controls-position="right"
          :min="0"
          :max="100"
          size="large"
          style="width: 490px"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="账号" prop="account" v-if="showPart">
        <el-input
          v-model="ruleForm.account"
          placeholder="请输入"
          maxlength="18"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" v-if="showPart">
        <el-input
          v-model="ruleForm.password"
          placeholder="请输入"
          maxlength="20"
          show-word-limit
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
import { addPartnerApi, editPartnerApi } from "@/api/partner";
export default {
  data() {
    return {
      show: true,
      ruleForm: {
        name: "",
        contact: "",
        mobile: "",
        ratio: undefined,
        account: "",
        password: "",
        id: "",
      },
      rules: {
        name: [{ required: true, message: "不可为空", trigger: "blur" }],
        contact: [{ required: true, message: "不可为空", trigger: "blur" }],
        mobile: [{ required: true, message: "不可为空", trigger: "blur" }],
        ratio: [{ required: true, message: "不可为空", trigger: "blur" }],
        account: [{ required: true, message: "不可为空", trigger: "blur" }],
        password: [{ required: true, message: "不可为空", trigger: "blur" }],
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
    showPart() {
      return this.ruleForm.id ? (this.show = false) : (this.show = true);
    },
    dialogTitle() {
      //   console.log(this.ruleForm.id);
      return this.ruleForm.id ? "编辑合作商" : "新增合作商";
    },
  },
  methods: {
    onClose() {
      //   console.log(111);
      this.$emit("update:visible", false);
      this.$refs.ruleForm.resetFields();
      this.ruleForm = {
        name: "",
        contact: "",
        mobile: "",
        ratio: undefined,
        account: "",
        password: "",
        id: "",
      };
    },

    async onSave() {
      try {
        if (this.ruleForm.id) {
          await editPartnerApi(this.ruleForm);
          this.$message.success("修改部门成功");
          this.onClose();
          this.$emit("addsuccess");
        } else {
          // await this.$refs.ruleForm.validate();
          await addPartnerApi(this.ruleForm);
          this.$message.success("新增部门成功");
          this.onClose();
          this.$emit("addsuccess");
        }
      } catch (error) {
        this.$message.error("操作部门失败");
      }
    },
    getPartnerById(res) {
      this.ruleForm.name = res.name;
      this.ruleForm.contact = res.contact;
      this.ruleForm.mobile = res.mobile;
      this.ruleForm.ratio = res.ratio;
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
