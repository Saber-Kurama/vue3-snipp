<!--
 * @Author: saber
 * @Date: 2022-02-14 13:32:14
 * @LastEditTime: 2022-02-14 13:41:32
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts">
const props = defineProps({
  top: Number,
});
</script>
<template>
  <div
    class="progress-view glow-shadow"
    :style="{ top: props.top ? `${props.top}` : 0 }"
  ></div>
</template>
<style lang="scss" scoped>
.progress-view {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  min-height: 2px;
  max-height: 2px;
  background: repeating-linear-gradient(
    to right,
    var(--color-secondary) 0%,
    var(--color-accent) 50%,
    var(--color-primary) 100%
  );
  background-size: 200% auto;
  background-position: 0 100%;
  animation: gradient 1.5s infinite;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}

@keyframes gradient {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
