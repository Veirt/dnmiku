import store from "../store"
import axios from "../api/axios";
import { ref } from "vue";

export const character = ref({
  CharacterID: 0,
  CharacterName: "",
  CreateDate: undefined,
  AccountName: "",
  CharacterStatus: {
    CharacterLevel: 0,
    JobCode: 0,
    LastVillageMapID: 0,
    Coin: "",
    WarehouseCoin: "",
    SkillPoint: 0,
    Fatigue: 0,
    WeeklyFatigue: 0,
    LastLoginDate: undefined,
    LikeCount: 0,
    MissionScore: 0,
  },
});

export const characters = ref({ total: 0, result: [{ ...character.value }] });

export const getCharacters = async (query?: QueryParams) => {
  try {
    const res = await axios({
      method: "GET",
      url: "characters",
      params: query,
      headers: { authorization: `Bearer ${store.getters.getAccessToken}` },
    });
    characters.value.result = res.data.result;
    characters.value.total = res.data.total;
  } catch (err) {
    alert(err);
  }
};

export const getCharacterById = async (id: number) => {
  try {
    const res = await axios({
      method: "GET",
      url: `characters/${id}`,
      headers: { authorization: `Bearer ${store.getters.getAccessToken}` },
    });
    character.value = res.data;
  } catch (err) {
    alert(err);
  }
};

export const editCharacter = async (id: number) => {
  try {
    await axios({
      method: "PATCH",
      url: `characters/${id}`,
      data: character.value,
      headers: { authorization: `Bearer ${store.getters.getAccessToken}` },
    });
  } catch (err) {
    alert(err);
  }
};

export const deleteCharacter = async (id: number) => {
  try {
    await axios({
      method: "DELETE",
      url: `characters/${id}`,
      headers: { authorization: `Bearer ${store.getters.getAccessToken}` },
    });
    await getCharacters();
  } catch (err) {
    alert(err);
  }
};
