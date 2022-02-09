<template lang="pug">
NavBar
router-view
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import NavBar from "./components/NavBar.vue"; // @ is an alias to /src

@Options({
  components: {
    NavBar
  }
})
export default class App extends Vue{}
</script>

<style lang="scss">
@import "./scss/main.scss";
</style>