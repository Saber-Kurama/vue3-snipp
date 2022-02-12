<!--
 * @Author: saber
 * @Date: 2022-02-11 18:54:51
 * @LastEditTime: 2022-02-11 18:58:11
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts">

import {
  FileTextIcon,
  SearchIcon,
  TrashIcon,
  SettingsIcon,
  GithubIcon,
  CommandIcon,
  // @ts-ignore
} from 'vue-feather-icons';
</script>
<template>
  <div class="side-navigation-bar">
    <FileTextIcon size="10px"/>
  </div>
</template>
<style lang="scss" scoped>
.side-navigation-bar {
  background: var(--color-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid var(--border-color);
}
</style>
