<template>
    <div v-if="isShow" class="list-box-item">
        <div v-for="item in props.vData.data" class="list">
            <div class="list-item" @click="$emit('BvClick', item.bvid)" @mouseenter="getMessageBox($event, item)"
                @mouseleave="deleteMessageBox">
                <p class="overflow-clip">
                    {{ item.title }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['vData'])

const isShow = ref(false)
let messageBox = null;

function getMessageBox(event, item) {
    console.log(item)
    console.log(event)
    messageBox = document.createElement("div");
    messageBox.style.position = "absolute";
    // 在该盒子的左上角显示
    messageBox.style.right = 0 + "px";
    messageBox.style.bottom = 0 + "px";
    messageBox.style.width = "255px";
    messageBox.style.height = "auto";
    messageBox.style.backgroundColor = "white";
    messageBox.style.padding = "10px";
    messageBox.style.zIndex = "100";
    messageBox.innerHTML =
        '<p>作者：' + item.author + '</p>' +
        '<p>BV：' + item.bvid + '</p>' +
        '<p>标题：' + item.title + '</p>' +
        '<p>播放量：' + item.play + '</p>' +
        '<p>弹幕数：' + item.video_review + '</p>' +
        '<p>硬币数：' + item.coins + '</p>' +
        '<p>投稿时间：' + item.created + '</p>' +
        '<p>视频长度：' + item.length + '</p>'
    document.body.appendChild(messageBox);
}

function deleteMessageBox() {
    document.body.removeChild(messageBox);
}

watch(() => props.vData, () => {
    isShow.value = true
    console.log("change");
    console.log(props.vData);
})


</script>
  
<style lang="sass" scoped>
  
  .list-box-item
    @apply overflow-scroll h-[80vh]
    &::-webkit-scrollbar
      @apply w-[5px]
  
  .list-item
    @apply flex flex-col justify-center items-center m-[13px] p-2 rounded-md h-[5.5rem] overflow-ellipsis
    background-color: #F5F6FAFF
    color: #5A607FFF
    
    &:hover
      background-color: #7E84A3
      color: #ffffff
  
  </style>