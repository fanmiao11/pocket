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
      <el-input @blur="getOperatingPersonnel" v-model="ruleForm.number" placeholder="请输入" maxlength="15" show-word-limit></el-input>
    </el-form-item>

    <el-form-item label="工单类型" prop="type">
      <el-select style="width:100%" v-model="ruleForm.type" placeholder="请选择">
        <el-option label="补货工单" value="type"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="补货数量">
      <span class="el-icon-document" style="color:#5F84FF"></span>
      <span style="color:#5F84FF;cursor:pointer;" @click="centerDialogVisible = true">补货清单</span>
    </el-form-item>

    <el-form-item label="运营人员" prop="people">
      <el-select style="width:100%" v-model="ruleForm.people" placeholder="请选择">
       <el-option v-for="item in operatingPersonnelList" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="备注" prop="tip">
      <el-input type="textarea" v-model="ruleForm.tip" maxlength="40" show-word-limit placeholder="请输入备注（不超过40字）"></el-input>
    </el-form-item>

    <el-form-item class="btn">
      <el-button @click.native="handleClose">取消</el-button>
      <el-button @click.native="addWorkOrder">确认</el-button>
    </el-form-item>

    <!-- 补货清单弹窗 -->
    <el-dialog
      :modal="false"
      title="补货详情"
      :visible.sync="centerDialogVisible"
      width="640px"
    >
     <replenishmentDetails  ref="replenishment" :list='replenishmentilst' :content="vendingMachineAisl" type="1"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button style="background:#FF6C28;color:#fff" @click.native="replenishment"
          >确 定</el-button
        >
      </span>
    </el-dialog>

  </el-form>
</my-dialog>
</template>

<script>
import MyDialog from '@/components/Dialog.vue'
import replenishmentDetails from './replenishmentDetails.vue'
import { getOperatingPersonnelApi ,getVendingMachineAisleApi,addWorkOrderApi} from '@/api/operation.js'
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
      },
      centerDialogVisible: false,
      // 新增补货详情头部数据
       replenishmentilst:{
        channelCode:"货道编号",
        channelName:"商品名称",
        channelCunt:"当前数量",
        channelAdd:"还可添加",
        channelQquantity:"补满数量",
       },
      //  运营人员列表
       operatingPersonnelList:[],
      //  售货机补货详情列表
       vendingMachineAisl:[],
      // 售货机补货详情列表被修改后的
      updateVendingMachineAisl:[]
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
      this.$refs.ruleForm.resetFields()
      this.ruleForm ={}
      this.$emit('close');
    },
    // 获取运营人员列表
   async getOperatingPersonnel(){
    this.vendingMachineAisl = []
    if(this.ruleForm.number?.length <= 0) {
      return 
    }
    // 人员
    const res = await getOperatingPersonnelApi(this.ruleForm.number)
    console.log(111111);
    console.log(res);
    console.log(111111);
    this.operatingPersonnelList = res
    // 判断有没有运营人员有就可以获取到货道
    if(res?.length<=0) return
    // 货道
    const data = await getVendingMachineAisleApi(this.ruleForm.number)
    console.log(222222);
    console.log(data);
    console.log(222222);
    this.vendingMachineAisl = data
    },
    // 点击确定创建工单
   async addWorkOrder(){
      try {
       await this.$refs.ruleForm.validate()   
        let obj={
        createType:1,
        innerCode:this.ruleForm.number,
        userId:this.$store.state.user.token.userId,
        productType:2,
        desc:this.ruleForm.tip,
        details:this.updateVendingMachineAisl,
        assignorId:this.operatingPersonnelList[0]?.userId
      }
      const rulis = await addWorkOrderApi(obj)
      console.log(rulis);
      } catch (error) {
        console.log('为空了');
        console.dir(error);
        this.$message.error(error.response.data)
        
      }
    },
    // 点击补货详情确定
    replenishment(){
      console.log('详情页被修改后的数据');
      this.updateVendingMachineAisl=this.$refs.replenishment.content
      console.dir(this.$refs.replenishment.content);
      console.log(this.centerDialogVisible);
      this.centerDialogVisible = false
    },
  },
  components:{
    MyDialog,
    replenishmentDetails
  }
}
</script>

<style lang="scss" scoped>
.btn{
  display: flex;
  button:nth-of-type(1){
    margin-left: 100px;
  }
   button:nth-of-type(2){
    background-color: #FF6C29;
    color: white;
    margin-left: 40px;
  }
}
.dialog-footer{
    position: relative;
    left: -200px;

   button:nth-of-type(1){
    position: relative;
    left: -20px;
  }
}

</style>

