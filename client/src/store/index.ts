import { createStore } from "vuex";

export default createStore({
  state: {
    apiUrl: import.meta.env.VITE_APP_API_ENDPOINT,
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    apiUrl(state) {
      return state.apiUrl;
    },
  },
});
