<template lang="pug">
.verification__container
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios, { AxiosResponse } from "axios";
import { useRoute } from "vue-router";


export default class Verification extends Vue {
    verificationCode = '';

    created() {
        const route = useRoute();
        console.log(route.params.token);
    }
}
</script>

<style lang="scss">
@import "../scss/main.scss";
</style>


