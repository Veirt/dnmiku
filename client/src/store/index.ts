import { createStore } from "vuex";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/en";
dayjs.extend(relativeTime);
dayjs.locale("id");

export default createStore({
  state: {
    apiUrl: import.meta.env.VITE_APP_API_ENDPOINT,
    done: false,
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
    auth(state) {
      state.done = true;
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
    dayjs() {
      return dayjs;
    },
    done(state) {
      return state.done;
    },
  },
});
