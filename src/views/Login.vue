<template>
  <div class="main-box">
    <div class="main-box__login-box">
      <p class="login-box--text">
        Bilibili站UP主个人弹幕分析
      </p>
      <el-form class="login-box__form" label-position="top" size="large">
        <el-form-item label="UP账号">
          <el-input placeholder="请输入UP账号" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="UP密码">
          <el-input placeholder="请输入UP密码" type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-button class="w-[100%]" type="primary" @click="login">登 录</el-button>
      </el-form>
      <p class="mt-[50px]">
        <span>忘记密码？</span>
        <span>联系管理员</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { reactive } from "vue";
import { useUserStore } from "@/stores/user";
const router = useRouter()
import { getUpsVideo } from "@/api/dm";
import { message } from "@/components/message/message";
import { useBiliStore } from '@/stores/bili';

const user = reactive({
  username: '',
  password: ''
})

const userStore = useUserStore()
const useBili = useBiliStore()

async function login() {
  try {
    let res = await getUpsVideo({
      "mid": user.username
    })
    if (res.data[0].author) {
      userStore.setUserUid(user.username)
      userStore.setUserName(res.data[0].author)
      useBili.setBv(res.data[0].bvid)
      message('success', '登录成功！')
      router.push('/dashboard')
    }
    else {
      message('error', '登录失败！')
    }
  }
  catch (err) {
    message('error', '登录失败！')
  }
}

</script>

<style lang="sass" scoped>

.main-box
  background-color: #F5F6FAFF
  width: 100vw
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column

  &__login-box
    display: flex
    flex-direction: column
    position: relative
    justify-content: center
    align-items: center
    background-color: #ffffff
    width: 540px
    height: 619px
    border-radius: 29px
    box-shadow: 0 1px 4px #15223214

.login-box--text
  position: absolute
  top: 50px
  font-size: 30px
  font-weight: 600
  color: #152232FF

.login-box__form
  width: 70%


</style>