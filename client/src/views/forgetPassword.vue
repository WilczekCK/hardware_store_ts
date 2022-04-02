<template lang="pug">
.profile__container
    van-form(@submit="onSubmit" class="login__container")
    van-cell-group(inset class="login__container__cellgroup")
        van-field(
            v-model="email"
            name="email"
            label="Email"
            placeholder="Email"
            :rules="[{ required: true, message: 'Email is required' }]")
        van-button(block type="success" native-type="submit")="Submit"
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios, { AxiosResponse } from "axios";
import { useStore } from 'vuex';
import { Toast } from 'vant';


export default class forgetPassword extends Vue {
    store = useStore();
    email = '';
}
  
</script>

<style lang="scss">
@import "../scss/main.scss";
.profile__container{
    max-width: 350px;
    margin:0 auto;

    button{ margin-top: 10px; }
}
</style>


