<template>
  <div class="nav-bar-component">
    <van-tabbar v-model="active" @change="changeNav">
      <van-tabbar-item name="index" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item name="recommend" icon="fire-o">推荐</van-tabbar-item>
      <van-tabbar-item name="mine" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const active = ref('index')

function changeNav(e) {
  router.push(`/${e}`)
  console.log('当前页面--->', route.name, route.path);
}
</script>

<style lang="scss" scoped>
.nav-bar-component {
  width: 100%;
  height: 100%;
}
</style>