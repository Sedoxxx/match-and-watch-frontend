import { SET_USER_TOKEN_DATA_MUTATION } from "@/store/storeconstants";

export default{
    [SET_USER_TOKEN_DATA_MUTATION](state,payload){
        state.authenticated=payload.authenticated;
        state.access_token=payload.access_token;
        state.expires_in=payload.expires_in;
        state.refresh_token=payload.refresh_token;
        state.refresh_token_expires_in=payload.refresh_token_expires_in;
    },
};