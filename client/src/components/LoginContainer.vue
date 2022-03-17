<template lang="pug">
van-form(@submit="onSubmit" class="login__container")
  h3( class="login__error" v-if="error") {{ error }}
  van-cell-group(inset class="login__container__cellgroup")
    van-field(
      class="login__container__cellgroup__field"
      v-model="email"
      name="email"
      label="Email"
      placeholder="Email"
      :rules="[{ required: true, message: 'Email is required' }]")
    van-field(
      class="login__container__cellgroup__field"
      v-model="password"
      type="password"
      name="password"
      label="Password"
      placeholder="Password"
      :rules="[{ required: true, message: 'Password is required' }]")
  div(style="margin: 16px;" class="login__container__submit__container")
    van-button(block type="success" native-type="submit")="Submit"
    a(href="#" class="login__container__submit__container--forgot")="Forgot password"
    a(href="#" class="login__container__submit__container--account" )="Create account"
    router-link(to="/authTester" class="login__container__submit__container--account" )="Auth Tester"
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { useStore } from 'vuex';

import axios from "axios";

export default class LoginContainer extends Vue {
  store = useStore();
  email = '';
  password = '';
  error = '';
  user = {};

  async areCredentialsValid() :Promise<boolean> {
    const { data } = await axios.post('auth/user/login', {
      email: this.email,
      password: this.password,
    })

    if( data.username && data.id ) {
      this.user = data;
      return data;
    }

    this.error = "Wrong username or password";
    return false;
  }

  async getAccountInfo() :Promise<boolean> {
    const { data } = await axios.post(`accounts/auth`,{
      where: {
        email: this.email
      },
    })

    if( data[0].isVerified ){
      this.user = data[0];
      return true
    }

    this.error = "Please verify your account first!";
    return false;
  }
  

  async onSubmit() {
    this.error = '';
    this.user = {};

    if ( await this.areCredentialsValid() ) {
      this.store.dispatch('loginSession', this.user);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../scss/main.scss";
.login__error{ color: red; }
.login__container{
  width: 315px;
  margin: 0 auto;

  .login__container__submit__container{
    display:flex;
    flex-wrap:wrap;

    a{
      flex-basis: 50%;
      font-size: 12px;
      margin-top: 10px;
    }

    button{
      flex-basis:100%;
    }
  }
}
</style>


