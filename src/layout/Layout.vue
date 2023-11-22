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
          <FunctionMenuVue></FunctionMenuVue>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>

import FunctionMenuVue from "./components/FunctionMenu.vue";
import Menu from "./components/Menu.vue";
import TopBar from "./components/TopBar.vue";
import VideoList from "./components/function/VideoList.vue";

</script>

<style lang="sass" scoped>
.vr-header
  box-shadow: 0px 1px 4px rgba(21, 34, 50, 0.08)

.vr-aside
  background-color: #F5F7FA

  &::-webkit-scrollbar
    width: 8px
    height: 8px
    background-color: #F5F7FA

.vr-main
  margin: 0
  padding: 0

  &::-webkit-scrollbar
    width: 8px
    height: 8px
    background-color: #F5F7FA

</style>