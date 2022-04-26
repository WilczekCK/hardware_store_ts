<template lang="pug">
.profile__container
    van-loading(type="spinner" v-if="!isLoaded")
    .profile__container__wrapper(v-else-if="!error.status")
        h2 {{ userInfo.firstName }}
    .profile__container__error(v-else)
        h2 {{ error.data }}
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios, { AxiosResponse } from "axios";

export default class VisitProfile extends Vue {
    userId = 0; 
    userInfo = {};
    error = {};
    isLoaded = false;

    async beforeMount(){
        this.userId =+ this.$route.params.id //force convert to int

        await this.fetchInformationsAboutProfile();
    }

    async fetchInformationsAboutProfile(){
        await axios.get('/accounts/'+this.userId )
            .then((response: AxiosResponse) => {
                this.userInfo = response.data[0];
            })
            .catch((error) => {
                this.error = { status: 404, data: 'No user like that' };
            });

        this.isLoaded = true;
    }

}
  
</script>

<style lang="scss">
@import "../scss/main.scss";
.profile__container{
}
</style>


