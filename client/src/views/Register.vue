<template lang="pug">
.register__container
    van-address-edit(
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['Choose']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        value="0")
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Toast } from "vant";
import { useStore } from 'vuex';
import axios from "axios";

export default class Register extends Vue {
    searchResult = [];
    areaList = {
        province_list: {
            0: 'Świętokrzyskie',
            1: 'Mazowieckie',
            2: 'Małopolskie'
        },
    };

    onSave = () => Toast('save');
    onDelete = () => Toast('delete');
    onChangeDetail = (val) => {

        this.searchResult = [
          {
            name: 'Name1',
            address: 'Address',
          },
        ];

    };

}
</script>

<style lang="scss">
.register__container{
    max-width: 350px;
    margin:0 auto;
}

.van-picker-column:nth-child(2){display:none}
.van-picker-column:nth-child(3){display:none}
</style>


