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
    loginSession( {commit}, data){
      sessionStorage.setItem('session_hardware', JSON.stringify(data));
      commit('setSession', data.username);
    },
    getSession( {commit} ){
      const session = sessionStorage.getItem('session_hardware');
      if(session && typeof session === 'string' && session !== ''){
        const data = JSON.parse(session);
        commit('setSession', data);
      }
    },
    logout: ( {commit} ) => commit('logoutSession')
  },
  mutations: {
    setSession(state, data) {
      state.token = 'no_token_now' //temp, no token now
      state.userId = data.userid
      state.userType = 0; //temp, no admin privileges available now!
      state.username = data.firstname;
    },
    logoutSession(state) {
      sessionStorage.clear()
      
      state.token = ''
      state.userId = ''
      state.userType = 0
      state.username = '';
    }
  },
});
