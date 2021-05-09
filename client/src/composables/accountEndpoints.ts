import axios from "../axios";
import { ref } from "vue";

export const account = ref({
  AccountId: 0,
  AccountName: "",
  Email: "",
  Password: "",
  ConfirmPassword: "",
  AccountLevelCode: 0,
  cash: 0,
  LastLoginDate: undefined,
  RegisterDate: undefined,
  DNAuth: {
    CertifyingStep: 0,
  },
});

export const accounts = ref([{ ...account.value }]);

export const getAccounts = async (query?: QueryParams) => {
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

export const getAccountById = async (id: number) => {
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

export const createAdminAccount = async () => {
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

export const editAccount = async (id: number) => {
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

export const deleteAccount = async (id: number) => {
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
