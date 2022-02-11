<template lang="pug">
.about
  h1="This is an auctions page"
  van-loading(type="spinner" v-if="!isLoaded")

  ul(v-else)
    li(v-for="auction in auctionsArray")
      router-link(:to="`/auctions/${auction.id}`")
        ListSingleAuction(:auction="auction")
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import axios from "axios";
import ListSingleAuction from '../components/ListSingleAuction.vue';

interface serverResponse {
  [key: string]: number | string | boolean;
}

@Options({
  components: {
    ListSingleAuction,
  }
})

export default class Auctions extends Vue {
  auctionsArray :Array<serverResponse> = [];
  isLoaded = false;

  created() :void {
    /* Fetch all active auctions */
    axios.get("/auctions").then(response => {
      this.auctionsArray = response.data
      this.isLoaded = false;
    });
  }
}
</script>

<style lang="scss">
</style>


