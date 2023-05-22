<template>
  <div class="header-bar">
    <HeaderBar :title="route.name">
    </HeaderBar>
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

<style lang="scss" scoped>
$header-bar-height: 40px;
$nav-bar-height: 50px;

.header-bar {
  width: 100vw;
  height: $header-bar-height;
}

.main {
  width: 100vw;
  height: calc(100vh - $header-bar-height - $nav-bar-height);
}

.nav-bar {
  width: 100vw;
  height: $nav-bar-height;
}
</style>
