import axios from "../api/axios";
import { ref } from "vue";
import store from "../store"

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
  DiscordID: null,
  DNAuth: {
    CertifyingStep: 0,
  },
});

export const accounts = ref({
  result: [{ ...account.value, }],
  total: 0
}
);

export const getAccounts = async (query?: QueryParams) => {
  try {
    const res = await axios({
      method: "GET",
      url: "accounts",
      params: query,
    });
    accounts.value.result = res.data.result;
    accounts.value.total = res.data.total;
  } catch (err) {
    alert(err);
  }
};

export const getMyAccount = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "accounts/@me",
      headers: { authorization: `Bearer ${store.getters.getAccessToken}` }
    })
    account.value = res.data
  } catch (err) { alert(err) }
}

export const getAccountById = async (id: number) => {
  try {
    const res = await axios({
      method: "GET",
      url: `accounts/${id}`,
    });
    account.value = res.data;
  } catch (err) { alert(err); }
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
