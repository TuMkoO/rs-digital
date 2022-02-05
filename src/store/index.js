import { createStore } from "vuex";
import hotels from "@/hotels.json";

export default createStore({
  state() {
    return {
      hotels: hotels,
    };
  },
  mutations: {},
  actions: {},
  getters: {
    hotels(state) {
      return state.hotels;
    },
  },
  modules: {},
});
