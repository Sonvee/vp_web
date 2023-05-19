<template>
  <video :id="'player-' + playerId" class="player-component" preload="auto" playsinline webkit-playsinline>
  </video>
</template>

<script setup>
import { onMounted, onDeactivated, onActivated, ref, watch } from 'vue';
import TCPlayer from 'tcplayer.js';
import 'tcplayer.js/dist/tcplayer.min.css';
import { createRandomString } from '@/utils/util.js'

const props = defineProps({
  url: {
    type: String,
    default: ''
  }
})

const player = ref()
const playerId = ref(createRandomString())

function init() {
  /**
   * 参数: 播放器id, TCPlayer options详见下方链接文档
   * @see https://cloud.tencent.com/document/product/881/30820
   */
  player.value = TCPlayer(`player-${playerId.value}`, {
    autoplay: true
  })
}

function startPlay(url) {
  if (player.value) {
    player.value?.src(url)
    player.value.play()
    console.log('视频play');
  }
}

function pausePlay() {
  if (player.value) {
    player.value.pause()
    console.log('视频pause');
  }
}

watch(() => props.url, (newVal) => {
  startPlay(newVal)
})

onMounted(() => {
  init()
})

onActivated(() => {
  console.log('视频激活', playerId.value);
  init()
})

onDeactivated(() => {
  console.log('视频失活', playerId.value);
  pausePlay()
})

defineExpose({
  startPlay,
  pausePlay
})
</script>

<style lang="less" scoped>
.player-component {
  width: 100%;
  height: 100%;
}
</style>