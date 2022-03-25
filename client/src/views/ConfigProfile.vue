<template lang="pug">
.profile__container
    van-uploader(:after-read="afterRead")
    h3( class="register__container__error" v-if="errors" v-for="error in errors") {{ error }}
    van-form(@submit="onSubmit")
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
                placeholder="Last Name")
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
import { Toast } from 'vant';


export default class CutomizeProfile extends Vue {
    store = useStore();

    timer = 0;
    userId = 0; 
    firstName:any = '';
    lastName:any = '';
    city = '';

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
            }
            
        })
        .then((response: AxiosResponse) => {
            return response;
        })
        .catch((error) => {
            return { status: 201, data: 'No user like that' };
        });
    }

    afterRead = (file: string) => {
      console.log(file);
    };

    attachDelay = (): void => {
        this.timer = 15; //a length of delay in seconds

        const interval = setInterval(():void => {
            this.timer--;
            if ( !this.timer ) { clearInterval(interval); }
        }, 1000);
    }

    async onSubmit() {
        if ( this.timer ) return Toast.fail('Please wait few seconds before submitting again');
        else {
            await this.changeInformationsAboutProfile();
            this.attachDelay();

            Toast.success('Profile updated successfully');
        }
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


