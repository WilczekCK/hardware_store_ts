<template lang="pug">
NavBar
router-view( v-slot="{ Component }" )
  transition( name="fade" mode="out-in" )
    Component( :is="Component" )
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from 'vuex';
import NavBar from "./components/NavBar.vue"; // @ is an alias to /src

@Options({
  components: {
    NavBar
  }
})
export default class App extends Vue{
  store = useStore();

  async created() {
    await this.store.dispatch('getSession');
  }
}
</script>

<style lang="scss">
@import "./scss/main.scss";
</style>