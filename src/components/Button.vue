<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-05 20:12:01
 * @LastEditors: sj
 * @LastEditTime: 2022-08-05 20:34:41
-->
<template>
   <el-button class="btn" :class="[bcColor]" :icon="icon" :type="type">
    <slot></slot>
   </el-button>
</template>

<script>
export default {
  props:{
    bcColor:{
      type: String,
      default: ''
    },
    icon:{
        type: String,
    },
    type: String,
  }

}
</script>

<style lang="scss" scoped>
// 大小
.btn {
     width: 80px !important;
      height: 36px;
      padding: 0;
      border: none;
}
// 按钮颜色

// 浅肉色
 .lightsalmon {
      background-color: #fbf4f0 !important;
      color: #655b56 !important;
    }
// 渐变橘色
.orange {
    background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
    color: #fff;
}
</style>
