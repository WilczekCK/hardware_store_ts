<template lang="pug">
.auction__create__container
    van-uploader( v-model="image.fileList" :max-size="500 * 1024" :before-read="image.beforeRead" @oversize="image.onOversize" multiple)
    h3( class="register__container__error" v-if="errors" v-for="error in errors") {{ error }}
    van-form( @submit="onSubmit")
        van-cell-group(inset)
            van-divider="Product information"
            van-field(
                v-model="brand"
                name="brand"
                label="Brand"
                placeholder="AMD, Intel, etc."
                :rules="[{ required: true }]"
            )
            van-field(
                v-model="series"
                name="series"
                label="Series"
                placeholder="RTX, GTX, etc."
                :rules="[{ required: true }]"
            )
            van-field(
                v-model="price"
                type="digit"
                name="price"
                label="Price"
                placeholder="250"
                :rules="[{ required: true }]"
            )
                template(#button)
                    ="PLN"
            van-field(
                v-model="description"
                rows="2"
                autosize
                name="description"
                label="Description"
                type="textarea"
                maxlength="250"
                placeholder="Some information about the product"
                show-word-limit
            )
        div(style="margin: 16px;")
        van-button(block type="success" native-type="submit")="Create auction!"
        small="The auction will be added immidiately!"
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios from "axios";
import { useStore } from 'vuex';
import { Toast } from "vant";

export default class NewAuction extends Vue {
    userId = 0; 
    brand = '';
    series = '';
    description = '';
    price?:number;

    store = useStore();

    async beforeMount(){
        this.userId = await this.store.getters.getUserId;
    }

    async onSubmit(): Promise<void> {
        const { brand, series, description, price, userId } = this;

        const response = await axios.post('/auctions', {
            brand,
            series,
            description,
            price,
            userId,
            isActive: true,
            fileList: this.image.fileList
        });
    }

    image = {
        fileList: [],
        beforeRead: (file:Record<string,null>) => {
            if(file.type !== 'image/jpeg') {
                Toast('The only image format allowed is JPG');
                return false;
            }

            return true;
        },
        onOversize() {
            Toast('File size cannot exceed 500kb');
        }
    }
}
</script>

<style lang="scss">
.auction__create__container{
    max-width: 350px;
    margin: 0 auto;

    small { opacity:0.8; font-size: 11px; padding-top:5px; }
}
</style>


