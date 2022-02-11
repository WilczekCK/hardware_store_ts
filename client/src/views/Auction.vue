<template lang="pug">
van-loading(type="spinner" v-if="!isLoaded")
.single__auction(v-else)
  h1="This is an single auction page"
  p {{auction.brand}} {{auction.series}} for {{auction.price}} PLN
  p Added at {{auction.createdAt}}
  p {{auction.description}}
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { useRoute } from "vue-router";
import axios from "axios";

interface serverResponse {
  [key: string]: number | string | boolean;
}

export default class Auction extends Vue {
  auction: serverResponse = {};
  id = 0;
  isLoaded = false;
  
  created() {
    const route = useRoute();
    this.id = parseInt(route.params.id[0]);

    axios.get(`/auctions/${this.id}`).then(response => {
      this.auction = response.data[0];
      this.isLoaded = true;
    });
  }
}
</script>

<style lang="scss">
</style>


