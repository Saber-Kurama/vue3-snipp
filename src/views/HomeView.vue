<!--
 * @Author: saber
 * @Date: 2022-02-11 17:10:32
 * @LastEditTime: 2022-02-22 13:51:09
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts">
import SideNavigationBar from '@/components/SideNavigationBar.vue';
import Editor from '@/components/Editor.vue';
import FileExplorer from '@/components/FileExplorer.vue';
</script>

<template>
  <main>
    <div id="main-layout">
      <SideNavigationBar />
      <div class="explorer-panel">
        <FileExplorer />
      </div>
      <Editor />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
#main-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 50px auto 1fr;
  position: relative;
  background-color: var(--color-secondary-light);
  position: relative;

  .explorer-panel {
    width: 270px;
    height: 100%;
    overflow: hidden;
  }
}
</style>
