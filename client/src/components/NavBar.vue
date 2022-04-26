<template lang="pug">
van-nav-bar(fixed=true id="navbar")
  template(#left)
    router-link(to="/")
        ="Hardware Store"
  template(#right)
    span Hello, 
      b {{userInfo ? userInfo : 'Guest'}}
    van-icon(:name="menu.getMenuIcon()" @click="menu.toggle()" class="navbar__dropdown__icon")
    .navbar__dropdown__container(v-if="menu.isToggled")
      router-link(to="/")
        van-icon(name="wap-home")
        ="Home"
      router-link(to="/auctions")
        van-icon(name="bag")
        ="Auctions"
      router-link(to="/profile" v-if="userInfo")
        van-icon(name="manager")
        ="Account"
      router-link(to="/mails" v-if="userInfo")
        van-icon(name="comment")
        ="Mails"  
      router-link(to="/login" class="navbar__container--login" v-if="!userInfo")
        van-button(icon="friends-o" type="success" )="Sign/Log in"
      van-button(icon="friends-o" type="success" v-else @click="logout")="Log out" 

</template>


<script lang="ts">
import { Vue } from "vue-class-component";
import { computed } from "vue";
import { useStore } from 'vuex';
import axios from "axios";

/**
 * 
      router-link(to="/login" class="navbar__container--login" v-if="!userInfo")
      van-button(icon="friends-o" type="success" )="Sign/Log in"
    van-button(icon="friends-o" type="success" v-else @click="logout")="Log out, " 
      span {{userInfo}}
          router-link(to="/")
      ="Home"
    router-link(to="/auctions")
      ="Auctions"
 * 
 */
  
export default class NavBar extends Vue {
  store = useStore();
  userInfo = {}; 

  menu = { 
    isToggled: false,
    getMenuIcon: (): string => this.menu.isToggled ? 'arrow-up' : 'arrow-down',

    toggle: (): void => {
      this.menu.isToggled = !this.menu.isToggled;
    },
  }

  async logout() {
    this.store.dispatch('logout');
  }

  async created(){
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

    a, i {
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

    /* Dropdown */

    .navbar__dropdown__icon{ padding: 0px 10px; }
    .navbar__dropdown__container{
        position: absolute;
        top: calc(100% + 10px);
        right: 0;
        z-index: 1;
        width: 300px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        border-radius: 2px;
        padding: 10px;
        box-sizing: border-box;
        text-align: left;
        box-sizing:border-box;
        display: flex;
        flex-direction:column;

        a,button{ margin-top: 10px; margin-bottom:5px; }
        a {
          display:flex;
          align-items: center;
          font-size: 14px;

          .van-icon {
            font-size: 18px;
            margin-right: 10px;
            margin-left: 5px;
          }

          &:hover .van-icon{ color: $hover_color; }
        }
    }
}
</style>


