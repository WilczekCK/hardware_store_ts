import { createStore } from "vuex";

export default createStore({
  state: {
    token: '',
    userId: '',
    userType: 0,
    username: ''
  },
  getters: {
    getLogin:    (state) => state.username,
    getToken:    (state) => state.token,
    getUserId:   (state) => state.userId,
    getUserType: (state) => state.userType
  },
  actions: {
    loginSession(context, data){

    },
    getSession(context){

    },
    logout(context){

    }
  },
  mutations: {
    setLogin(state, data){

    },
    logoutSession(state){
    
    }
  },
});
