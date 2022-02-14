<template lang="pug">
van-form(@submit="onSubmit")
  van-cell-group(inset)
    van-field(
      v-model="username"
      name="Username"
      label="Username"
      placeholder="Username"
      :rules="[{ required: true, message: 'Username is required' }]")
    van-field(
      v-model="password"
      type="password"
      name="Password"
      label="Password"
      placeholder="Password"
      :rules="[{ required: true, message: 'Password is required' }]")
  div(style="margin: 16px;")
    van-button(round block type="primary" native-type="submit")=Submit
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class LoginContainer extends Vue {

  onSubmit() {
    return;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../scss/main.scss";
</style>


