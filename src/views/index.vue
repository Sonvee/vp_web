<template>
  <div v-for="(item, index) in videoList" :key="index">
    <TcPlayer :url="item.playurl" :id="index"></TcPlayer>
  </div>
</template>

<script setup>
import { TcPlayer } from '../components'
import { getMiniVideo } from '@/api/open.js'
import { ref } from 'vue';

const videoList = ref([])

initVideo()
function initVideo() {
  getMiniVideo().then(res => {
    videoList.value = res.result?.list
    console.log('视频列表--->', videoList.value);
  })
}
</script>

<style lang="less" scoped></style>