<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-04 13:00:53
 * @LastEditors: sj
 * @LastEditTime: 2022-08-06 01:02:08
-->
<template>
  <el-dialog
    class="dialog"
    title="工单详情"
    :visible.sync="operationMoreMsg"
    :before-close="handleClose"
  >
    <div class="task-status">
      <img src="../../../assets/下载 (1).png" style="margin: 0 16px 0 22px" />
      <span>取消</span>
      <img src="../../../assets/pic_3.e8208e34.png" class="pic" />
    </div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备编号:">
            <span>{{moreTask.innerCode}}</span>
          </el-form-item>
          <el-form-item label="取消日期:">
            <span>{{ moreTask.createTime}}</span>
          </el-form-item>
          <el-form-item label="工单类型:">
            <span>{{moreTask.taskType.typeName}}</span>
          </el-form-item>
          <el-form-item label="工单方式:">
            <span>{{moreTask.createType? '手动' : '自动'}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建日期:">
            <span>{{moreTask.updateTime}}</span>
          </el-form-item>
          <el-form-item label="运营人员:">
            <span>{{moreTask.userName}}</span>
          </el-form-item>
          <el-form-item label="补货数量:">
            <span>补货详情</span>
          </el-form-item>
          <el-form-item label="取消原因:">
            <span></span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="dialog-footer">
      <my-buttom bcColor="lightsalmon">重新创建</my-buttom>
    </div>

  </el-dialog>
</template>

<script>
import MyButtom from '@/components/Button.vue'
export default {
  data(){
    return {
      formInline:{}
    }
  },
    props: {
    operationMoreMsg: {
      type: Boolean,
      default: false,
    },
    moreTask:{
      type: Object,
      default: ()=>{return {} }
    }
  },
  methods: {
    handleClose(done) {
      this.$emit('close');
    },
  },
  components:{
    MyButtom
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  ::v-deep .el-dialog {
    margin-top: 5vh;
    width: 630px;
    position: relative;
    margin: 0 auto;
    background: #fff;
    box-sizing: border-box;
    border-radius: 10px;
  }

  .task-status {
    display: flex;
    align-items: center;
    height: 54px;
    margin-bottom: 25px;
    background-color: hsla(0, 0%, 92.5%, 0.39);
    .pic {
      margin-right: 76px;
      margin-bottom: 7px;
    }
    span {
      flex: 1;
    }
  }

  ::v-deep .el-form-item__label {
    width: 120px;
  }

  .dialog-footer {
    width: 100%;
    display: flex;
    justify-content: center;
  }

}
</style>
