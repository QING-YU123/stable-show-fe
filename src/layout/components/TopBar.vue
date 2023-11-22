<template>
  <div class="top-box">
    <div class="top-box__logo">
      <img alt="Bilibili站UP主个人弹幕分析系统" class="inline-block" src="@/icons/svgs/symbol.svg" />
      <span class="pl-4  font-bold ">Bilibili站UP主个人弹幕分析</span>
    </div>
    <el-badge :value="4" class="top-box--icon-clock" type="primary">
      <img alt="" src="@/icons/svgs/clock.svg">
    </el-badge>
    <el-badge class="top-box--icon-chat" type="primary">
      <img alt="" src="@/icons/svgs/chat.svg">
    </el-badge>
    <div class="top-box__admin">
      <div class="box--flex-row">
        <div class="admin__name">
          欢迎你！ {{ userStore.getUserName() }}
        </div>
      </div>
      <img alt="" src="@/icons/svgs/arrow.svg">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore()

</script>

<style lang="sass" scoped>

.top-box
  width: 100%
  height: 100%
  position: relative
  font-family: Inter, sans-serif

  &__logo
    height: 36px
    width: 260px
    position: absolute
    left: 10px
    top: 16px
    display: flex
    align-items: center
    justify-content: left

  &--icon-clock
    position: absolute
    right: 258px
    top: 25px
    width: 14px
    height: 18px

  &--icon-chat
    position: absolute
    right: 297px
    top: 23px
    width: 24px
    height: 24px

  &__admin
    width: 185px
    height: 36px
    position: absolute
    top: 16px
    right: 28px
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between

</style>