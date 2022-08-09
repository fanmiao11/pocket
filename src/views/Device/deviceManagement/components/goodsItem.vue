<template>
  <div class="goods-container">
    <div class="label">{{ goodsData.channelCode }}</div>
    <div class="content">
      <img :src="goodsData.sku && goodsData.sku.skuImage" alt="" class="img" />
      <div>{{ goodsData.sku && goodsData.sku.skuName }}</div>
    </div>
    <div class="edit">
      <el-button type="text">添加</el-button>
      <el-button type="text" style="color: #ff5a5a">删除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {},

  methods: {},

  props: {
    goodsData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-container {
  position: relative;
  width: 150px;
  height: 180px;
  background: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
  border-radius: 4px;
  text-align: center;
  margin: 0 8px;

  .content {
    height: 135px;
    padding-top: 16px;
    background-color: #f6f7fb;
    border-radius: 4px;
    width: 150px;
  }
  .edit {
    display: flex;
    align-items: center;
    height: 45px;
    justify-content: center;
    color: #5f84ff;
  }
  .label {
    position: absolute;
    top: 10px;
    left: 0;
    width: 43px;
    height: 23px;
    line-height: 23px;
    background: #829bed;
    border-radius: 0 10px 10px 0;
    font-size: 12px;
    color: #fff;
  }
  .img {
    width: 84px;
    height: 78px;
    margin-bottom: 10px;
    object-fit: contain;
  }
}
</style>
