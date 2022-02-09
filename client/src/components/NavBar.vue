<template lang="pug">
van-nav-bar( fixed="true" )
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>


