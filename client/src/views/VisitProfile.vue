<template lang="pug">
.profile__container
    h1 {{ firstName }}
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios, { AxiosResponse } from "axios";

export default class VisitProfile extends Vue {
    userId = 0; 
    firstName:any = '';
    lastName:any = '';
    city = '';

    async beforeMount(){
        this.userId =+ this.$route.params.id //force convert to int

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

}
  
</script>

<style lang="scss">
@import "../scss/main.scss";
.profile__container{
}
</style>


