import axios from "../axios";
import { ref } from "vue";

export const character = ref({
  CharacterId: 0,
  CharacterName: "",
  CreateDate: undefined,
  AccountName: "",
});

export const characters = ref([{ ...character.value }]);

export const getCharacters = async (query?: QueryParams) => {
  try {
    const res = await axios({
      method: "GET",
      url: "characters",
      params: query,
    });
    characters.value = res.data;
  } catch (err) {
    alert(err);
  }
};

export const getCharacterById = async (id: number) => {
  try {
    const res = await axios({
      method: "GET",
      url: `characters/${id}`,
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
    });
    await getCharacters();
  } catch (err) {
    alert(err);
  }
};
