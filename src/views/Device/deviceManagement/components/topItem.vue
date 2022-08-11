<template>
  <div class="topItem" @click="choose">
    <img
      src="~@/assets/choose.png"
      alt=""
      class="choose"
      :class="{ none: topData.icon }"
    />
    <img :src="topData.image || topData.skuImage" alt="" />
    <p>{{ topData.skuName }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {},

  methods: {
    choose() {
      if (this.chooseShow) {
        this.$emit("empty");
        this.topData.icon = false;
      }
    },
  },
  props: {
    topData: {
      type: Object,
      required: false,
    },
    chooseShow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.topItem {
  width: 134px;
  height: 134px;
  margin: 0 auto;
  padding-top: 16px;
  background-color: #f6f7fb;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
  border-radius: 4px;
  text-align: center;
  margin-left: 8px;
  margin-right: 8px;
  position: relative;
  .choose {
    position: absolute;
    top: 0;
    left: 0;
    width: 36px;
    height: 36px;
  }
  .none {
    display: none;
  }
}
img {
  width: 84px;
  height: 78px;
  margin-bottom: 10px;
  object-fit: contain;
}
p {
  margin: 0;
}
</style>
