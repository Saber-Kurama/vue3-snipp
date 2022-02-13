<!--
 * @Author: saber
 * @Date: 2022-02-11 18:54:51
 * @LastEditTime: 2022-02-11 18:58:11
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts">
import { useUiStore } from '@/stores/ui';
import Logo from '@/components/shared/Logo.vue';

// <file-editing theme="outline" size="24" fill="#333"/>
import {
  Search,
  FileEditing,
  Command,
  Setting,
  Github,
} from '@icon-park/vue-next';
const uiState = useUiStore();
const panels = uiState.getPanels;
const bottomMenu = [
  {
    id: 'commandCenter',
    icon: 'Command',
    name: 'Commands/Shortcuts [Alt+K]',
    // click: this.toggleCommandCenter,
  },
  {
    id: 'settings',
    icon: 'Setting',
    name: 'Settings',
    click: () => {
      // this.$router.push('/settings');
    },
  },
  {
    id: 'github',
    icon: 'Github',
    name: 'GitHub',
    link: 'https://github.com/Saber-Kurama/vue3-snipp',
  },
];
const icons: {
  [key: string]: typeof Search;
} = {
  FileEditing,
  Search,
  Command,
  Setting,
  Github,
};
</script>
<template>
  <div class="side-navigation-bar">
    <div class="branding">
      <Logo size="25" />
    </div>
    <div class="menu expand">
      <div
        v-for="menuItem in panels"
        :class="[
          'menu-icon',
          { active: uiState.activePanelId === menuItem.id },
        ]"
        :key="menuItem.id"
        @click="
          uiState.activePanelId === menuItem.id
            ? null
            : uiState.setActivePanelId(menuItem)
        "
      >
        <component :is="icons[menuItem.icon]" size="20px"></component>
        <span class="menu-tooltip">{{ menuItem.name }}</span>
      </div>
    </div>
    <div class="menu">
      <!-- `noopener`, `noreferrer` 及 `nofollow` 的用法 https://wayou.github.io/2020/12/25/_noopener____noreferrer__%E5%8F%8A__nofollow__%E7%9A%84%E7%94%A8%E6%B3%95/ -->
      <a
        v-for="menuItem in bottomMenu"
        :key="menuItem.id"
        class="menu-icon"
        :href="menuItem.link"
        rel="noreferrer noopener"
        target="_blank"
        @click="menuItem.click ? menuItem.click() : null"
        ><component :is="icons[menuItem.icon]" size="20px"></component>
        <span class="menu-tooltip">{{ menuItem.name }}</span></a
      >
    </div>
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

      .menu-tooltip {
        position: absolute;
        left: 50px;
        top: 0;
        z-index: 99;
        white-space: nowrap;
        background: var(--color-secondary);
        padding: 10px 15px;
        border-radius: 5px;
        opacity: 0;
        transform: translateX(-30px);
        transition: 0.3s all ease-in-out;
        pointer-events: none;
      }

      &:hover {
        background: var(--color-secondary-light);
        opacity: 1;
        cursor: pointer;
        border-radius: 5px;
        .menu-tooltip {
          display: flex;
          transform: translateX(0px);
          opacity: 1;
        }
      }

      &.active {
        background: var(--color-secondary-light);
        color: var(--color-primary);
        opacity: 1;
        border-radius: 5px;
        .i-icon {
          color: var(--color-primary);
        }

        // .menu-tooltip {
        //   display: none;
        // }
      }
    }
  }
}
</style>
