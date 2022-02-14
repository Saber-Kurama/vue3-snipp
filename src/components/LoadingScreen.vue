<!--
 * @Author: saber
 * @Date: 2022-02-14 11:39:22
 * @LastEditTime: 2022-02-14 13:56:18
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts">
import LogoSkeleton from '@/components/shared/LogoSkeleton.vue';
import ProgressView from './shared/ProgressView.vue';
</script>
<template>
  <div class="loading-screen">
    <div class="content-wrapper">
      <LogoSkeleton size="150" class="logo" />
      <p>Loading Editor...</p>
    </div>
    <ProgressView />
  </div>
</template>
<style lang="scss" scoped>
.loading-screen {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .logo {
      opacity: 0.7;
    }

    p {
      margin: 20px 0 0 0;
      font-size: 1.2rem;
      opacity: 0.7;
    }
  }
}
</style>
