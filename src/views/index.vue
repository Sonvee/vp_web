<template>
  <div class="index-container">
    <van-swipe class="player-box" vertical :show-indicators="false" :loop="false" @change="changeSwipe"
      @drag-start="dragStart" @drag-end="dragEnd">
      <van-swipe-item v-for="(item, index) in videoList" :key="index">
        <TcPlayer :url="item.playurl"></TcPlayer>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
import { TcPlayer, DateTime } from '@/components'
import { getMiniVideo } from '@/api/open.js'
import { ref } from 'vue';
import { createRandomString } from '@/utils/util.js'

const videoList = ref([])
const page = ref(0)
const id = ref('')

init()
function init() {
  getVideo(page.value)
}

function getVideo(page) {
  getMiniVideo({
    page: page,
    size: 2
  }).then(res => {
    let vlist = res.result?.list || []
    videoList.value?.push(...vlist)
    console.log('视频列表--->', videoList.value);
  })
}

function changeSwipe(e) {
  console.log(e);
}

function dragStart(e) {
  console.log('开始滑动', e);
}

function dragEnd(e) {
  console.log('结束滑动', e);
  if (e.index >= videoList.value.length - 1) {
    getVideo(++page.value)
  }
}
</script>

<style lang="less" scoped>
.index-container {
  width: 100%;
  height: 100%;

  .player-box {
    width: 100%;
    height: 100%;
  }
}
</style>