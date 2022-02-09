<template lang="pug">
van-nav-bar( fixed="true" )
  template(#left)
    ="Hardware Store"
  template(#right)
    router-link(to="/")
      ="Home"
    router-link(to="/about")
      ="About"
router-view
</template>

<style lang="scss">
@import "./scss/main.scss";
</style>