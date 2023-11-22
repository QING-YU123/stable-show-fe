import { defineStore } from "pinia";
import { reactive } from "vue";

export const useUserStore = defineStore('user', () => {
    const user = reactive({
        username: '夢逝影',
        userUid: '19804019',
        password: ''
    })
    function setUserName(username: string) {
        user.username = username
    }
    function setPassword(password: string) {
        user.password = password
    }
    function setUserUid(userUid: string) {
        user.userUid = userUid
    }

    function getUserName() {
        return user.username
    }
    function getPassword() {
        return user.password
    }
    function getUserUid() {
        return user.userUid
    }


    return { user, setUserName, setPassword, getUserName, getPassword, setUserUid, getUserUid }
})

