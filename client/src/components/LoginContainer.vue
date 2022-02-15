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
      name="Password"
      label="Password"
      placeholder="Password"
      :rules="[{ required: true, message: 'Password is required' }]")
  div(style="margin: 16px;" class="login__container__submit__container")
    van-button(block type="success" native-type="submit")="Submit"
    a(href="#" class="login__container__submit__container--forgot")="Forgot password"
    a(href="#" class="login__container__submit__container--account" )="Create account"
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios from "axios";
export default class LoginContainer extends Vue {
  email = '';
  password = '';
  error = '';

  async onSubmit() {
    this.error = '';

    const { data } = await axios.post('auth/user', {
      where: {
        email: this.email,
        password: this.password
      }
    })

    if( data.status !== 200 ) {
      this.error = "Wrong username or password";
    } else {
      const { data } = await axios.get(`accounts?email=${this.email}`)
      console.log( data );

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


