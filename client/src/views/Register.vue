<template lang="pug">
.register__container
    van-address-edit(
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['Choose', 'Choose', 'Choose']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
    )

</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Toast } from "vant";
import { useStore } from 'vuex';
import axios from "axios";
import { ref } from 'vue';

export default class Register extends Vue {
    store = useStore();
    searchResult = [];
    areaList = [];

    onSave = () => Toast('save');
    onDelete = () => Toast('delete');

    onChangeDetail = (val) => {
      if (val) {
        this.searchResult = [
          {
            name: 'Name1',
            address: 'Address',
          },
        ];
      } else {
        this.searchResult = [];
      }
    };

    setup(){
        this.areaList = ['a', 'b', 'c'];
    }


}
</script>

<style lang="scss">
.register__container{
    max-width: 350px;
    margin:0 auto;
}
</style>


