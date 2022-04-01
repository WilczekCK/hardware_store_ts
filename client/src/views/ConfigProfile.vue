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
                label="First Name"
                placeholder="First Name"
                :rules="[{ required: true, message: 'First name is required' }]")
            van-field(
                v-model="lastName"
                name="lastName"
                label="Last Name"
                placeholder="Last Name")
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
                placeholder="Empty to keep the same")
            van-field(
                v-model="repeatPassword"
                name="repeatPassword"
                label="Repeat password"
                placeholder="Empty to keep the same")
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

    async beforeMount(){
        this.userId = await this.store.getters.getUserId;

        await this.fetchInformationsAboutProfile();
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
        await axios.put('/accounts/'+this.userId, {
            set: {
                firstName: this.firstName,
                lastName: this.lastName,
                password: this.password,
            }
            
        })
        .then((response: AxiosResponse) => {
            this.store.dispatch('logout');
            return response;
        })
        .catch((error) => {
            return { status: 201, data: 'No user like that' };
        });
    }

    afterRead = (file: string) => {
      console.log(file);
    };

    async onSubmit() {
        await this.changeInformationsAboutProfile();
        this.$router.push('/')
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


