import { defineStore } from "pinia";
import { reactive } from "vue";

export const useBiliStore = defineStore('bili', () => {
    const bili = reactive({
        bv: '',
    })

    function setBv(bv:string) {
        bili.bv = bv
    }

    function getBv() {
        return bili.bv
    }


    return { bili, setBv, getBv }
})

