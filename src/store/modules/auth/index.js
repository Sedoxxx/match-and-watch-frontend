import mutations from './mutations';
import getters from './getters';
import actions from './actions';
export default {
    namespaced:true,
    state(){
        return {
           authenticated:0,
           access_token:'',
           expires_in:0,
           refresh_token:'',
           refresh_token_expires_in:0,
        };
    },
    mutations,
    getters,
    actions,
};

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJLYXJhbTEzNTQ5QGdtYWlsLmNvbSIsImlkIjoiZGNmMjdlZTYtYjIzYy00NzQxLWJhYzktODA1MGIwMGYzZTBlIiwibmFtZSI6IkthcmFtIiwic3VybmFtZSI6IktoYWRkb3VyIiwiZXhwIjoxNzIxNjMyMjA2LjkyNjI2Nn0.9IgjXq4mmtz8Dw3wd3jcFVWWdTEWMjA3T-f71oW31Fc