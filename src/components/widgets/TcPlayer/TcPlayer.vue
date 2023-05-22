<template>
  <video :id="`player-${playerId}`" class="player-component" preload="auto" playsinline webkit-playsinline>
  </video>
</template>

<script setup>
import { onMounted, onDeactivated, onActivated, ref, watch, nextTick } from 'vue';
import TCPlayer from 'tcplayer.js';
import 'tcplayer.js/dist/tcplayer.min.css';
import { createRandomString } from '@/utils/util.js'

const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  // 激活的视频索引，用于只播放激活的视频，暂停未激活的视频
  active: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['ready'])

const player = ref()
const playerId = ref(createRandomString())

function init() {
  const { url, active } = props
  /**
   * 参数: 播放器id, TCPlayer options详见下方链接文档
   * @see https://cloud.tencent.com/document/product/881/30820
   */
  player.value = TCPlayer(`player-${playerId.value}`, {
    autoplay: false,
    loop: true, // 循环播放
    // muted: true, // 静音播放 注:浏览器不支持在不静音的情况下直接播放视频
    plugins: {
      ContextMenu: {
        // mirror: true, // 是否支持镜像显示
        // statistic: true, // 是否支持显示数据面板
      }
    }

  })
  emits('ready', player.value)
  player.value?.src(url)
  if (active) {
    // 自动播放已激活的视频
    startPlay()
  }
}

function startPlay() {
  if (player.value) {
    console.log('视频play');
    player.value?.play()
  }
}

function pausePlay() {
  if (player.value) {
    console.log('视频pause');
    player.value?.pause()
  }
}

watch(() => props.active, (newVal) => {
  if (newVal) {
    startPlay()
  } else {
    pausePlay()
  }
})

onMounted(() => {
  nextTick(() => {
    init()
  })
})

onActivated(() => {
  if (props.active) {
    startPlay()
  }
})

onDeactivated(() => {
  console.log('视频失活--->', `player-${playerId.value}`);
  pausePlay()
})

defineExpose({
  startPlay,
  pausePlay
})
</script>

<style lang="scss" scoped>
.player-component {
  width: 100%;
  height: 100%;
}
</style>