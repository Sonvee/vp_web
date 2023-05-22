<template>
  <div class="header-bar-component v-center">
    <div class="icon vh-center" @click="onIcon">
      <slot name="icon-slot">
        <van-icon name="arrow-left" @click="onBack" />
      </slot>
    </div>
    <div class="title vh-center">{{ title }}</div>
    <div class="date vh-center">
      <slot name="extra-slot">
        <DateTime format="HH:mm"></DateTime>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { DateTime } from '@/components'
import { useRouter } from 'vue-router';

const props = defineProps({
  title: String,
  default: '标题'
})

const emits = defineEmits(['onIcon'])

const router = useRouter()

function onIcon() {
  emits('onIcon')
}
function onBack() {
  router.back()
}

</script>

<style lang="scss" scoped>
.header-bar-component {
  width: 100%;
  height: 100%;
  position: relative;

  .icon {
    height: 100%;
    position: absolute;
    left: 0.75rem;
    z-index: 9;
  }

  .title {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .date {
    height: 100%;
    position: absolute;
    right: 0.75rem;
    z-index: 9;
  }
}
</style>