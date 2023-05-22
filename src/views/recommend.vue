<template>
  <div class="index-container">
    <van-swipe class="player-box" vertical :show-indicators="false" :loop="false" @change="changeSwipe"
      @drag-start="dragStart" @drag-end="dragEnd">
      <van-swipe-item v-for="(item, index) in videoList" :key="index">
        <TcPlayer :url="item.playurl" :active="currentVideo == index ? true : false"></TcPlayer>
        <div class="info">
          <div class="info-title">{{ item.title }}</div>
          <div class="info-user">
            <div class="user-avatar">
              <img :src="item.picuser" alt="">
            </div>
            <div class="user-name">
              {{ item.alias }}
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
import { TcPlayer } from '@/components'
import { getHaoKanVideo, getMiniVideo, getShortVideo } from '@/api/open.js'
import { ref } from 'vue';

const videoList = ref([])
const currentVideo = ref(0)

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
      }

      .info-user {
        display: flex;
        align-items: center;

        .user-avatar {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 1.25rem;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .user-name {
          margin-left: 0.75rem;
        }
      }
    }
  }
}
</style>