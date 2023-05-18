import { createRouter, createWebHashHistory } from 'vue-router'
 
// 路由懒加载
const Index = () => import('../views/index.vue')
 
// 路由规则
const routes = [
  {
    // 路由重定向
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  }
]
 
// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
 
export default router