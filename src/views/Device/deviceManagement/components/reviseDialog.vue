<template>
  <div>
    <d-dialog dialogTitle="修改设备" :dialogVisible="show" @close="closePolicy">
      <el-form
        ref="formPolicy"
        :model="form"
        label-width="130px"
        :rules="rules"
      >
        <el-form-item label="机器编号：">
          {{ formData.innerCode }}
        </el-form-item>
        <el-form-item label="供货时间：">
          {{ time }}
        </el-form-item>
        <el-form-item label="设备类型：">
          {{ formData.type && formData.type.name }}
        </el-form-item>
        <el-form-item label="设备容量：">
          {{ formData.type && formData.type.channelMaxCapacity }}
        </el-form-item>
        <el-form-item label="设备点位：" prop="nodeId">
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
        <el-form-item label="合作商：">
          {{ formData.ownerName }}
        </el-form-item>
        <el-form-item label="所属区域：">
          {{ formData.node && formData.node.region.name }}
        </el-form-item>
        <el-form-item label="设备地址：">
          {{ formData.node && formData.node.addr }}
        </el-form-item>
      </el-form>
      <div class="footer-btn">
        <my-buttom bcColor="lightsalmon" @click.native="closePolicy"
          >取消</my-buttom
        >
        <my-buttom bcColor="orange" @click.native="confirm">确认</my-buttom>
      </div>
    </d-dialog>
  </div>
</template>

<script>
import DDialog from "@/components/Dialog.vue";
import MyButtom from "@/components/Button.vue";
import { reviseNodeId } from "@/api/vm";
import dayjs from "dayjs";
export default {
  name: "reviseDialog",
  data() {
    return {
      form: {
        nodeId: "",
      },
      rules: {
        nodeId: [{ required: true, message: "请输入", trigger: "change" }],
      },
    };
  },

  created() {},

  methods: {
    closePolicy() {
      this.$emit("close");
      this.$refs.formPolicy.resetFields();
      this.form = {
        nodeId: "",
      };
    },
    async confirm() {
      try {
        if (!this.form.nodeId) return this.$message.warning("请选择");
        await reviseNodeId(this.formData.id, this.form.nodeId);
        this.closePolicy();
        this.$message.success("更改点位成功");
      } catch (error) {
        // console.dir(error);
        this.$message.warning(error.response.data);
      }
    },
  },

  components: {
    DDialog,
    MyButtom,
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      required: true,
    },
    nodeArr: {
      type: Array,
      required: true,
    },
  },

  computed: {
    time() {
      dayjs(this.formData.lastSupplyTime);
      return dayjs().format("YYYY.MM.DD HH:mm:ss");
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-btn {
  width: 100%;
  text-align: center;
}
::v-deep .el-form-item__content {
  line-height: 36px;
}
::v-deep .el-form-item__label {
  line-height: 36px;
}
.el-form-item {
  margin-bottom: 20px;
}
</style>
