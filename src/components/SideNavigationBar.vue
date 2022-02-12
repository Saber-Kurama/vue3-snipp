<!--
 * @Author: saber
 * @Date: 2022-02-11 18:54:51
 * @LastEditTime: 2022-02-11 18:58:11
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts">
// import {
//   FileTextIcon,
//   SearchIcon,
//   TrashIcon,
//   SettingsIcon,
//   GithubIcon,
//   CommandIcon,
//   // @ts-ignore
// } from 'vue-feather-icons';
import Logo from '@/components/shared/Logo.vue';

import { Home } from '@icon-park/vue-next';
</script>
<template>
  <div class="side-navigation-bar">
    <div class="branding">
      <Logo size="25" />
    </div>
    <div class="menu">
      <div :class="['menu-icon']">
        <Home size="20" />
      </div>
    </div>
    <div class="menu"></div>
  </div>
</template>
<style lang="scss" scoped>
.side-navigation-bar {
  background: var(--color-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid var(--border-color);

  .branding {
    padding: 10px;
    border-bottom: 1px solid var(--border-color);
  }
  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    &.expand {
      flex: 1;
    }

    .menu-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      opacity: 0.5;
      margin-bottom: 5px;
      position: relative;
      transition: 0.3s all ease-in-out;
      color: var(--font-color);
    }
  }
}
</style>
