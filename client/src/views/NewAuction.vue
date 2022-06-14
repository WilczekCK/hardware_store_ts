<template lang="pug">
.auction__create__container
    van-uploader(:after-read="afterRead")
    h3( class="register__container__error" v-if="errors" v-for="error in errors") {{ error }}
    van-form()
        van-cell-group(inset)
            van-divider="Product informations"
            van-field(
                v-model="productName"
                name="productName"
                label="Name of the product"
                :rules="[{ required: true }]"
            )
        div(style="margin: 16px;")
        van-button(block type="success" native-type="submit")="Create auction!"
        small="The auction will be added immidiately!"
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios from "axios";

export default class NewAuction extends Vue {
    productName = '';

}
</script>

<style lang="scss">
</style>


