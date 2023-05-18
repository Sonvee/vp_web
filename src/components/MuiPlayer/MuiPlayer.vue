<template>
  <div id="mui-player"></div>
</template>

<script setup>
// 播放器相关
import 'mui-player/dist/mui-player.min.css'
import MuiPlayer from 'mui-player'

const props = defineProps({
  url: {
    type: String,
    default: ''
  }
})

// 初始化 MuiPlayer 插件，MuiPlayer 方法传递一个对象，该对象包括所有插件的配置
const player = new MuiPlayer({
  container: '#mui-player',
  title: '标题',
  src: props.url,
  autoplay: true,
  width: '400px',
  height: '300px',
})

</script>

<style lang="less" scoped></style>