<template>
    <div>
        <el-form class="from-box">
            <el-input class="input-box" placeholder="请输入要增加的UP主的UID" v-model="data.uid"></el-input>
            <el-button class="btn-box" color="#5A607FFF" type="primary" @click="addUps">提交</el-button>
        </el-form>
        <UpsListVue :vData="data.name"></UpsListVue>
    </div>
</template>

<script setup lang="ts" >

import { onMounted, reactive, watch } from 'vue';
import { getUpsVideo } from '@/api/dm';
import { useBiliStore } from "@/stores/bili";
import UpsListVue from "./function/UpsList.vue";
import { useMultUpStore } from "@/stores/multUp";
const emit = defineEmits(['BvClick'])

const bili = useBiliStore()
const multUpStore = useMultUpStore()

onMounted(async () => {
    data.data = multUpStore.getData()
    await getNameByUids()
    console.log(data.name, "data.name");
})

const data = reactive({
    data: Array<string>(),
    name: Array<any>(),
    uid: '',
})

const addUps = () => {
    multUpStore.addData(data.uid)
    data.uid = ''
    console.log(multUpStore.getData(), "multUpStore.getData()");
}

// 当数据发生变化时，重新获取数据
watch(
    () => multUpStore.getData().length,
    (newVal, oldVal) => {
        data.data = multUpStore.getData()
        getNameByUids()
        console.log(data.data, "data.data");
    },
    {
        deep: true
    }
)
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

async function getNameByUids() {
    data.name = []
    console.log(data.data, "data.data");
    data.data.forEach(
        async (item) => {
            console.log(item);

            let res = await pureGetData(item)
            console.log(res);
            if (res.data[0].author)
                data.name.push({
                    name: res.data[0].author,
                    uid: item
                })
            else
                multUpStore.decreaseData()
        }
    )
}

function changeBv(bv: string) {
    bili.setBv(bv)
}


//19804019

</script>

<style scoped lang="sass">

.from-box
    margin-top: 20px
    margin-left: 13px
    margin-right: 13px

.input-box
    background-color: #fff
    box-shadow: 0px 1px 4px rgba(21, 34, 50, 0.08)
    border: none


.btn-box
    margin-top: 5px
    width: 100%


</style>