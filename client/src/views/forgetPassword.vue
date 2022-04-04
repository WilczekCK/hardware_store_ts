<template lang="pug">
.profile__container
    .profile__container--newPassword(v-if="verifyCode")
        .profile__container__wrapper
            h2 {{ verifyCode }}
    .profile__container--form(v-else-if="!sentMail")
        van-form(@submit="onSubmit" class="login__container")
            van-cell-group(inset class="login__container__cellgroup")
                van-field(
                    v-model="email"
                    name="email"
                    label="Email"
                    placeholder="Email"
                    :rules="[{ required: true, message: 'Email is required' }]")
            van-button(block type="success" native-type="submit")="Submit"
    .profile__container--sent(v-else)
        h2="Verification email sent to your inbox!"
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios, { AxiosResponse } from "axios";
import { useStore } from 'vuex';
import { Toast } from 'vant';


export default class forgetPassword extends Vue {
    store = useStore();
    email = '';
    sentMail = false;
    verifyCode:any = '';

    async sendVerifyCode(){
        const { data, status } = await axios.post('/auth/forgetPassword', {where: { email: this.email }})
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((error) => {
                return { status: 201, data: 'No user like that' };
            });

        return data;
    }

    async onSubmit() {
        this.sentMail = true;
        
        const {data} = await this.sendVerifyCode();
    }
    
    mounted() {
        this.verifyCode = this.$route.query.verifyCode;
    }
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


