<template>
    <div>
        <MainTopBar>
            <div class="top-box-title">高能时间</div>
        </MainTopBar>
        <div class="figure-box">
            <HighEnergyTime :bv="data.bv"></HighEnergyTime>
        </div>
    </div>
</template>



<script setup lang="ts" >
import HighEnergyTime from "@/components/charts/HighEnergyTimeChart.vue";
import MainTopBar from "@/components/components/MainTopBar.vue";
import { useBiliStore } from "@/stores/bili";
import { useMultUpStore } from "@/stores/multUp";
import { onMounted, onUnmounted, reactive, watch } from "vue";

const useBili = useBiliStore()
const multUpStore = useMultUpStore()

const data = reactive({
    bv: ''
})
onMounted(async () => {
    multUpStore.setState(true)
    await useBili.getBv()
    data.bv = useBili.getBv()
})

// 切换后页面后将状态修改
onUnmounted(() => {
    multUpStore.setState(false)
    console.log(multUpStore.getState(), "multUpStore.getState()");

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