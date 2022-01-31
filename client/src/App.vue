<template lang="pug">
#nav
  router-link(to="/")
    ="Home"
  router-link(to="/about")
    ="About"
router-view
</template>

<style lang="scss">
@import "./scss/main.scss";
</style>