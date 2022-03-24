<template lang="pug">
.verification__container
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useRoute } from "vue-router";

interface AxiosRequestConfig2 {
    AxiosRequestConfig: AxiosRequestConfig;
    where: any
}


export default class Verification extends Vue {
    verificationCode:string|string[] = '';
    isVerified = false;

    async verifyCode():Promise<any> {
        await axios.patch('auth/verify/', {
            where: { verificationCode: this.verificationCode },
        })
    }

    async created() {
        const route = useRoute();
        this.verificationCode = route.params.token;

        await this.verifyCode();
    }
}
</script>

<style lang="scss">
@import "../scss/main.scss";
</style>


