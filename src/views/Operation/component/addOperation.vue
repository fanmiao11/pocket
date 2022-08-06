<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-04 14:08:21
 * @LastEditors: sj
 * @LastEditTime: 2022-08-04 14:45:42
-->
<template>
    <my-dialog
    dialogTitle="新增工单"
    :dialogVisible="addOpreation"
    @close="handleClose"
  >
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="设备编号" prop="number" >
    <el-input v-model="ruleForm.number" placeholder="请输入" maxlength="15" show-word-limit></el-input>
  </el-form-item>
  <el-form-item label="工单类型" prop="type">
    <el-select v-model="ruleForm.type" placeholder="请选择">
      <el-option label="补货工单" value="type"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="补货数量" >
    <span>补货清单</span>
  </el-form-item>
    <el-form-item label="运营人员" prop="people">
    <el-select v-model="ruleForm.people" placeholder="请选择">
      <!-- <el-option label="补货工单" value="people"></el-option> -->
    </el-select>
  </el-form-item>
  <el-form-item label="备注" prop="tip">
    <el-input type="textarea" v-model="ruleForm.tip" maxlength="40" show-word-limit placeholder="请输入备注（不超过40字）"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button >取消</el-button>
    <el-button >确认</el-button>
  </el-form-item>
</el-form>
  </my-dialog>
</template>

<script>
import MyDialog from '@/components/Dialog.vue'
export default {
  data() {
    return {
      ruleForm:{
         number: '',
         type: '',
         tip: '',
         people: '',
      },
      rules:{
         number: [
            { required: true, message: '不可为空', trigger: 'blur' }
          ],
           type: [
            { required: true, message: '不可为空', trigger: 'blur' }
          ],
           tip: [
            { required: true, message: '不可为空', trigger: 'blur' }
          ],
           people: [
            { required: true, message: '不可为空', trigger: 'blur' }
          ],
      }
    }
    },
  props:{
    addOpreation:{
      type:Boolean,
      default: false
    }
  },
  methods:{
    handleClose(){
      this.$emit('close');
    }
  },
  components:{
    MyDialog
  }
}
</script>

<style>

</style>
