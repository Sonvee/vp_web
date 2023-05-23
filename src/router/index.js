import { createRouter, createWebHashHistory } from 'vue-router'

// 路由规则
const routes = [
  {
    // 路由重定向
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: '首页',
    component: () => import('../views/index.vue'), // 路由懒加载
  },
  {
    path: '/recommend',
    name: '推荐',
    component: () => import('../views/recommend.vue'), // 路由懒加载
  },
  {
    path: '/mine',
    name: '我的',
    component: () => import('../views/mine.vue'), // 路由懒加载
  },
]

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router