<template>
  <div>
    <el-menu active-text-color="#ffffff" background-color="#F5F7FA" class="vr-menu" default-active="dashboard" router
      text-color="#5A607FFF" @select="handleSelect">
      <el-menu-item class="vr-menu__item" index="dashboard">
        <div class="vr-menu__item--svg">
          <svg fill="none" height="17.989990234375" viewBox="0 0 16 17.989990234375" width="16"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path id="color"
              d="M15.49,7.42c0.33,0.37 0.51,0.84 0.51,1.33v7.24c0,1.1 -0.9,2 -2,2h-12c-1.1,0 -2,-0.9 -2,-2v-7.24c0,-0.49 0.18,-0.96 0.51,-1.33l6,-6.75c0.73,-0.82 1.99,-0.9 2.82,-0.16c0.06,0.05 0.11,0.1 0.16,0.16zM2,15.99h3v-5.0003c0,-0.55 0.45,-1 1,-1h4c0.55,0 1,0.45 1,1v5.0003h3v-7.24l-6,-6.75l-6,6.75zM9,15.9897v-4h-2v4z"
              fill-rule="evenodd" opacity="1" style="fill:#7E84A3"></path>
          </svg>
        </div>
        <span>仪表盘</span>
      </el-menu-item>
      <el-menu-item-group class="vr-menu__group-one" title="弹幕分析">
        <el-menu-item class="vr-menu__item" index="userlist">
          <div class="vr-menu__item--svg">
            <svg fill="none" height="16" viewBox="0 0 20.00018310546875 16" width="20.00018310546875"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <path id="color"
                d="M6,8c-2.21,0 -4,-1.79 -4,-4c0,-2.21 1.79,-4 4,-4c2.21,0 4,1.79 4,4c0,2.21 -1.79,4 -4,4zM15,6c-1.66,0 -3,-1.34 -3,-3c0,-1.66 1.34,-3 3,-3c1.66,0 3,1.34 3,3c0,1.66 -1.34,3 -3,3zM8,4c0,-1.1 -0.9,-2 -2,-2c-1.1,0 -2,0.9 -2,2c0,1.1 0.9,2 2,2c1.1,0 2,-0.9 2,-2zM14,2v2h2v-2zM12.02,16h-12.02v-1c0,-3.31 2.69,-6 6,-6c1.38,0 2.65,0.47 3.67,1.25c0.99,-1.93 3.01,-3.25 5.33,-3.25c2.09,0 3.93,1.07 5,2.68v3.32h-8v1.95zM11.6652,10.8l-0.13,0.2h6.93l-0.09,-0.15c-0.68,-1.06 -1.84,-1.78 -3.17,-1.84l-0.2,-0.01c-1.4,0 -2.63,0.71 -3.34,1.8zM2.236,13.66l-0.07,0.18l-0.04,0.16h7.75l-0.04,-0.14c-0.45,-1.53 -1.8,-2.68 -3.43,-2.84l-0.21,-0.02h-0.2c-1.73,0 -3.21,1.11 -3.76,2.66z"
                fill-rule="evenodd" opacity="1" style="fill:#7E84A3"></path>
            </svg>
          </div>
          <span>多up分析</span>
        </el-menu-item>
        <el-menu-item class="vr-menu__item" index="dash">
          <div class="vr-menu__item--svg">
            <svg fill="none" height="19.00048828125" viewBox="0 0 19.000457763671875 19.00048828125"
              width="19.000457763671875" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <path id="color"
                d="M6.7,18.4305l-6.13,-6.13c-0.76,-0.76 -0.76,-1.99 0,-2.75001l8.98,-8.98c0.41,-0.42 1,-0.62 1.59,-0.56l7.86,-0.01l-0.01,7.86c0.06,0.59 -0.14,1.18 -0.56,1.59l-8.98,8.98001c-0.76,0.76 -1.99,0.76 -2.75,0zM1.9473,10.9205l6.13,6.13l8.92,-9.05001v-6h-6zM12,9.00049l-2,-2l2,-2l2,2z"
                fill-rule="evenodd" opacity="1" style="fill:#7E84A3"></path>
            </svg>
          </div>
          <span>情感分析</span>
        </el-menu-item>
        <el-menu-item class="vr-menu__item" index="highEnergyTime">
          <div class="vr-menu__item--svg">
            <svg fill="none" height="19" viewBox="0 0 18 19" width="18" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink">
              <path id="color"
                d="M0,2c0,-1.11 0.89,-2 2,-2h14c1.11,0 2,0.89 2,2v12c0,1.11 -0.89,2 -2,2h-10l-6,3zM5.45,14h10.55v-12h-14v13.47zM14,5v2h-10v-2zM8,9v2h-4v-2z"
                fill-rule="evenodd" opacity="1" style="fill:#7E84A3"></path>
            </svg>
          </div>
          <span>高能时间</span>
        </el-menu-item>
        <el-menu-item class="vr-menu__item" index="dash">
          <div class="vr-menu__item--svg">
            <svg fill="none" height="18" viewBox="0 0 17 18" width="17" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink">
              <path id="color"
                d="M17,14h-17v-4c0,-1.1 0.9,-2 2,-2h3v-2c0,-1.1 0.9,-2 2,-2h3v-2c0,-1.1 0.9,-2 2,-2h3c1.1,0 2,0.9 2,2zM15,12v-10h-3v10zM10,12v-6h-3v6zM5,12v-2h-3v2zM0,17c0,-0.55 0.54,-1 1.21,-1h14.58c0.67,0 1.21,0.45 1.21,1c0,0.55 -0.54,1 -1.21,1h-14.58c-0.67,0 -1.21,-0.45 -1.21,-1z"
                fill-rule="evenodd" opacity="1" style="fill:#7E84A3"></path>
            </svg>
          </div>
          <span>词云分析</span>
        </el-menu-item>
        <el-menu-item class="vr-menu__item" index="spatiotemporalAnalysis">
          <div class="vr-menu__item--svg">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24"
              viewBox="0 0 24 24" fill="none">
              <g opacity="1" transform="translate(0 0)  rotate(0)">
                <path id="color" fill-rule="evenodd" style="fill:#7E84A3" opacity="1"
                  d="M12,2c5.52,0 10,4.48 10,10c0,5.52 -4.48,10 -10,10c-5.52,0 -10,-4.48 -10,-10c0,-5.52 4.48,-10 10,-10zM4,12c0,4.42 3.58,8 8,8c4.42,0 8,-3.58 8,-8c0,-4.42 -3.58,-8 -8,-8c-4.42,0 -8,3.58 -8,8zM15.71,14.29c0.36,0.36 0.39,0.93 0.08,1.32l-0.08,0.1c-0.36,0.36 -0.93,0.39 -1.32,0.08l-0.1,-0.08l-3,-3c-0.15,-0.16 -0.25,-0.36 -0.28,-0.58l-0.01,-0.13v-5c0,-0.55 0.45,-1 1,-1c0.51,0 0.94,0.39 0.99,0.88l0.01,0.12v4.59z">
                </path>
              </g>
            </svg>
          </div>
          <span>时空分析</span>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group class="vr-menu__group-one" title="视频分析">
      </el-menu-item-group>
      <el-menu-item-group class="vr-menu__group-one" title="账户管理">
        <el-menu-item class="vr-menu__item" index="dash">
          <div class="vr-menu__item--svg">
            <svg fill="none" height="18" viewBox="0 0 16 18" width="16" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink">
              <path id="color"
                d="M8,0c2.21,0 4,1.79 4,4c0,2.21 -1.79,4 -4,4c-2.21,0 -4,-1.79 -4,-4c0,-2.21 1.79,-4 4,-4zM6,4c0,1.1 0.9,2 2,2c1.1,0 2,-0.9 2,-2c0,-1.1 -0.9,-2 -2,-2c-1.1,0 -2,0.9 -2,2zM8,9c4.33,0 7.86,3.45 8,7.75v1.25h-16v-1c0,-4.42 3.58,-8 8,-8zM2.084,16h11.83l-0.02,-0.1c-0.48,-2.64 -2.7,-4.67 -5.42,-4.88l-0.25,-0.02h-0.22c-2.86,0 -5.25,2 -5.85,4.67l-0.05,0.23z"
                fill-rule="evenodd" opacity="1" style="fill:#7E84A3"></path>
            </svg>
          </div>
          <span>个人账户</span>
        </el-menu-item>
        <el-menu-item class="vr-menu__item" index="dash">
          <div class="vr-menu__item--svg">
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink">
              <path id="color"
                d="M18,3.5l2,3l-2,3.5l2,3.5l-2,3l-4,0.5l-2.5,3h-3l-2.5,-3l-4,-0.5l-2,-3l2,-3.5l-2,-3.5l2,-3l4,-0.5l2.5,-3h3l2.5,3zM17.6496,13.419l-1.95,-3.42l1.95,-3.42l-0.81,-1.21l-3.87,-0.48l-2.41,-2.89h-1.12l-2.41,2.89l-3.87,0.48l-0.81,1.21l1.95,3.42l-1.95,3.42l0.81,1.21l3.87,0.48l2.41,2.89h1.12l2.41,-2.89l3.87,-0.48zM10,6c2.21,0 4,1.79 4,4c0,2.21 -1.79,4 -4,4c-2.21,0 -4,-1.79 -4,-4c0,-2.21 1.79,-4 4,-4zM8,10c0,1.1 0.9,2 2,2c1.1,0 2,-0.9 2,-2c0,-1.1 -0.9,-2 -2,-2c-1.1,0 -2,0.9 -2,2z"
                fill-rule="evenodd" opacity="1" style="fill:#7E84A3"></path>
            </svg>
          </div>
          <span>用户管理</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>

function handleSelect(index: string) {
  console.log(index)
}

</script>

<style lang="sass" scoped>
:deep(.is-active)
  background-color: #5A607FFF !important


:deep(.el-menu-item)
  height: 44px !important
  border-radius: 4px !important

.vr-menu
  padding-top: 30px
  padding-left: 16px
  padding-right: 16px

  &--bg-color
    background-color: #F5F7FA

.vr-menu__item--svg
  width: 16px
  height: 20px
  margin-right: 24px
  margin-left: 2px
</style>