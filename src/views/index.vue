<template>
  <div>
    <MuiPlayer :url="video.playUrl"></MuiPlayer>
  </div>
</template>

<script setup>
import { MuiPlayer } from '@/components'
import { getSentences, getVideo } from '@/api/open.js'
import { ref } from 'vue';

const video = ref('')
initVideo()
function initVideo() {
  getVideo().then(res => {
    video.value = res.result?.list[0]
    console.log('视频列表--->', video.value);
  })
}
</script>

<style lang="less" scoped></style>