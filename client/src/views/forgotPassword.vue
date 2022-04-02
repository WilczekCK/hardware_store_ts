<template lang="pug">
.profile__container
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios, { AxiosResponse } from "axios";
import { useStore } from 'vuex';
import { Toast } from 'vant';


export default class CutomizeProfile extends Vue {
    store = useStore();
}
  
</script>

<style lang="scss">
@import "../scss/main.scss";
.profile__container{
    max-width: 350px;
    margin:0 auto;
}
</style>


