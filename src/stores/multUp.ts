import { defineStore } from "pinia";
import { reactive } from "vue";

export const useMultUpStore = defineStore('MultUp', () => {
    const MultUp = reactive({
        state: false,
        data: ['19804019']
    })

    function setState(state: boolean) {
        MultUp.state = state
    }
    function addData(data: string) {
        MultUp.data.push(data)
    }
    function clearData() {
        MultUp.data = []
    }
    function decreaseData() {
        MultUp.data.pop()
    }
    function delData(data: string) {
        const index = MultUp.data.indexOf(data)
        MultUp.data.splice(index, 1)
    }

    function getState() {
        return MultUp.state
    }
    function getData() {
        return MultUp.data
    }


    return {
        MultUp,
        setState,
        addData,
        getState,
        getData,
        clearData,
        decreaseData,
        delData
    }
})

