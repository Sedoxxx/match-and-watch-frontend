import {
    GET_USER_TOKEN_GETTER,
    GET_USER_REFRESH_TOKEN_GETTER,
    IS_USER_AUTHENTICATE_GETTER,
} from '../../storeconstants';

export default {
    [GET_USER_TOKEN_GETTER]: (state) => {
        return state.access_token;
    },

    [IS_USER_AUTHENTICATE_GETTER](state) {
        return !!state.access_token;
    },
    [GET_USER_REFRESH_TOKEN_GETTER]:(state) =>{
        return state.refresh_token;
    }
};