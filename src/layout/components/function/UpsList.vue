<template>
    <div class="list-box-item">
        <div v-for="item in props.vData" class="list">
            <div class="list-item">
                <p class="overflow-clip">
                    UP:{{ item.name }}
                </p>
                <el-button class="btn" type="error" @click="delUps(item.uid)">删除</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useMultUpStore } from '@/stores/multUp';

const props = defineProps(['vData'])
const useMultUp = useMultUpStore()


onMounted(() => {
    console.log(props.vData, "hello")
})

watch(() => props.vData, () => {
    console.log("change");
    console.log(props.vData);
})

function delUps(uid: string) {
    useMultUp.delData(uid)
    console.log(useMultUp.getData(), "useMultUp.getData()");
}


</script>
<style lang="sass" scoped>

.list-box-item
    @apply overflow-scroll h-[80vh]
    &::-webkit-scrollbar
        @apply w-[5px]

.list-item
    @apply flex flex justify-center items-center m-[13px] p-2 rounded-md h-[5.5rem] overflow-ellipsis
    background-color: #F5F6FAFF
    color: #5A607FFF
    
    &:hover
        background-color: #7E84A3
        color: #ffffff

.btn
    background-color: transparent !important
    border: none !important
    color: #5A607FFF !important
    font-size: 1rem !important
    padding: 0 !important
    padding-left: 2rem !important
    margin: 0 !important
    line-height: 1.5rem !important
    &:hover
        background-color: transparent !important
        color: #ffffff !important
</style>