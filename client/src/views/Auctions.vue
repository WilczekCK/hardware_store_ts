<template lang="pug">
.about
  h1="This is an auctions page"

  ul
    li(v-for="auction in auctionsArray")
      a(href="#") {{auction.brand}}
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios, { AxiosResponse } from "axios";

interface serverResponse {
  [key: string]: number | string | boolean;
}

export default class Auctions extends Vue {
  auctionsArray :Array<serverResponse> = [];

  created() :void {
    /* Fetch all active auctions */
    axios.get("/auctions").then(response => {
      this.auctionsArray = response.data
    });
  }
}
</script>

<style lang="scss">
</style>


