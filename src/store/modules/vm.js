// import router from "@/router";
export default {
  namespaced: true,
  state: {
    chooseGoodsList: [], // 选择商品列表
    chooseDialog: false, // 控制选择商品弹窗显隐
  },
  mutations: {
    setChooseGoodsList(state, payload) {
      state.chooseGoodsList = payload;
    },
    setChooseDialog(state, payload) {
      state.chooseDialog = payload;
    },
  },
};
