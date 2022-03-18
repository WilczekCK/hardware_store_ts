<template lang="pug">
NavBar
router-view( v-slot="{ Component }" )
  transition( name="fade" mode="out-in" )
    Component( :is="Component" )
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useCookies } from "vue3-cookies";
import { VueCookies } from "vue3-cookies/dist/interfaces";
import { useStore } from 'vuex';
import axios from 'axios';
import NavBar from "./components/NavBar.vue"; // @ is an alias to /src

@Options({
  components: {
    NavBar
  }
})
export default class App extends Vue{
  store = useStore();

  async created() {
    this.store.dispatch('getSession');
  }
}
</script>

<style lang="scss">
@import "./scss/main.scss";
</style>