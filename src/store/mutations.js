import * as types from './mutation-types'

export default {
    [types.TEST_1](state, { msg }) {
        state.msg = msg
    }
}
