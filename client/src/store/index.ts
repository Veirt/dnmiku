import { createStore } from "vuex";

export default createStore({
  state: {
    apiUrl: import.meta.env.VITE_APP_API_ENDPOINT,
    isAdmin: false,
    accessToken: "",
  },
  mutations: {
    setAccessToken(state, payload) {
      state.accessToken = payload;
    },
    setAdmin(state) {
      state.isAdmin = true;
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
    isAdmin(state) {
      return state.isAdmin;
    },
  },
});
