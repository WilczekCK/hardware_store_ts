import { createStore } from "vuex";

export default createStore({
  state: {
    token: '',
    userType: 0,
    username: '',
  },
  getters: {
    getLogin:    (state) => state.username,
    getToken:    (state) => state.token,
    getUserType: (state) => state.userType
  },
  actions: {
    loginSession( {commit}, data){
      const userInfo = {
        token: data.verificationCode,
        firstName: data.firstName
      };

      sessionStorage.setItem('session_hardware', JSON.stringify(userInfo));
      commit('setSession', userInfo);
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
      state.token = data.verificationCode, //temp, no token now
      state.userType; //temp, no admin privileges available now!
      state.username = data.firstName;
    },
    logoutSession(state) {
      sessionStorage.clear()
      
      state.token = ''
      state.userType = 0
      state.username = '';
    }
  },
});
