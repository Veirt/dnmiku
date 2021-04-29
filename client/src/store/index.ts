import { createStore } from "vuex";

export default createStore({
  state: {
    apiUrl: import.meta.env.VITE_APP_API_ENDPOINT,
    accessToken: "",
  },
  mutations: {
    setAccessToken(state, payload) {
      state.accessToken = payload;
    },
  },
  actions: {},
  modules: {},
  getters: {
    apiUrl(state) {
      return state.apiUrl;
    },
    accessToken(state) {
      return state.accessToken;
    },
  },
});
