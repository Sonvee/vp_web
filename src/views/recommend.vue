<template>
  <div class="index-container">
    <van-pull-refresh style="height: 100%;" v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <van-swipe class="player-box" vertical :show-indicators="false" :loop="false" @change="changeSwipe"
        @drag-start="dragStart" @drag-end="dragEnd" :key="swipeKey">
        <van-swipe-item v-for="(item, index) in videoList" :key="index">
          <XgPlayer :url="item.playurl" :active="currentVideo == index ? true : false" controlsBottom="5.125rem">
          </XgPlayer>
          <div class="info">
            <div class="info-title">{{ item.title }}</div>
            <div class="info-user">
              <van-image round width="2.5rem" height="2.5rem" :src="item.picuser" />
              <div class="user-name">
                {{ item.alias }}
              </div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { XgPlayer } from '@/components'
import { getMiniVideo } from '@/api/open.js'
import { ref } from 'vue';

const isLoading = ref(false);
const videoList = ref([])
const currentVideo = ref(0)
const swipeKey = ref(0)

init()
function init() {
  getVideo()
}

function getVideo() {
  getMiniVideo({
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
    getVideo()
  }
  currentVideo.value = e.index
}

function onRefresh() {
  isLoading.value = true;
  getMiniVideo({
    size: 2
  }).then(res => {
    let vlist = res.result?.list || []
    videoList.value = vlist
    console.log('视频列表--->', videoList.value);
    isLoading.value = false
    // 刷新
    swipeKey.value++
  })
}


</script>

<style lang="scss" scoped>
.index-container {
  width: 100%;
  height: 100%;

  .player-box {
    width: 100%;
    height: 100%;

    .info {
      position: absolute;
      color: #fff;
      z-index: 9;
      left: 0;
      bottom: 0;
      padding: 0.75rem;

      .info-title {
        margin-bottom: 0.75rem;
        font-weight: 700;
      }

      .info-user {
        display: flex;
        align-items: center;

        .user-name {
          margin-left: 0.75rem;
          font-size: 0.875rem;
        }
      }
    }
  }
}
</style>