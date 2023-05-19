<template>
  <video :id="'player-' + id" style="width: 400px;height: 300px;" preload="auto" playsinline webkit-playsinline>
  </video>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import TCPlayer from 'tcplayer.js';
import 'tcplayer.js/dist/tcplayer.min.css';

const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  url: {
    type: String,
    default: ''
  }
})

const player = ref()

function init() {
  const { id, url } = props
  /**
   * 参数: 播放器id, TCPlayer options详见下方链接文档
   * @see https://cloud.tencent.com/document/product/881/30820
   */
  player.value = TCPlayer(`player-${id}`, {
    autoplay: true
  })
  player.value?.src(url)
}

function startPlay(url) {
  if (player.value) {
    console.log('视频资源地址--->', url);
    player.value.play()
  }
}

function pausePlay() {
  if (player.value) {
    player.value.pause()
  }
}

watch(() => props.url, (newVal) => {
  startPlay(newVal)
})

onMounted(() => {
  init()
})

defineExpose({
  startPlay,
  pausePlay
})
</script>

<style lang="less" scoped></style>