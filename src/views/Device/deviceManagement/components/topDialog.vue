<template>
  <div>
    <el-dialog
      title="智能排货"
      :visible="show"
      append-to-body
      class="topDialog"
      @close="$emit('closeTop')"
    >
      <p>该区域属于{{ businessType.name }}商圈适合销售一下商品：</p>
      <div class="topGoods">
        <top-item
          :topData="item"
          v-for="item in goodsList"
          :key="item.channelCode"
        ></top-item>
      </div>
      <div class="btn"><el-button @click.native="adopt">采纳建议</el-button></div>
    </el-dialog>
  </div>
</template>

<script>
import goodsItem from "./goodsItem.vue";
import { getBusinessTop10 } from "@/api/vm";
import TopItem from "./topItem.vue";
export default {
  name: "topDialog",
  components: { goodsItem, TopItem },
  data() {
    return {
      goodsList: [],
    };
  },

  props: {
    show: {
      type: Boolean,
      required: true,
    },
    businessType: {
      type: Object,
      required: true,
    },
  },

  created() {},

  methods: {
    adopt(){
      this.$emit('adopt',this.goodsList)
    }
  },

  watch: {
    show: {
      async handler(newVel) {
        if (newVel) {
          this.goodsList = await getBusinessTop10(this.businessType.id);
          console.log(this.goodsList);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  width: 858px;
}
::v-deep .el-dialog__body {
  padding: 20px 20px 30px;
  color: #666;
}
.topGoods {
  width: 750px;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  // justify-content: center;
}
.btn {
  width: 100%;
  text-align: center;
}
.el-button {
  // margin: 0 auto;
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  width: 80px !important;
  height: 36px;
  padding: 0;
  color: #fff;
}
</style>
