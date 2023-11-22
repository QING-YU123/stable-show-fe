<template>
  <div>
    {{ data.bvid }}
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { onMounted, reactive, watch } from "vue";
import { loading } from "@/components/Loading/loading";
import { useBiliStore } from "@/stores/bili";


const userStore = useUserStore()
const biliStore = useBiliStore()

const data = reactive({
  bvid: '',
})

onMounted(() => {
  console.log(userStore.getUserName(), "username")
})

watch(() => biliStore.getBv(), (newVal, oldVal) => {
  console.log(newVal, oldVal)
  data.bvid = newVal
})

</script>

<style scoped lang="sass">

</style>