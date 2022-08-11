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
    <el-button type="text" @click="addBtn">添加</el-button>
    <el-button
      type="text"
      class="delColor"
      :class="{ disabled: flag }"
      :disabled="flag"
      @click="delGoods(goodsData.channelCode)"
      >删除</el-button
    >
  </div>
</template>

<script>
import MySearch from "@/components/Search.vue";
import { mapMutations } from "vuex";
import { skuSearch } from "@/api/vm";
export default {
  name: "goodsItem",
  data() {
    return {
      chooseGoodsShow: false, // 控制选择商品弹框显隐
      reqObj: {
        pageIndex: 1,
        pageSize: 10,
        skuName: "",
      },
    };
  },

  created() {},

  methods: {
    ...mapMutations("vm", ["setChooseGoodsList", "setChooseDialog"]),
    delGoods(id) {
      this.$emit("delGoods", id);
    },
    async addBtn() {
      this.setChooseDialog(true);
      const { currentPageRecords } = await skuSearch(this.reqObj);
      currentPageRecords.forEach((ele) => {
        ele.icon = true;
      });
      this.setChooseGoodsList(currentPageRecords);
    },
    empty() {
      this.goodsList.forEach((ele) => {
        ele.icon = true;
      });
    },
  },

  props: {
    goodsData: {
      type: Object,
      required: true,
    },
  },

  components: { MySearch },

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
  width: 858px;
  border-radius: 10px;
}
.topGoods {
  width: 750px;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
}
</style>
