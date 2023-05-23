<template>
  <div class="index-container" v-scroll="onScroll">
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div class="list" :key="listKey" ref="listRef">
        <div class="list-item" v-for="(item, index) in videoList" :key="index" @click="onVideo(index)">
          <div class="item-title">{{ item.title }}</div>
          <div class="item-video">
            <XgPlayer :url="item.playUrl" :active="currentVideo == index ? true : false" @play="onVideo(index)">
            </XgPlayer>
          </div>
          <div class="item-info">
            <van-image round width="1.25rem" height="1.25rem" :src="item.userPic" />
            <div class="user-name">{{ item.userName }}</div>
            <div class="duration">时长：{{ item.duration }}</div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <van-back-top />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { XgPlayer } from '@/components'
import { getHaoKanVideo } from '@/api/open.js'
import { vScroll } from '@vueuse/components'
import { useElementBounding } from '@vueuse/core'

const isLoading = ref(false);
const videoList = ref([])
const currentVideo = ref(0)
const listKey = ref(0)
const listRef = ref()

init()
function init() {
  getVideo()
}

function getVideo() {
  getHaoKanVideo({
    size: 12
  }).then(res => {
    let vlist = res.result?.list || []
    videoList.value?.push(...vlist)
    console.log('视频列表--->', videoList.value);
  })
}

function onVideo(e) {
  currentVideo.value = e
  console.log('点击', e);
}

function onRefresh() {
  isLoading.value = true;
  getHaoKanVideo({
    size: 12
  }).then(res => {
    let vlist = res.result?.list || []
    videoList.value = vlist
    console.log('视频列表--->', videoList.value);
    isLoading.value = false
    // 刷新列表key
    listKey.value++
  })
}

function onScroll(e) {
  const { height } = useElementBounding(listRef)
  let listHeight = height.value - 860
  console.log(listHeight, e.y.value) // {x, y, isScrolling, arrivedState, directions}
}
</script>

<style lang="scss" scoped>
.index-container {
  width: 100%;
  height: 100%;
  overflow: auto;

  .list {
    padding: 0 0.75rem;

    .list-item {
      padding: 0.75rem 0;
      border-bottom: 1px #eee solid;

      .item-title {
        font-size: 0.875rem;
        font-weight: 700;
      }

      .item-video {
        width: 100%;
        background-color: #66ccff;
        margin-top: 0.75rem;
        // 锁定宽高比
        aspect-ratio: 16/9;
      }

      .item-info {
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 0.375rem;

        .user-name {
          margin-left: 0.375rem;
          font-size: 0.75rem;
          flex: 1;
        }

        .duration {
          font-size: 0.75rem;
        }
      }
    }
  }

}
</style>