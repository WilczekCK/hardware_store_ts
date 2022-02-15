import { createStore } from "vuex";

export default createStore({
  state: {
    token: '',
    userId: '',
    userType: 0
  },
  getters: {
    getLogin(state){

    },
    getToken(state){

    },
    getUserId(state){

    },
    getUserType(state){

    }
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
