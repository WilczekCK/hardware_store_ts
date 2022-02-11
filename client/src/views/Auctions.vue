<template lang="pug">
.about
  h1="This is an auctions page"
  van-loading(type="spinner" v-if="!isLoaded")

  ul(v-else)
    li(v-for="auction in auctionsArray")
      router-link(:to="`/auctions/${auction.id}`")
        ListSingleAuction(:auction="auction")
  van-button(:type="!areMoreAuctions ? 'default' : 'success'" @click="loadAuctions" :disabled="!areMoreAuctions")
    = "Load more"
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
  areMoreAuctions = true;

  //infinite loading values
  limit = 2;
  skip = 0;

  created() :void {
    this.loadAuctions();
  }

  loadAuctions() : void {
    /* Fetch all active auctions */
    axios("/auctions",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        limit: this.limit,
        skip: this.skip
      }
    }).then((response) => {
      this.auctionsArray = this.auctionsArray.concat(response.data);
      this.skip = this.skip + this.limit;
      this.isLoaded = true;

      // Disable Load More Button if there are no more auctions
      if ( response.data.length < this.limit ) {
        this.areMoreAuctions = false;
      }
    });
  }
}
</script>

<style lang="scss">
</style>


