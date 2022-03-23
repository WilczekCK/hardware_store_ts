<template lang="pug">
van-form(class="register__container")
  h3( class="register__container__error" v-if="error") {{ error }}
  van-cell-group(inset)
    van-field(
      v-model="firstName"
      name="firstName"
      label="First Name"
      placeholder="First Name"
      :rules="[{ required: true, message: 'First name is required' }]")
    van-field(
      v-model="email"
      name="email"
      label="Email"
      placeholder="Email"
      :rules="[{ required: true, message: 'Email is required' }]")
    van-field(
      v-model="password"
      type="password"
      name="password"
      label="Password"
      placeholder="Password"
      :rules="[{ required: true, message: 'Password is required' }]")
    van-field(
      v-model="verifyPassport"
      type="password"
      name="check_password"
      label="Type password again"
      placeholder="Password"
      :rules="[{ required: true, message: 'Verify passport by writing it again' }]")
    van-checkbox(class="register__container__checkbox" v-model="rulesAccepted" @click="rulesAccepted = !!rulesAccepted")="I agree to the rules and conditions of the site"
    van-checkbox(class="register__container__checkbox" v-model="isAdult" @click="isAdult = !!isAdult")="I am at least 18 years old"
  div(style="margin: 16px;" class="login__container__submit__container")
    van-button(block type="success" native-type="submit")="Submit"
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Toast } from "vant";
import { useStore } from 'vuex';
import axios from "axios";

export default class Register extends Vue {
    rulesAccepted = false;
    isAdult = false;

    firstName = '';
    email = '';
    password = '';
    verifyPassport = '';
    
    error = '';
}
</script>

<style lang="scss">
@import "../scss/main.scss";
.register__container{
    max-width: 350px;
    margin:0 auto;
    .register__container__error{ color:red }
    .register__container__checkbox{
        padding:15px 0px;
        text-align:left;
        width: 90%;
        margin-left:20px;
    }
}
</style>


