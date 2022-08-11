<template>
  <div class="goods-container">
    <div class="label">{{ goodsData && goodsData.channelCode }}</div>
    <div class="content">
      <img
        :src="goodsData.sku && goodsData.sku.skuImage"
        alt=""
        class="img"
        ref="img11"
      />
      <div>
        {{ !flag ? goodsData.sku && goodsData.sku.skuName : "暂无商品" }}
      </div>
    </div>
    <el-button type="text">添加</el-button>
    <el-button
      type="text"
      class="delColor"
      :class="{ disabled: flag }"
      :disabled="flag"
      @click="delGoods(goodsData.channelCode)"
      >删除</el-button
    >
    <el-dialog
      title="选择商品"
      :visible="chooseGoodsShow"
      :append-to-body="true"
    ></el-dialog>
  </div>
</template>

<script>
export default {
  name: "goodsItem",
  data() {
    return {
      chooseGoodsShow: false,// 控制选择商品弹框显隐
    };
  },

  created() {},

  methods: {
    delGoods(id) {
      this.$emit("delGoods", id);
    },
  },

  props: {
    goodsData: {
      type: Object,
      required: true,
    },
  },

  computed: {
    flag() {
      let flag = true;
      // console.log(this.goodsData.sku);
      if (this.goodsData.sku) {
        flag = false;
      } else {
        // console.log(this.$refs.img11);
      }
      return flag;
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-container {
  position: relative;
  width: 150px;
  //   height: 135px;
  background: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
  border-radius: 4px;
  text-align: center;
  margin: 0 8px 15px;

  .content {
    height: 135px;
    padding-top: 16px;
    background-color: #f6f7fb;
    border-radius: 4px;
    width: 150px;
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

  .delColor {
    color: #ff5a5a;
  }

  .disabled {
    color: #ffdada;
  }
}
::v-deep .el-dialog {
  box-shadow: 0 0px 0px;
}
</style>
