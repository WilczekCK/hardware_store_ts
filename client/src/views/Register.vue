<template lang="pug">
.register__container
    = "This is register page"
</template>

<script lang="ts">
import { Vue, } from "vue-class-component";
import { useStore } from 'vuex';
import axios from "axios";

export default class Register extends Vue {
  store = useStore();
}
</script>

<style lang="scss">
.register__container{
}
</style>


