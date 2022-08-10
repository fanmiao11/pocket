<template>
  <div>
    <!-- <d-dialog dialogTitle="货道设置"> </d-dialog> -->
    <el-dialog title="货道设置" :visible="show" @close="closePolicy">
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
          <el-button type="primary" size="medium" @click="topBtn"
            >智能排货</el-button
          >
        </div>
      </div>

      <el-carousel
        :autoplay="false"
        arrow="never"
        indicator-position="none"
        ref="carousel"
      >
        <svg-icon
          iconClass="arrow-left"
          class="svgLeft"
          :class="{ forbid: !changeFlag, none: none }"
          @click="leftClick"
        ></svg-icon>
        <svg-icon
          iconClass="arrow-right"
          class="svgRight"
          :class="{ forbid: changeFlag, none: none }"
          @click="rightClick"
        ></svg-icon>
        <el-carousel-item v-for="(item, index) in goodsList" :key="index">
          <el-scrollbar class="scrollbar">
            <div class="goods">
              <div v-for="item1 in item" :key="item1.channelCode">
                <goods-item
                  :goodsData="item1"
                  @delGoods="delGoods"
                ></goods-item>
              </div>
            </div>
          </el-scrollbar>
        </el-carousel-item>
      </el-carousel>

      <div slot="footer" class="dialog-footer">
        <div class="footer-btn">
          <my-buttom bcColor="orange" @click.native="confirm">确认</my-buttom>
        </div>
      </div>
      <top-dialog
        :show="topShow"
        @closeTop="topShow = false"
        @adopt="adopt"
        :businessType="formData.node && formData.node.businessType"
      ></top-dialog>
    </el-dialog>
  </div>
</template>

<script>
import MyButtom from "@/components/Button.vue";
import GoodsItem from "./goodsItem.vue";
import TopDialog from "./topDialog";
import { channelDetails } from "@/api/vm";
export default {
  data() {
    return {
      goodsList: [], // 商品列表
      changeFlag: false, // 控制左右箭头禁止颜色
      // innerVisible: false,
      topShow: false, // 智能推荐弹框显隐
      cloneList: [], // 克隆商品列表
      none: true, // 控制左右箭头显隐
    };
  },

  created() {},

  methods: {
    // 关闭弹框
    closePolicy() {
      this.$emit("close");
    },
    leftClick() {
      if (this.changeFlag) {
        this.changeFlag = !this.changeFlag;
        this.$refs.carousel.prev();
      }
    },
    rightClick() {
      if (!this.changeFlag) {
        this.changeFlag = !this.changeFlag;
        this.$refs.carousel.next();
      }
    },
    // 排货按钮
    topBtn() {
      this.topShow = true;
    },
    // 采纳意见
    adopt(list) {
      // console.log(list);
      this.topShow = false;
      this.goodsList = [];
      // 替换前十项数据
      for (let i = 0; i < 10; i++) {
        this.cloneList[i].skuId = list[i].skuId;
        this.cloneList[i].skuId = {};
        this.cloneList[i].sku = {
          skuImage: list[i].image,
          skuName: list[i].skuName,
        };
      }
      const data1 = [];
      const data2 = [];
      this.cloneList.forEach((ele) => {
        const last = ele.channelCode.charAt(ele.channelCode.length - 1);
        if (last <= 5 && last > 0) {
          data1.push(ele);
        }
        if ((last >= 6 && last < 10) || last == 0) {
          data2.push(ele);
        }
      });
      // console.log(data2);
      this.goodsList.push(data1);
      if (data2.length) {
        this.goodsList.push(data2);
        // console.log('push2');
      }
      // console.log(this.goodsList);
    },
    // 删除
    delGoods(id) {
      this.goodsList = [];
      this.cloneList.forEach((ele) => {
        if (ele.channelCode === id) {
          ele.sku = null;
        }
      });
      const data1 = [];
      const data2 = [];
      this.cloneList.forEach((ele) => {
        const last = ele.channelCode.charAt(ele.channelCode.length - 1);
        if (last <= 5 && last > 0) {
          data1.push(ele);
        }
        if ((last >= 6 && last < 10) || last == 0) {
          data2.push(ele);
        }
      });
      this.goodsList.push(data1);
      if (data2.length) {
        this.goodsList.push(data2);
      }
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
    TopDialog,
  },

  watch: {
    show: {
      async handler(newVel) {
        if (newVel) {
          // console.log(this.formData);
          this.goodsList = [];
          const res = await channelDetails(this.formData.innerCode);
          // console.log(res);
          this.cloneList = res;
          const data1 = [];
          const data2 = [];
          res.forEach((ele) => {
            const last = ele.channelCode.charAt(ele.channelCode.length - 1);
            if (last <= 5 && last > 0) {
              data1.push(ele);
            }
            if ((last >= 6 && last < 10) || last == 0) {
              data2.push(ele);
            }
          });
          this.goodsList.push(data1);
          if (data2.length) {
            this.goodsList.push(data2);
            this.none = false;
          }
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
::v-deep .el-carousel__container {
  overflow: hidden;
  height: 384px;
}
.footer-btn {
  width: 100%;
  text-align: center;
}
.svgLeft {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 35%;
  left: -13px;
  z-index: 9999;
}
.svgRight {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 35%;
  right: -13px;
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
</style>
