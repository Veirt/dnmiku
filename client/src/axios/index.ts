import axios from "axios";
import store from "../store";

export default axios.create({
  baseURL: `${store.getters.apiUrl}/api/v1`,
  headers: { authorization: `Bearer ${store.getters.accessToken}` },
});
