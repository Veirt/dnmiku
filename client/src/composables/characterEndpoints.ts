import axios from "../axios";
import { ref } from "vue";

const characterEndpoints = () => {
  const character = ref({
    CharacterId: 0,
    CharacterName: "",
    CreateDate: undefined,
    Account: {
      AccountId: 0,
      AccountName: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      AccountLevelCode: 0,
      cash: 0,
      LastLoginDate: undefined,
      RegisterDate: undefined,
    },
  });

  const characters = ref([{ ...character.value }]);

  const getCharacters = async (query?: QueryParams) => {
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

  const getCharacterById = async (id: number) => {
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

  const editCharacter = async (id: number) => {
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

  const deleteCharacter = async (id: number) => {
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

  return {
    character,
    characters,
    getCharacters,
    getCharacterById,
    editCharacter,
    deleteCharacter,
  };
};

export default characterEndpoints;
