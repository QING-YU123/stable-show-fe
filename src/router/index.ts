import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('../layout/Layout.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/Home/Dashboard.vue')
        },
        {
          path: '/spatiotemporalAnalysis',
          name: 'spatiotemporalAnalysis',
          component: () => import('../views/Home/SpatiotemporalAnalysis.vue')

        },
        {
          path: '/highEnergyTime',
          name: 'highEnergyTime',
          component: () => import('../views/Home/HighEnergyTime.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    }
  ]
})

export default router
