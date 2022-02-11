<!--
 * @Author: saber
 * @Date: 2022-02-10 15:41:57
 * @LastEditTime: 2022-02-11 17:11:23
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
const getActiveTheme = 'saber';
</script>

<template>
  <div :class="['root', getActiveTheme]"></div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100wh;
  overflow: hidden;
</style>
