<template lang="pug">
van-form(@submit="onSubmit" class="login__container")
  van-cell-group(inset class="login__container__cellgroup")
    van-field(
      class="login__container__cellgroup__field"
      v-model="username"
      name="Username"
      label="Username"
      placeholder="Username"
      :rules="[{ required: true, message: 'Username is required' }]")
    van-field(
      class="login__container__cellgroup__field"
      v-model="password"
      type="password"
      name="Password"
      label="Password"
      placeholder="Password"
      :rules="[{ required: true, message: 'Password is required' }]")
  div(style="margin: 16px;" class="login__container__submit__container")
    van-button(round block type="success" native-type="submit")="Submit"
    a(href="#" class="login__container__submit__container--forgot")="Forgot password"
    a(href="#" class="login__container__submit__container--account" )="Create account"
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class LoginContainer extends Vue {

  onSubmit() {
    return;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../scss/main.scss";
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


