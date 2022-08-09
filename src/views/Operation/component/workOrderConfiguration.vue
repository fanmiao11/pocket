<template>
  <div>
    补货警戒线：
    <el-input-number
      style="width: 500px"
      v-model="index"
      controls-position="right"
      :min="1"
      :max="100"
    ></el-input-number>
  </div>
</template>

<script>
export default {
  props: {
    num: {
      type: [Number, String],
      require: true,
    },
  },
  data() {
    return {
      index: this.num,
    };
  },
};
</script>

<style scoped></style>
