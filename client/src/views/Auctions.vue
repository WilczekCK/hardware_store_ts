<template lang="pug">
.about
  h1="This is an auctions page"
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios from "axios";

export default class Auctions extends Vue {
  auctionsArray = [];

  fetchAuctions() : void {
    axios.get("/auctions").then(response => {
      console.log(response);
      this.auctionsArray = response.data;
    });
  };

  mounted(){
    this.fetchAuctions();
  }
}
</script>

<style lang="scss">
</style>


