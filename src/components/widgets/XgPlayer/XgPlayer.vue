<template>
  <div :id="`player-${playerId}`" class="player-component"></div>
</template>

<script setup>
import { onMounted, onDeactivated, onActivated, ref, watch, nextTick } from 'vue'
import { createRandomString } from '@/utils/util.js'
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import { Events } from 'xgplayer'

const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  // 激活的视频索引，用于只播放激活的视频，暂停未激活的视频
  active: {
    type: Boolean,
    default: false
  },
  controlsBottom: {
    type: String,
    default: '0'
  }
})

const emits = defineEmits(['ready', 'play'])

const player = ref()
const playerId = ref(createRandomString())

function init() {
  const { url, active } = props

  player.value = new Player({
    id: `player-${playerId.value}`,
    url: url,
    autoplay: false,
    loop: true,
    height: '100%',
    width: '100%',
  })

  emits('ready', player.value)

  if (active) {
    // 自动播放已激活的视频
    setTimeout(() => {
      startPlay()
    }, 500)
  }

  // 监听播放
  player.value?.on(Events.PLAY, () => {
    emits('play')
  })
}

function startPlay() {
  if (player.value) {
    console.log('视频播放');
    player.value?.play()
  }
}

function pausePlay() {
  if (player.value) {
    console.log('视频暂停');
    player.value?.pause()
  }
}

function destroyPlay() {
  if (player.value) {
    console.log('视频销毁');
    player.value?.destroy()
    player.value = null
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
  pausePlay,
  destroyPlay
})
</script>

<style lang="scss" scoped>
$controls-bottom: v-bind('controlsBottom');

.player-component {
  :deep(.xgplayer-controls) {
    bottom: $controls-bottom;
  }
}
</style>