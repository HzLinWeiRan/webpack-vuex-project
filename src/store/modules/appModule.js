export default {
	state: {
		isLoading: false,
		title: "",
		isHomePage: true
	},
	mutations: {
		'LOAD_ACTION'(state, { isLoading }) {
			state.isLoading = isLoading;
		},
		'UPDATE_TITLE'(state, { title, isHomePage }) {
			state.title = title;
			state.isHomePage = isHomePage;
		}
	}
}