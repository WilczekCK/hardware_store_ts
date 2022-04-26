<template lang="pug">
.register__container
  van-form(@submit="onSubmit" v-if="!isCreatedSuccessfully")
    h3( class="register__container__error" v-if="errors" v-for="error in errors") {{ error }}
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
        v-model="verifyPassword"
        type="password"
        name="check_password"
        label="Type password again"
        placeholder="Password"
        :rules="[{ required: true, message: 'Verify passport by writing it again' }]")
      van-checkbox(class="register__container__checkbox" v-model="rulesAccepted" @click="rulesAccepted = !!rulesAccepted"  :rules="[{ required: true, message: 'You have to accept rules' }]")="I agree to the rules and conditions of the site"
      van-checkbox(class="register__container__checkbox" v-model="isAdult" @click="isAdult = !!isAdult"  :rules="[{ required: true, message: 'You have to be adult' }]")="I am at least 18 years old"
    div(style="margin: 16px;" class="login__container__submit__container")
      van-button(block type="success" native-type="submit")="Submit"
  div(v-else)
    h3="You have successfully created an account"
    p="Check the mail for the confirmation link"
    router-link(to="/")
      van-button(block type="success" native-type="submit" href="/")="Back to homepage"
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios, { AxiosResponse } from "axios";

interface createUserResponse {
  status: number;
  message: string;
}

export default class Register extends Vue {
    rulesAccepted = false;
    isAdult = false;
    isCreatedSuccessfully = false;

    firstName = '';
    email = '';
    password = '';
    verifyPassword = '';
    
    errors:string[] = [];

    async sendUserInfo() :Promise< createUserResponse > {
      const { data, status }:AxiosResponse = await axios.post('accounts/', {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
      })
      const { message } = data;

      return {message, status};
    }

  async onSubmit() {
    this.errors = [];

    if( this.password !== this.verifyPassword ) {
        this.errors.push('Passwords do not match');
    }

    if ( !this.rulesAccepted || !this.isAdult ) {
        this.errors.push('You have to accept rules and be adult');
    }

    if ( !this.errors.length ) {
      const { message, status } = await this.sendUserInfo();
        
      if( status !== 200 ) {
        return this.errors.push(message);
      }

      this.isCreatedSuccessfully = true;
    }
  }
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


