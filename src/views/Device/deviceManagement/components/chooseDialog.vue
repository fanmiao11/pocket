<template>
  <div>
    <el-dialog
      title="选择商品"
      :visible="chooseDialog"
      :append-to-body="true"
      @close="setChooseDialog(false)"
    >
      <!-- 左箭头 -->
      <svg-icon
        iconClass="arrow-left"
        class="svgLeft"
        :class="{ forbid: !changeFlag, none: none }"
        @click="leftClick"
      ></svg-icon>
      <!-- 右箭头 -->
      <svg-icon
        iconClass="arrow-right"
        class="svgRight"
        :class="{ forbid: changeFlag, none: none }"
        @click="rightClick"
      ></svg-icon>
      <my-search nameOne="商品名称"></my-search>
      <div class="topGoods">
        <top-item
          :topData="item"
          @empty="empty"
          :chooseShow="true"
          v-for="(item, index) in chooseGoodsList"
          :key="index"
        ></top-item>
      </div>
      <div class="btn">
        <el-button @click.native="adopt">采纳建议</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MySearch from "@/components/Search.vue";
import TopItem from "./topItem.vue";
export default {
  data() {
    return {};
  },
  components: { MySearch, TopItem },

  created() {},

  methods: {
    ...mapMutations("vm", ["setChooseGoodsList", "setChooseDialog"]),
    empty() {
      const arr = this.chooseGoodsList;
      arr.forEach((ele) => {
        ele.icon = true;
      });
      this.setChooseGoodsList(arr);
    },
  },

  computed: {
    ...mapState("vm", ["chooseDialog", "chooseGoodsList"]),
  },
};
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
  text-align: center;
  .el-button {
    // margin: 0 auto;
    background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
    width: 80px !important;
    height: 36px;
    padding: 0;
    color: #fff;
  }
}
.svgLeft {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 45%;
  left: -6px;
  z-index: 9999;
}
.svgRight {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 45%;
  right: -6px;
  z-index: 9999;
}
::v-deep .el-scrollbar__bar {
  right: 35px;
}
.forbid {
  color: #d8dde3;
}
.none {
  display: none;
}
.topGoods {
  width: 750px;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
}
::v-deep .el-dialog {
  box-shadow: 0 0px 0px;
  width: 858px;
  border-radius: 10px;
}
</style>
