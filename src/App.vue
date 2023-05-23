<template>
  <div class="header-bar">
    <HeaderBar :title="route.name"></HeaderBar>
  </div>
  <div class="main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
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
$header-bar-height: 2.5rem;
$nav-bar-height: 3.125rem;

.header-bar {
  width: 100%;
  height: $header-bar-height;
}

.main {
  width: 100%;
  height: calc(100% - $header-bar-height - $nav-bar-height);
}

.nav-bar {
  width: 100%;
  height: $nav-bar-height;
}
</style>
