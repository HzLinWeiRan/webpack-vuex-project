export default {
    state: {
        isLoading: false,
        title: ""
    },
    mutations: {
        'LOAD_ACTION'(state,{isLoading}){
            state.isLoading = isLoading;
        },
        'UPDATE_TITLE'(state,title){
            state.title = title;
        }
    }
}