<template>
    <div>
        <!-- <MainTopBar>
            <div class="top-box">
                <div class="top-box-title">视频列表</div>
            </div>
        </MainTopBar> -->
        <VideoList :vData="data.data" @BvClick="changeBv"></VideoList>
    </div>
</template>

<script setup lang="ts" >
import VideoList from "./function/VideoList.vue";
import MainTopBar from "@/components/components/MainTopBar.vue";
import { onMounted, reactive } from 'vue';
import { getUpsVideo } from '@/api/dm';
import { useUserStore } from "@/stores/user";
import { useBiliStore } from "@/stores/bili";
const emit = defineEmits(['BvClick'])


const userUid = useUserStore()
const bili = useBiliStore()

onMounted(async () => {
    await getUid()
    await getDate()
})

const data = reactive({
    data: {},
    uid: ''
})

async function getDate() {
    data.data = await getUpsVideo({
        "mid": data.uid
    });
}

function changeBv(bv: string) {
    bili.setBv(bv)
}

//19804019

async function getUid() {
    data.uid = userUid.getUserUid()
    console.log(data.uid);
}



</script>

<style scoped lang="sass">

</style>