import axios from "axios";
import store from "../store";

export default axios.create({
  baseURL: `${store.getters.getApiUrl}/api/v1`,
  headers: { authorization: `Bearer ${store.getters.getAccessToken}` },
});
