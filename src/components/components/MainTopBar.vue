<template>
    <div>
        <div class="top-box">
            <slot></slot>
        </div>
        <div class="placeholder"></div>
    </div>
</template>
  
<script lang="ts" setup>

console.log()

const goBack = () => {
    console.log('go back')
}
</script>
  
<style lang="sass" scoped>
  
  .top-box
    @apply rounded-md m-0
    font-size: 24px
    height: auto
    font-weight: 700
    padding-left: 44px
    padding-top: 32px
    padding-bottom: 32px
  
  
  </style>