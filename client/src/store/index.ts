import { createStore } from "vuex";

export default createStore({
  state: {
    token: '',
    userType: 0,
    username: '',
    userId: 0,
  },
  getters: {
    getLogin:    (state) => state.username,
    getToken:    (state) => state.token,
    getUserType: (state) => state.userType,
    getUserId:    (state) => state.userId,
  },
  actions: {
    loginSession( {commit}, data){
      const userInfo = {
        sessionID: data.sessionID,
        firstName: data.nickname,
        userId: data.userId,
      };

      sessionStorage.setItem('session_hardware', JSON.stringify(userInfo));
      commit('setSession', userInfo);
    },
    getSession( {commit} ){
      //const session = sessionStorage.getItem('session_hardware');
      const session = '';

      if(session && typeof session === 'string' && session !== ''){
        const data = JSON.parse(session);
        commit('setSession', data);
      }
    },
    logout: ( {commit} ) => commit('logoutSession')
  },
  mutations: {
    setSession(state, data) {
      state.userType; //temp, no admin privileges available now!
      state.username = data.firstName;
      state.userId = data.userId;
    },
    logoutSession(state) {
      sessionStorage.clear()
      
      state.token = ''
      state.userType = 0
      state.username = '';
    }
  },
});
