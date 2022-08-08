<template>
  <div class="main">
    <div class="title">
      <span v-for="(item, index) in list" :key="index">{{ item }}</span>
    </div>
    <div class="section">

        <div v-for="(item, index) in content" :key="index">
          <span>{{ item.channelCode }}</span>
          <span>{{ item.skuName }}</span>
          <span>{{ item.expectCapacity }}</span>
        </div>

        <div>
          <span>{{ content?'':'暂无数据' }}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: [Object, Array],
      require: true,
    },
    content: {
      type: [Object, Array],
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.main {
  overflow: auto;
  min-height: 380px;
  .title {
    box-sizing: border-box;
    padding: 0 10px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f3f6fb;
    > span {
      flex: 1;
      text-align: center;
    }
  }
  .section {
    justify-content: center;
    box-sizing: border-box;
    height: 40px;
    align-items: center;
    > div {
      width: 100%;
      justify-content: center;
      height: 40px;
      line-height: 40px;
      align-items: center;
      display: flex;
      > span {
        flex: 1;
        text-align: center;
      }
      &:hover {
        background-color: #f3f6fb;
      }
    }
  }
}
</style>
