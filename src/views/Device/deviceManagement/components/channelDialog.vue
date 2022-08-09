<template>
  <div>
    <!-- <d-dialog dialogTitle="货道设置"> </d-dialog> -->
    <el-dialog title="货道设置" :visible="show" @close="closePolicy">
      <div style="width:100%,margin:0 auto">
        <div class="title">
          <div class="left">
            <span class="item"
              >货道行数：{{ formData.type && formData.type.vmRow }}</span
            >
            <span class="item"
              >货道列数：{{ formData.type && formData.type.vmCol }}</span
            >
            <span class="item"
              >货道容量(个)：{{
                formData.type && formData.type.channelMaxCapacity
              }}</span
            >
          </div>
          <div class="right">
            <el-button type="primary" size="medium">智能排货</el-button>
          </div>
        </div>
      </div>
      <el-scrollbar class="scrollbar">
        <div class="goods">
          <goods-item
            v-for="item in goodsList"
            :key="item.channelCode"
            :goodsData="item"
          ></goods-item>
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <div class="footer-btn">
          <my-buttom bcColor="lightsalmon" @click.native="closePolicy"
            >取消</my-buttom
          >
          <my-buttom bcColor="orange" @click.native="confirm">确认</my-buttom>
        </div>
        <!-- <el-dialog
          width="30%"
          title="内层 Dialog"
          :visible.sync="innerVisible"
          append-to-body
        >
        </el-dialog> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MyButtom from "@/components/Button.vue";
import GoodsItem from "./goodsItem.vue";
import { channelDetails } from "@/api/vm";
export default {
  data() {
    return {
      goodsList: [], // 商品列表
    };
  },

  created() {},

  methods: {
    closePolicy() {
      this.$emit("close");
    },
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      required: true,
    },
  },

  components: {
    MyButtom,
    GoodsItem,
  },

  watch: {
    show: {
      async handler(newVel) {
        if (newVel) {
          this.goodsList = await channelDetails(this.formData.innerCode);
          console.log(this.goodsList);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 0 auto;
  align-items: center;
  width: 847px;
  height: 56px;
  margin-bottom: 22px;
  background: #f3f6fb;
  -webkit-box-align: center;
  display: flex;
  justify-content: space-between;
  .item {
    margin-left: 43px;
  }
  .right {
    margin-right: 22px;
  }
}
::v-deep .el-dialog {
  margin-top: 15vh;
  width: 940px;
  top: -55px;
}
::v-deep .el-dialog__body {
  padding: 20px 20px 30px;
  color: #666;
}
.goods {
  width: 847px;
  //   height: 384px;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  //   overflow: scroll;
  //   border: 1px solid red;
}
.scrollbar {
  height: 384px;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.footer-btn {
  width: 100%;
  text-align: center;
}

</style>
