<template lang="pug">
van-loading(type="spinner" v-if="!isLoaded")
.single__auction(v-else)
  h1="This is an single auction page"
  p {{auction.brand}} {{auction.series}} for {{auction.price}} PLN
  p Added at {{auction.createdAt}}
  p By: {{auction.user.firstName}}
  p Mail: {{auction.user.email}}
  p {{auction.description}}
  van-button(:type="'success'" @click="$router.options.history.state.back ? $router.go(-1) : $router.push('/auctions')")
    = "Back to auctions"
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
    this.id =+ route.params.id;

    axios.get(`/auctions/${this.id}`).then(response => {
      this.auction = response.data[0];
      this.isLoaded = true;
    });
  }
}
</script>

<style lang="scss">
</style>


