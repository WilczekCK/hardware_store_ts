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
import { useRoute } from "vue-router";
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
  isPageParamLoaded = false;
  areMoreAuctions = true;

  //infinite loading values
  limit = 2;
  page:any = 0; //what type is this? lol
  skip = 0;

  loadAuctions() : void {
    console.log(this.page);

    /* Fetch all active auctions */
    axios("/auctions",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        limit: this.limit,
        skip: (this.page && !this.isPageParamLoaded) ? (this.page - 1) * this.limit : this.skip,
      }
    }).then((response) => {
      
      
      this.auctionsArray = this.auctionsArray.concat(response.data);
      this.skip = this.page ? ((this.page - 1) * this.limit) + this.limit : this.skip + this.limit;

      this.isLoaded = true;
      this.isPageParamLoaded = true;

      this.page++;

      // Disable Load More Button if there are no more auctions
      if ( response.data.length < this.limit ) {
        this.areMoreAuctions = false;
      }
    });
  }

  created() :void {
    const route = useRoute();
    this.page = route.query.page;

    this.loadAuctions();
  }
}
</script>

<style lang="scss">
</style>


