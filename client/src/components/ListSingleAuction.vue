<template lang="pug">
p {{auction.brand}}
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
    props: {
        auction: Object
    }
})
export default class ListSingleAuction extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../scss/main.scss";
</style>


