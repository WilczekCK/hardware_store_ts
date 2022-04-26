<template lang="pug">
.profile__container
    van-uploader(:after-read="afterRead")
    h3( class="register__container__error" v-if="errors" v-for="error in errors") {{ error }}
    van-form(@submit="onSubmit")
        van-cell-group(inset)
            van-divider="Public informations"
            van-field(
                v-model="firstName"
                name="firstName"
                label="First Name")
            van-field(
                v-model="lastName"
                name="lastName"
                label="Last Name")
            van-field(
                v-model="city"
                name="city"
                label="City"
                placeholder="City")
            van-divider="Personal informations"
            van-field(
                v-model="password"
                name="password"
                label="New password"
                type="password"
                placeholder="Empty to keep the same"
                @keyup="unlockOldPassword")
            van-field(
                v-model="repeatPassword"
                name="repeatPassword"
                label="Repeat password"
                type="password"
                placeholder="Empty to keep the same"
                @keyup="unlockOldPassword")
            van-field(
                v-model="oldPassword"
                name="oldPassword"
                label="Old password"
                type="password"
                placeholder="Previously used password"
                :rules="[{ required: isOldPasswordDisabled ? false : true, message: 'Required to change the password' }]")
        div(style="margin: 16px;")
        router-link( :to="`/profile/${userId}`" target="_blank")
            van-button(block class="profile__container__preview__button" type="default" )="Preview profile"
        van-button(block type="success" native-type="submit")="Save changes"
        small="You will be logged out when saving the changes!"
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios, { AxiosResponse } from "axios";
import { useStore } from 'vuex';
import { Toast } from 'vant';


export default class CutomizeProfile extends Vue {
    store = useStore();

    userId = 0; 
    firstName:any = '';
    lastName:any = '';
    city = '';
    password = '';
    repeatPassword = '';
    oldPassword = '';
    isOldPasswordDisabled = true;

    async beforeMount(){
        this.userId = await this.store.getters.getUserId;

        await this.fetchInformationsAboutProfile();
    }

    unlockOldPassword() {
        if( this.password.length && this.repeatPassword.length ) {
            this.isOldPasswordDisabled = false;
        } else {
            this.isOldPasswordDisabled = true;
        }
    }

    async fetchInformationsAboutProfile(){
        const { data, status } = await axios.get('/accounts/'+this.userId )
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((error) => {
                return { status: 201, data: 'No user like that' };
            });

        if(status === 200){
            const { firstName, lastName, city } = data[0];

            this.firstName = firstName;
            this.lastName = lastName;
            //this.city = data.city;
        }
    }

    async changeInformationsAboutProfile(){
        let set:Record<string,string|number> = {};

        this.firstName   ? set.firstName   = this.firstName   : '';
        this.lastName    ? set.lastName    = this.lastName    : '';
        //this.city ? set.city = this.city : '';
        this.password    ? set.password    = this.password    : '';
        this.oldPassword ? set.oldPassword = this.oldPassword : '';

        await axios.put('/accounts/'+this.userId, {
            set            
        })
        .then((response: AxiosResponse) => {
            this.store.dispatch('logout');
            this.$router.push('/')
            return response;
        })
        .catch((error) => {
            return Toast.fail('Passwords do not match');
        });
    }

    afterRead = (file: string) => {
      console.log(file);
    };

    async onSubmit() {
        if(this.password !== this.repeatPassword) return Toast.fail('Passwords do not match');
        
        await this.changeInformationsAboutProfile();
    }

}
  
</script>

<style lang="scss">
@import "../scss/main.scss";
.profile__container{
    max-width: 350px;
    margin:0 auto;

    small { opacity:0.8; font-size: 11px; padding-top:5px; }

    .profile__container__preview__button{
        margin: 10px 0px;
    }
}
</style>


