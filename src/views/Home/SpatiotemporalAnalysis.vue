<template>
    <div>
        <MainTopBar>
            <div class="top-box-title">时空分析</div>
        </MainTopBar>
        <div class="figure-box">
            <SpatiotemporalChart :bv="data.bv"></SpatiotemporalChart>
        </div>
    </div>
</template>

<script setup lang="ts" >
import SpatiotemporalChart from "@/components/charts/SpatiotemporalChart.vue";
import MainTopBar from "@/components/components/MainTopBar.vue";
import { useBiliStore } from "@/stores/bili";
import { onMounted, reactive, watch } from "vue";

const useBili = useBiliStore()

const data = reactive({
    bv: ''
})

onMounted(async () => {
    await useBili.getBv()
    data.bv = useBili.getBv()
})

watch(
    () => useBili.getBv(),
    (newVal, oldVal) => {
        console.log(newVal, oldVal, "newVal, oldVal");
        data.bv = newVal
    }
)




</script>

<style scoped lang="sass">

.figure-box
    margin: 0 44px
    margin-bottom: 32px
    background-color: #fff
    border-radius: 4px
    box-shadow: 0px 1px 4px rgba(21, 34, 50, 0.08)
    padding: 24px
    height: 80vh

</style>