<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-07 14:16:32
 * @LastEditors: sj
 * @LastEditTime: 2022-08-08 00:36:13
-->
<template>
    <el-form :model="ruleForm" :rules="rules" ref="Form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="人员名称" prop="userName">
          <el-input maxlength="5" show-word-limit v-model.trim="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select placeholder="请选择活动区域" style="width:100%" v-model.trim="ruleForm.roleId">
            <el-option :label="item.roleName" :value="item.roleId" v-for="item in roleList" :key="item.roleId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" required prop="mobile">
          <el-input maxlength="11" show-word-limit v-model.trim="ruleForm.mobile" type="tel"></el-input>
        </el-form-item>
        <el-form-item label="负责区域" prop="regionId">
          <el-select placeholder="请选择活动区域" style="width:100%" v-model.trim="ruleForm.regionId">
            <el-option :label="item.name" :value="item.id" v-for="item in areaList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像" required prop="image">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadImage"
          >
            <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p>支持扩展名: jpg、png,文件不得大于100kb</p>
        </el-form-item>

        <el-form-item label="状态">
          <el-checkbox label="是否启用" name="status" v-model="ruleForm.status"></el-checkbox>
        </el-form-item>
        <el-form-item class="btn">
          <my-button bcColor="lightsalmon" @click.native="concel">取消</my-button>
          <my-button bcColor="orange" class="confirmBtn" @click.native="submitForm">确认</my-button>
        </el-form-item>
      </el-form>
</template>

<script>
import { getRoleList ,getAreaList, imgUpload,editUserInfo, addUserInfo,getUserList} from '@/api/personnel'
import MyButton from "@/components/Button.vue";
export default {
  props:{
   userInfo:{
    type: Object
   }
  },
  data(){
    const checkName = async (rule,value,callback)=>{
      let isRepeat
      const {currentPageRecords} = await getUserList()
      if(this.ruleForm.id) {
        // 编辑
       isRepeat = currentPageRecords.filter(item=>item.userName!==value).some(item=>item.userName===value)
      }else {
        // 添加
       isRepeat = currentPageRecords.some(item => item.userName===value)
      }
      isRepeat? callback(new Error('人员名称重复')) : callback()
    }
    return {
      roleList: [],
      areaList: [],
      ruleForm:{
      userName: '', // 用户名
      roleId:'', //角色Id integer
      mobile: '', // 手机号
      regionId:'', // 所属区域Id
      regionName: '', //所属区域名称
      status: true, //启用状态
      image: '', //头像Url
      },
      rules:{
        userName:[{ required: true, message: '请输入', trigger: 'blur'},
             { validator:checkName, tiggers: 'blur'}
        ],
        roleId:[{ required: true, message: '请选择', trigger: 'change'}],
        mobile:[
          { required: true, message: '请输入', trigger: 'blur'},
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入正确的手机号码', trigger: 'change'},
          ],
        regionId:[{ required: true, message: '请选择', trigger: 'change'}],
        image:[{ required: true, message: '请上传图片', trigger: 'blur'}]
      }
    }
  },
 components:{
  MyButton
 },
 created(){
  this.getRoleList()
  this.getAreaList()
  this.ruleForm = this.userInfo
  },
  updated(){this.ruleForm = this.userInfo},
 methods:{
  // 获取角色列表
   async getRoleList(){
   this.roleList = await getRoleList()
   },
   // 获取区域列表
   async getAreaList(){
   const {currentPageRecords} = await getAreaList({pageIndex:1,pageSize: 100000})
   this.areaList = currentPageRecords
   },
   // 点击取消
   concel(){
    this.$emit('close')
    this.$refs.Form.resetFields()
    this.ruleForm={
      userName: '', // 用户名
      roleId:'', //角色Id integer
      mobile: '', // 手机号
      regionId:'', // 所属区域Id
      regionName: '', //所属区域名称
      status: true, //启用状态
      image: '', //头像Url
      }
   },
   // 点击确认
    submitForm() {
        this.$refs.Form.validate(async (valid) => {
          if (valid) {
            if(this.ruleForm.id){
              // 编辑
            await editUserInfo(this.ruleForm)
            this.$emit('close')
            this.$message.success('编辑成功')
            this.$emit('success')
            }else {
              // 添加
              const res=this.areaList.find(item =>item.id=== this.ruleForm.regionId)
              this.ruleForm.regionName=res.name
              await addUserInfo(this.ruleForm)
              this.$emit('close')
              this.$message.success('添加成功')
              this.$emit('success')
            }
          } else {
            this.$message.error('操作失败')
            return false;
          }
          this.$refs.Form.resetFields()
            this.ruleForm={
      userName: '', // 用户名
      roleId:'', //角色Id integer
      mobile: '', // 手机号
      regionId:'', // 所属区域Id
      regionName: '', //所属区域名称
      status: true, //启用状态
      image: '', //头像Url
      }
        });
      },
      // 头像
    async uploadImage(file){
    this.ruleForm.image= await imgUpload(file.file)
    this.$message.success('头像上传成功')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpg" || "image/png";
      const isLt100KB = file.size / 1024 < 100;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 png 格式!");
      }
      if (!isLt100KB) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt100KB;
    },
 },

}
</script>

<style lang="scss" scoped>
   ::v-deep .avatar-uploader .el-upload {
  width: 86px;
  height: 86px;
  border: 1px dashed #8c939d;
  background-color: #f4f6fb;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
::v-deep .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 86px;
  height: 86px;
  line-height: 86px;
  text-align: center;
  // border: 1px dashed #8c939d;
  // background-color: #f4f6fb;
}
.avatar {
  width: 76px;
  height: 76px;
  margin: 4;
  display: block;
}
p {
  color: #ccc;
}

.btn {
  width: 100%;
  text-align: center;
  .confirmBtn {
    margin: 0 100px 0 35px;
  }
}
</style>
