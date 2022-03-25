<template lang="pug">
.profile__container
 van-form(@submit="onSubmit")
    h3( class="register__container__error" v-if="errors" v-for="error in errors") {{ error }}
    van-cell-group(inset)
        van-field(
            v-model="firstName"
            name="firstName"
            label="First Name"
            placeholder="First Name"
            :rules="[{ required: true, message: 'First name is required' }]")
        van-field(
            v-model="lastName"
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
            :rules="[{ required: true, message: 'Last name is required' }]")
        van-field(
            v-model="city"
            name="city"
            label="City"
            placeholder="City")
    div(style="margin: 16px;" class="login__container__submit__container")
      van-button(block type="success" native-type="submit")="Change"
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios, { AxiosResponse } from "axios";


export default class CutomizeProfile extends Vue {
    firstName = '';
    lastName = '';
    city = '';

    onSubmit() {
        return true;
    }
}
  
</script>

<style lang="scss">
@import "../scss/main.scss";
.profile__container{
    max-width: 350px;
    margin:0 auto;
}
</style>


