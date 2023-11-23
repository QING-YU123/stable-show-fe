<template>
  <div>
    <el-container class="h-[100vh]">
      <el-header class="vr-header" height="68px">
        <TopBar></TopBar>
      </el-header>
      <el-container>
        <el-aside class="vr-aside" width="255px">
          <Menu>
          </Menu>
        </el-aside>
        <el-main class="vr-main">
          <router-view />
        </el-main>
        <el-aside class="vr-aside" width="255px">
          <FunctionMenuVue v-show="!data.state"></FunctionMenuVue>
          <UpsMenu v-show="data.state"></UpsMenu>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>

import { reactive, watch } from "vue";
import FunctionMenuVue from "./components/FunctionMenu.vue";
import Menu from "./components/Menu.vue";
import TopBar from "./components/TopBar.vue";
import VideoList from "./components/function/VideoList.vue";
import { useMultUpStore } from "@/stores/multUp";
import UpsMenu from "./components/UpsMenu.vue";

const data = reactive({
  state: false
})

const multUpStore = useMultUpStore()

watch(() => multUpStore.getState(), (newVal, oldVal) => {
  console.log(newVal, oldVal)
  data.state = newVal
})


</script>

<style lang="sass" scoped>
.vr-header
  box-shadow: 0px 1px 4px rgba(21, 34, 50, 0.08)

.vr-aside
  background-color: #F5F7FA
  overflow: scroll

  &::-webkit-scrollbar
    width: 8px
    height: 8px
    background-color: #F5F7FA

.vr-main
  margin: 0
  padding: 0
  overflow: scroll

  &::-webkit-scrollbar
    width: 8px
    height: 8px
    background-color: #F5F7FA

</style>