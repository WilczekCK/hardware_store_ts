<template lang="pug">
van-nav-bar(fixed=true id="navbar")
  template(#left)
    router-link(to="/")
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
@import "../scss/main.scss";
#navbar{

    /* Tweak for desktop only */
    @media (min-width: 768px) {
        max-width: 75%;
        margin-left: 12.5%;
    }

    a{
        margin-left: 20px;
        font-weight: 400;
        color: $text_color;

        &:hover{
            color: $hover_color;
        }
    }

    /* Logo */
    &:first-of-type{
        padding-top:10px;
        padding-bottom:10px;
    }
}
</style>


