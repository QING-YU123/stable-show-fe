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
import { onMounted, reactive } from 'vue';
import { getUpsVideo } from '@/api/dm';
import { useUserStore } from "@/stores/user";
import { useBiliStore } from "@/stores/bili";
const emit = defineEmits(['BvClick'])


const userUid = useUserStore()
const bili = useBiliStore()

onMounted(async () => {
    data.data = await pureGetData(userUid.getUserUid())
})

const data = reactive({
    data: {},
    uid: '',
})

/**
 * 获取数据
 * @param {string} uid - 用户ID
 * @returns {Promise<any>} - 包含视频信息的Promise对象
 */
async function pureGetData(uid: string): Promise<any> {
    return await getUpsVideo({
        "mid": uid
    });
}

function changeBv(bv: string) {
    bili.setBv(bv)
} 


//19804019

</script>

<style scoped lang="sass">

</style>