import api from '@/fetch/api'
const state = {
	list: []
}

const actions = {
	'USER_FETCH'({ commit }, vux) {
		vux.loading.show();
		api.getUser().then(function (res) {
			vux.loading.hide();
			commit('USER_UPDATE', res.data)
		}).catch(function (error) {

		});
	}
}

const mutations = {
	'USER_UPDATE'(state, data) {
		state.list = data;
	}
}

export default {
	state,
	actions,
	mutations
}