<template>
    <div class="mid-bar">
        <div class="mid-bar__left-box">
            <BigFigure :bv="props.bv"></BigFigure>
        </div>
        <div class="mid-bar__right-box">
            <AsideFigure :bv="props.bv"></AsideFigure>
        </div>
    </div>
</template>
  
<script lang="ts" setup>

import BigFigure from "./BigFigure.vue";
import AsideFigure from "./AsideFigure.vue";
import { reactive } from "vue";


const props = defineProps({
    bv: {
        type: String,
        default: ''
    }
})

</script>


<style lang="sass" scoped>
.mid-bar
    height: 418px
    display: flex
    justify-content: space-between
    align-items: center

    &__left-box
        flex:3
        height: 100%
        display: flex
        justify-content: center
        align-items: center

    &__right-box
        flex: 2     
        height: 100%
        display: flex
        justify-content: center
        align-items: center
        padding-left: 31px
</style>