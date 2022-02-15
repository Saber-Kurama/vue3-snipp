<!--
 * @Author: saber
 * @Date: 2022-02-15 09:56:34
 * @LastEditTime: 2022-02-15 14:35:30
 * @LastEditors: saber
 * @Description: 
-->
<script lang="ts" setup>
import { SimpleBar } from 'simplebar-vue3';
import DirectoryListing from './DirectoryListing.vue';
import { EDITORS, useEditorStore } from '@/stores/editor';
// todo 怎么解决这个错误呢
const SimpleBar1: any = SimpleBar;
const editorState = useEditorStore();
const children = editorState.getChildren;
</script>
<template>
  <div class="file-explorer">
    <header> <h4>File Explorer</h4></header>
    <SimpleBar1 class="content-area">
      <DirectoryListing
        v-if="children && children.length > 0"
        :files="children"
      ></DirectoryListing>
      <div v-else class="help-text">
        <p>
          No Snippets found, click on the create icons to start creating
          snippets
        </p>
      </div>
    </SimpleBar1>
  </div>
</template>
<style lang="scss" scoped>
.file-explorer {
  background: var(--color-secondary-light);
  z-index: 9;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  min-width: 0;
  min-height: 0;
  border-right: 1px solid var(--border-color);

  header {
    display: flex;
    flex-direction: row;
    padding: 5px 10px 5px 10px;
    z-index: 99;
    h4 {
      font-weight: bold;
      flex: 1;
    }
  }
  .content-area {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;

    .help-text {
      display: flex;
      padding: 10px;
      opacity: 0.7;
      text-align: center;
    }
  }
}
</style>
