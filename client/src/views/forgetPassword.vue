<template lang="pug">
.profile__container
    .profile__container--error
        h2 {{ error }}
    .profile__container--newPassword(v-if="verifyCode")
        h2="Enter new password"
        van-form(@submit="changePasswordSubmit" class="login__container")
            van-cell-group(inset class="login__container__cellgroup")
                van-field(
                    v-model="newPassword"
                    name="newPassword"
                    label="New password"
                    placeholder="New password"
                    type="password"
                    :rules="[{ required: true, message: 'Password is required' }]")
                van-field(
                    v-model="newPasswordRepeat"
                    name="newPasswordRepeat"
                    label="Repeat new password"
                    placeholder="New Password"
                    type="password"
                    :rules="[{ required: true, message: 'Password is required' }]")
            van-button(block type="success" native-type="submit")="Submit"
    .profile__container--form(v-else-if="!sentMail")
        van-form(@submit="verifyCodeSubmit" class="login__container")
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
    newPassword = '';
    newPasswordRepeat = '';
    error = '';

    delay = {
        isActive: () => this.delay.delayTime ? true : false,
        delayTime: 0,

        attachDelay: (time: number) => { //measured in seconds
            this.delay.delayTime = time;
            let delay = setInterval( ():void => {
                this.delay.delayTime--;

                if (this.delay.delayTime === 0) {
                    clearInterval(delay);
                }
            }, time * 100);
        },
        checkIfActive: () => {
            if (this.delay.isActive()) {
                Toast.fail('Please wait ' + this.delay.delayTime + ' seconds more');
                return true;
            }
            
            this.delay.attachDelay(15);
            return false;
        }
    }

    async sendVerifyCode(){
        const { message, status } = await axios.post('/auth/forgetPassword', {where: { email: this.email }})
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((error) => {
                return error;
            });

        return { message, status };
    }   

    async confirmVerifyCode(){
        const { message, status } = await axios.put('/auth/forgetPassword', {where: { verificationCode: this.verifyCode, password: this.newPassword, forgottenPassword: true }})
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((error) => {
                return error;
            });

        return { message, status };
    }

    async verifyCodeSubmit() {
        if( this.delay.checkIfActive() ) return;

        const { status } = await this.sendVerifyCode();

        if(status === 200){
            Toast.success('Verification email sent to your inbox!');
            this.sentMail = true;
        }else{
            Toast.fail("Oops... No user with that email");
        }
    }

    async changePasswordSubmit() {
        if( this.newPassword !== this.newPasswordRepeat ) return Toast.fail("Oops... passwords are not the same");
        if( this.delay.checkIfActive() ) return;
        
        const { status } = await this.confirmVerifyCode();

        if(status === 200) {
            Toast.success('Password changed successfully');
            this.$router.push('/');
        } else {
            return Toast.fail("Oops... No verification code like that");
        }
    }
    
    mounted() {
        this.verifyCode = this.$route.params.token;
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


