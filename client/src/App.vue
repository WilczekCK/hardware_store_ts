<template lang="pug">
van-row(id="nav" tag="nav" align="center")
  van-col(span="4")
    van-button(plain type="primary")="Logo"
  van-col(span="20")
    van-row(justify="end")
      van-col(span="4")
        router-link(to="/")
          ="Home"
      van-col(span="4")
        router-link(to="/about")
          ="About"
router-view
</template>

<style lang="scss">
@import "./scss/main.scss";
</style>