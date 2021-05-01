import store from "../store";
import { ref } from "vue";
import axios from "axios";

const accountEndpoints = () => {
  const account = ref({
    AccountId: 0,
    AccountName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    AccountLevelCode: 0,
    cash: 0,
    LastLoginDate: undefined,
    RegisterDate: undefined,
  });

  const accounts = ref([{ ...account.value }]);

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

  const getAccountById = async (id: number) => {
    try {
      const res = await axios({
        method: "GET",
        baseURL: store.getters.apiUrl,
        url: `/api/v1/accounts/${id}`,
        headers: { authorization: `Bearer ${store.getters.accessToken}` },
      });
      account.value = res.data;
    } catch (err) {
      alert(err);
    }
  };

  const createAccount = async () => {
    try {
      await axios({
        method: "POST",
        baseURL: store.getters.apiUrl,
        url: `/api/v1/accounts/admin`,
        headers: { authorization: `Bearer ${store.getters.accessToken}` },
        data: account.value,
      });
    } catch (err) {
      alert(err);
    }
  };

  const editAccount = async (id: number) => {
    try {
      await axios({
        method: "PATCH",
        baseURL: store.getters.apiUrl,
        url: `/api/v1/accounts/${id}`,
        headers: { authorization: `Bearer ${store.getters.accessToken}` },
        data: account.value,
      });
    } catch (err) {
      alert(err);
    }
  };

  const deleteAccount = async (id: number) => {
    try {
      await axios({
        method: "DELETE",
        baseURL: store.getters.apiUrl,
        url: `/api/v1/accounts/${id}`,
        headers: { authorization: `Bearer ${store.getters.accessToken}` },
      });
      await getAccounts();
    } catch (err) {
      alert(err);
    }
  };

  return {
    account,
    accounts,
    getAccounts,
    getAccountById,
    createAccount,
    editAccount,
    deleteAccount,
  };
};

export default accountEndpoints;
