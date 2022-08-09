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
      <el-form-item label="点位名称" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="所在区域" prop="regionId">
        <el-select
          v-model="ruleForm.regionId"
          placeholder="请选择"
          size="large"
          style="width: 490px"
        >
          <el-option
            v-for="item in region"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="所属商圈" prop="businessId">
        <el-select
          v-model="ruleForm.businessId"
          placeholder="请选择"
          size="large"
          style="width: 490px"
        >
          <el-option
            v-for="item in business"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="归属合作商" prop="ownerId">
        <el-select
          v-model="ruleForm.ownerId"
          placeholder="请选择"
          size="large"
          style="width: 490px"
        >
          <el-option
            v-for="item in owner"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            size="large"
            style="width: 490px"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="详细地址" prop="addr">
        <el-cascader
          size="large"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange"
        >
        </el-cascader>
        <el-input
          type="textarea"
          v-model="ruleForm.addr"
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
import { regionData, TextToCode } from "element-china-area-data";
import {
  getregion,
  getbusiness,
  getowner,
  addPointApi,
  PutPointApi,
} from "@/api/point";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        areaCode: "",
        createUserId: "",
        regionId: "",
        businessId: "",
        ownerId: "",
        ownerName: "",
        addr: "",
        id: "",
      },
      rules: {
        name: [{ required: true, message: "不可为空", trigger: "blur" }],
        areaCode: [{ required: true, message: "不可为空", trigger: "blur" }],
        createUserId: [
          { required: true, message: "不可为空", trigger: "blur" },
        ],
        regionId: [{ required: true, message: "不可为空", trigger: "blur" }],
        businessId: [{ required: true, message: "不可为空", trigger: "blur" }],
        ownerId: [{ required: true, message: "不可为空", trigger: "blur" }],
        ownerName: [{ required: true, message: "不可为空", trigger: "blur" }],
        addr: [{ required: true, message: "不可为空", trigger: "blur" }],
      },
      region: [
        {
          id: "",
          name: "",
        },
      ],
      business: [
        {
          id: "",
          name: "",
        },
      ],
      owner: [
        {
          id: "",
          name: "",
        },
      ],
      options: regionData,
      selectedOptions: [],
    };
  },
  props: {
    addOpreation: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  computed: {
    dialogTitle() {
      // console.log(this.ruleForm.id);
      return this.ruleForm.id ? "修改点位" : "新增点位";
    },
  },
  methods: {
    onClose() {
      //   console.log(111);
      this.$emit("update:visible", false);
      this.$refs.ruleForm.resetFields();
      this.selectedOptions = [];
      this.ruleForm = {
        name: "",
        areaCode: "",
        createUserId: "1",
        regionId: "",
        businessId: "",
        ownerId: "",
        ownerName: "",
        addr: "",
        id: "",
      };
    },

    async onSave() {
      try {
        if (this.ruleForm.id) {
          console.log(this.ruleForm);
          await PutPointApi(this.ruleForm);
          this.$message.success("修改部门成功");
          this.onClose();
          this.$emit("addsuccess");
        } else {
          this.owner.forEach((item) => {
            // console.log(item);
            if (this.ruleForm.ownerId === item.id) {
              this.ruleForm.ownerName = item.name;
            }
          });
          this.ruleForm.createUserId = 1;
          console.log(this.ruleForm);
          await addPointApi(this.ruleForm);
          this.$message.success("新增部门成功");
          this.onClose();
          this.$emit("addsuccess");
        }
      } catch (error) {
        this.$message.error("操作部门失败");
      }
    },
    async getAreaById(row) {
      console.log(row);
      this.addbtn();
      this.ruleForm = row;
      const arr = row.addr.split("-");
      this.ruleForm.addr = arr[arr.length - 1];
      let str = [];
      if (arr.length === 4) {
        str.push(
          TextToCode[arr[0]].code,
          TextToCode[arr[0]][arr[1]].code,
          TextToCode[arr[0]][arr[1]][arr[2]].code
        );
      } else if (arr.length === 3) {
        str.push(TextToCode[arr[0]].code, TextToCode[arr[0]][arr[1]].code);
      }
      this.selectedOptions = str;
    },
    handleChange(value) {
      this.ruleForm.areaCode = value[2];
    },
    async addbtn() {
      const res = await getregion({
        pageSize: "9999",
      });
      this.region = res.currentPageRecords;
      this.business = await getbusiness();
      const src = await getowner({
        pageSize: "9999",
      });
      this.owner = src.currentPageRecords;
    },
  },
  components: {
    MyDialog,
    MyButtom,
  },
};
</script>

<style scoped></style>
