import { ref } from "vue"

export const query = ref({
	take: 10,
	skip: 0,
	keyword: "",
	status: "",
})

export const resetQuery = () => {
	query.value = {
		take: 10,
		skip: 0,
		keyword: "",
		status: "",
	}
}
