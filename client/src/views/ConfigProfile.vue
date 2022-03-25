<template lang="pug">
.profile__container
 van-form(@submit="onSubmit")
    h3( class="register__container__error" v-if="errors" v-for="error in errors") {{ error }}
    
    van-uploader(:after-read="afterRead")
 
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
    div(style="margin: 16px;")
      van-button(block type="success" native-type="submit")="Save changes"
      router-link( :to="`/profile/${userId}`" target="_blank")
        van-button(block class="profile__container__preview__button" type="default" )="Preview profile"
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios, { AxiosResponse } from "axios";
import { useStore } from 'vuex';


export default class CutomizeProfile extends Vue {
    store = useStore();

    userId = 1; 
    firstName = '';
    lastName = '';
    city = '';


    async created(){
        this.userId = this.store.getters.getUserId;
    }

    afterRead = (file: string) => {
      console.log(file);
    };

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

    .profile__container__preview__button{
        margin-top: 16px;
    }
}
</style>


