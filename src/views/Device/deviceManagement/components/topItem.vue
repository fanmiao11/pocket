<template>
  <div class="topItem">
    <img :src="topData.image" alt="" />
    <p>{{ topData.skuName }}</p>
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
    topData: {
      type: Object,
      required: true,
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
