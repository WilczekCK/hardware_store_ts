<template lang="pug">
.verification__container
    h3 {{ message }}
    router-link(to="/")
      van-button(block type="success" native-type="submit" href="/")="Back to homepage"
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useRoute } from "vue-router";

interface verifyUserResponse {
  status: number;
  message: string;
}

export default class Verification extends Vue {
    verificationCode:string|string[] = '';
    message = '';

    async verifyCode():Promise<verifyUserResponse> {
        const { data, status } = await axios.patch('auth/verify/', {
            where: { verificationCode: this.verificationCode },
        })

        return {message: data.message, status};
    }

    async created() {
        const route = useRoute();
        this.verificationCode = route.params.token;

        const { message, status } = await this.verifyCode();
        this.message = message;
    }
}
</script>

<style lang="scss">
@import "../scss/main.scss";
.verification__container{
    max-width:350px;
    margin:0 auto
}
</style>


