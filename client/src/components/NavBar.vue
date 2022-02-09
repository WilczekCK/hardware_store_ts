<template lang="pug">
van-nav-bar(fixed=true id="navbar")
  template(#left)
    ="Hardware Store"
  template(#right)
    router-link(to="/")
      ="Home"
    router-link(to="/about")
      ="About"
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class NavBar extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#navbar{

    /* Tweak for desktop only */
    @media (min-width: 768px) {
        max-width: 75%;
        margin-left: 12.5%;
    }

    a{
        margin-left: 20px;
    }
}
</style>


