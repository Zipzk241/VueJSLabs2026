import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'catalog', component: () => import('@/pages/Catalog.vue') },
    { path: '/cart', name: 'cart', component: () => import('@/pages/Cart.vue') },
    { path: '/profile', name: 'profile', component: () => import('@/pages/Profile.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/pages/NotFound.vue') },
  ],
})

export default router
