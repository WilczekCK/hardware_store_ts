<template lang="pug">
van-nav-bar(fixed=true id="navbar")
  template(#left)
    router-link(to="/")
        ="Hardware Store"
  template(#right)
    router-link(to="/")
      ="Home"
    router-link(to="/auctions")
      ="Auctions"
    router-link(to="/login" class="navbar__container--login" v-if="!userInfo")
      van-button(icon="friends-o" type="success" )="Sign/Log in"
    van-button(icon="friends-o" type="success" v-else @click="logout")="Log out, " 
      span {{userInfo}}
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { computed } from "vue";
import { useStore } from 'vuex';
import axios from "axios";
  
export default class NavBar extends Vue {
  store = useStore();
  userInfo = {}; 

  async logout() {
    this.store.dispatch('logout');

    await axios.post('auth/user/logout');
  }

  async created(){
    const dupa = this.store.dispatch('getSession');
    
    this.userInfo = computed(() => this.store.getters.getLogin)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../scss/main.scss";
#navbar{

    /* Tweak for desktop only */
    @media (min-width: 768px) {
        max-width: 75%;
        margin-left: 12.5%;
    }

    a{
        margin-left: 25px;
        font-weight: 400;
        color: $text_color;

        &:hover{
            color: $hover_color;
        }
    }

    /* Logo */
    &:first-of-type{
        padding-top:10px;
        padding-bottom:10px;
    }


}
</style>


