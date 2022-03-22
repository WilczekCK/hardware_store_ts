<template lang="pug">
.register__container
    van-cell-group(inset class="register__container__cellgroup")
        van-field(
            class="register__container__cellgroup__field"
            v-model="email"
            name="email"
            label="Email"
            placeholder="Email"
            :rules="[{ required: true, message: 'Email is required' }]")
        van-field(
            class="register__container__cellgroup__field"
            v-model="password"
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            :rules="[{ required: true, message: 'Password is required' }]")
        van-field(
            class="register__container__cellgroup__field"
            v-model="firstName"
            name="firstName"
            label="First name"
            placeholder="Adam"
            :rules="[{ required: true, message: 'First name is required' }]")
        van-field(
            class="register__container__cellgroup__field"
            v-model="lastName"
            name="lastName"
            label="Last name"
            placeholder="Smith"
            :rules="[{ required: true, message: 'Last name is required' }]")
</template>

<script lang="ts">
import { Vue, } from "vue-class-component";
import { useStore } from 'vuex';
import axios from "axios";

export default class Register extends Vue {
  store = useStore();
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  voivodeship = '';
  city = '';
  acceptedRules = false;
}
</script>

<style lang="scss">
.register__container{
    max-width: 350px;
    margin:0 auto;
}
</style>


