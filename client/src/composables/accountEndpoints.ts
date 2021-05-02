import store from "../store";
import axios from "../axios";
import { ref } from "vue";

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

  const getAccounts = async (query?: QueryParams) => {
    try {
      const res = await axios({
        method: "GET",
        url: "accounts",
        params: query,
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
        url: `accounts/${id}`,
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
        url: `accounts/admin`,
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
        url: `accounts/${id}`,
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
        url: `accounts/${id}`,
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
