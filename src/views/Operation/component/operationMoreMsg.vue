<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-07 10:05:38
 * @LastEditors: sj
 * @LastEditTime: 2022-08-07 10:05:38
-->
<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-04 13:00:53
 * @LastEditors: sj
 * @LastEditTime: 2022-08-06 22:27:11
-->
<template>
  <my-dialog
    dialogTitle="工单详情"
    :dialogVisible="operationMoreMsg"
    @close="handleClose"
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
            <span>{{moreTask.taskType&&moreTask.taskType.typeName}}</span>
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
            <span @click="isBackOrderListFn">补货详情</span>
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


    <backOrderList :isBackOrderList="isBackOrderList" @close="isBackOrderList=false" :moreTask="moreTask"/>
  </my-dialog>
</template>

<script>
import backOrderList from './backOrderList.vue'
import MyDialog from '@/components/Dialog.vue'
import MyButtom from '@/components/Button.vue'
export default {
  data(){
    return {
      formInline:{},
      isBackOrderList: false,
    }
  },
    props: {
    operationMoreMsg: {
      type: Boolean,
      default: false,
    },
    moreTask:{
      type: Object,
      default: ()=>{ return {} }
    }
  },
  methods: {
    handleClose(done) {
      this.$emit('close');
    },
    isBackOrderListFn(){
      this.isBackOrderList=true

    }
  },
  components:{
    MyButtom,
    MyDialog,
    backOrderList
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
