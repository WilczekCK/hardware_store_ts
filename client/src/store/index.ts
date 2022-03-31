import { createStore } from "vuex";
import { useCookies } from "vue3-cookies";
import axios from 'axios';

const { cookies } = useCookies();

const refreshStoreByToken = async ( id:string ) :Promise<Record<string, string>> => {
  const {data} = await axios("/auth/refresh",{
    method: 'get',
    headers: {
      "Authorization": id
    }
  })
  console.log(data);
  return data;
}

const logoutFromApiByToken = async ( id:string ) :Promise<Record<string, string>> => {
  const {data} = await axios("/auth/logout",{
    method: 'get',
    headers: {
      "Authorization": id
    }
  })

  return data;
}

export default createStore({
  state: {
    userType: 0,
    username: '',
    userId: 0,
  },
  getters: {
    getLogin:    (state) => state.username,
    getUserType: (state) => state.userType,
    getUserId:    (state) => state.userId,
  },
  actions: {
    loginSession( {commit}, data){
      const userInfo = {
        username: data.username,
        userId: data.id,
      };
      
      cookies.set('session_hardware', JSON.stringify( {id: data.sessionID}));
      commit('setSession', userInfo);
    },
    async getSession( {commit} ){
      if ( !this.getters.getLogin && cookies.get("session_hardware")){
        const { id }:any = cookies.get("session_hardware");
        const getUser = await refreshStoreByToken(id);

        commit('setSession', {
          userId: getUser.id,
          username: getUser.username,
        });
      } 
    },
    async logout( {commit} )  {
      const { id }:any = cookies.get("session_hardware");
      
      await logoutFromApiByToken(id);
      commit('logoutSession');
    }
  },
  mutations: {
    setSession(state, data) {
      state.userType; //temp, no admin privileges available now!
      state.username = data.username;
      state.userId = data.userId;
    },
    logoutSession(state) {
      cookies.remove('session_hardware');

      state.userType = 0
      state.username = '';
      state.userId = 0;
    }
  },
});
