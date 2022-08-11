// import router from "@/router";
import { skuSearch } from "@/api/vm";
export default {
  namespaced: true,
  state: {
    chooseGoodsList: [], // 选择商品列表
    chooseDialog: false, // 控制选择商品弹窗显隐
    reqObj: { pageIndex: 1, pageSize: 10, skuName: "" }, // 用于请求选择商品列表
    total: {
      totalPage: "", // 页数
      totalCount: "", // 总个数
    },
    channelCode:'' //通道号
  },
  mutations: {
    setChooseGoodsList(state, payload) {
      state.chooseGoodsList = payload;
    },
    setChooseDialog(state, payload) {
      state.chooseDialog = payload;
    },
    setReqObj(state, payload) {
      state.reqObj = payload;
    },
    setTotal(state, payload) {
      state.total = payload;
    },
    setChannelCode(state, payload) {
        state.channelCode = payload;
      },
  },
  actions: {
    async getSkuSearchList({ commit, state }, payload) {
      commit("setChooseDialog", true);
      const res = await skuSearch(state.reqObj);
      commit("setTotal", {
        totalPage: res.totalPage,
        totalCount: res.totalCount,
      });
      res.currentPageRecords.forEach((ele) => {
        ele.icon = true;
      });
      commit("setChooseGoodsList", res.currentPageRecords);
    },
  },
};
