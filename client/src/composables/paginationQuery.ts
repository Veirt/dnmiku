import { ref } from "vue";

const query = ref({
  take: 10,
  skip: 0,
  keyword: "",
});

export default query;
