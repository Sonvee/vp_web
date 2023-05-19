<template>
  <div class="header-bar">
    <HeaderBar></HeaderBar>
  </div>
  <div class="main">
    <router-view v-slot="{ Component }">
      <transition :name="route.meta.transition || 'fade'">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
  <div class="nav-bar">
    <NavBar></NavBar>
  </div>
</template>

<script setup>
import { HeaderBar, NavBar } from './components'
import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<style lang="less" scoped>
.header-bar {
  width: 100vw;
  height: 50px;
}

.main {
  width: 100vw;
  height: calc(100vh - 50px - 50px);
}

.nav-bar {
  width: 100vw;
  height: 50px;
}
</style>
