import { createStore } from "vuex";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/en";
dayjs.extend(relativeTime);
dayjs.locale("id");

export default createStore({
  state: {
    apiUrl: import.meta.env.VITE_APP_API_ENDPOINT,
    authCheck: false,
    accessToken: "",
    admin: false,
  },
  mutations: {
    SET_ACCESS_TOKEN(state, payload) {
      state.accessToken = payload;
    },
    SET_ADMIN(state) {
      state.admin = true;
    },
    SET_AUTH_CHECK(state) {
      state.authCheck = true;
    },
    LOG_OUT(state) {
      state.accessToken = "";
      state.admin = false;
    },
  },
  actions: {
    setAuthStatus({ commit }, payload) {
      commit('SET_AUTH_CHECK')
      commit('SET_ACCESS_TOKEN', payload.token)
      if (payload.role >= 99) commit('SET_ADMIN')
    }
  },
  modules: {},
  getters: {
    getApiUrl(state) {
      return state.apiUrl
    },
    getAccessToken(state) {
      return state.accessToken
    },
    getAuthCheck(state) {
      return state.authCheck
    },
    isAdmin(state) {
      return state.admin
    },
    dayjs() {
      return dayjs;
    },
  },
});
