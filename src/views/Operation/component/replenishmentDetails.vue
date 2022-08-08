<template>
  <div class="main">
    <div class="title">
      <span v-for="(item, index) in list" :key="index">{{ item }}</span>
    </div>
    <div class="section">

       <template v-if="type == 1">
        <div v-for="(item, index) in content" :key="index">
          <span>{{item?item.channelCode:''}}</span>
          <span>{{item.sku?item.sku.skuName:'-'}}</span>
          <span>{{item.sku?item.currentCapacity:'-'}}</span>
          <span>{{item.sku?10:'-'}}</span>
          <span>
            <template v-if="item.sku">
              <el-input-number style="width:120px" v-model="item.maxCapacity" controls-position="right" :min="1" :max="10"></el-input-number>
            </template>

            <template v-else>
              暂无数据
            </template>
          </span>
        </div>
      </template>
      
      <template v-else>
        <div v-for="(item, index) in content" :key="index">
          <span>{{ item.channelCode }}</span>
          <span>{{ item.skuName }}</span>
          <span>{{ item.expectCapacity }}</span>
        </div>
      </template>

        <div>
          <span>{{ content?'':'暂无数据' }}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type:{
        type:[String,Number]
    },
    list: {
      type: [Object, Array],
      require: true,
    },
    content: {
      type: [Object, Array],
    },
  },
  data() {
    return {
    };
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
