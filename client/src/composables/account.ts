import store from "../store";
import { ref } from "vue";
import axios from "axios";

const account = () => {
  const accounts = ref([
    {
      AccountId: 0,
      AccountName: "",
      Email: "",
      AccountLevelCode: 0,
      cash: 0,
      LastLoginDate: undefined,
      RegisterDate: undefined,
    },
  ]);

  const getAccounts = async () => {
    try {
      const res = await axios({
        method: "GET",
        baseURL: store.getters.apiUrl,
        url: "/api/v1/accounts",
        headers: { authorization: `Bearer ${store.getters.accessToken}` },
      });
      accounts.value = res.data;
    } catch (err) {
      alert(err);
    }
  };

  return { accounts, getAccounts };
};

export default account;
