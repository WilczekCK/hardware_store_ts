<template lang="pug">
.auctions__container
  router-link(to="/auctions/add")
    van-button(v-if="userInfo" icon="plus" type="success")="Add new auction" 
  h1="This is an auctions page"
  van-loading(type="spinner" v-if="!isLoaded" class="auctions__container--loading")
  h2(v-else-if="!auctionsArray.length && isLoaded")="No auctions :("
  .auctions__container--list(v-else)
    ul
      li(v-for="auction in auctionsArray")
        router-link(:to="`/auctions/${auction.id}`")
          ListSingleAuction(:auction="auction")

  van-button(:type="page <= 1 ? 'default' : 'success'" @click="() => { page = parseInt(page) - 1; loadAuctions('previous')}" :disabled="page <= 1 || !isLoaded")
    = "Previous page"
  van-button(:type="!areMoreAuctions ? 'default' : 'success'" @click="() => { page = parseInt(page) + 1; loadAuctions('next')}" :disabled="!areMoreAuctions || !isLoaded")
    = "Next page"
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { useRoute } from "vue-router";
import { useStore } from 'vuex';
import axios from "axios";
import ListSingleAuction from '../components/ListSingleAuction.vue';
import { computed } from "vue";

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
  store = useStore();
  userInfo = {};

  //infinite loading values
  limit = 2;
  page:any = 0; //what type is this? lol
  skip = 0;

  loadAuctions(pageDirection: string) : void {
    this.isLoaded = false; 
    
    /* Fetch all active auctions */
    axios("/auctions",
    {
      method: "GET",
      params: {
        limit: this.limit,
        skip: (this.page - 1) * this.limit,
      },
    }).then((response) => {
      this.$router.push({ query: Object.assign({ page: this.page }) }); //change param in url

      this.auctionsArray = response.data; 
      this.skip = ( (this.page - 1) * this.limit ) + this.limit; //limit depends if using ?page query or not
      
      this.isLoaded = true; 
  
      // Disable Load More Button if there are no more auctions
      if ( response.data.length < this.limit ) {
        this.areMoreAuctions = false;
      } else {
        this.areMoreAuctions = true;
      }
    });
  }

  created() :void {
    const route = useRoute();
    this.page = route.query.page ? route.query.page : 1;
    this.userInfo = computed(() => this.store.getters.getLogin)

    this.loadAuctions('next');
  }
}
</script>

<style lang="scss">
.auctions__container{
  .auctions__container--loading{
    max-height: 75px;
  }

  .auctions__container--list{
    max-height: 75px;
  }
}
</style>


