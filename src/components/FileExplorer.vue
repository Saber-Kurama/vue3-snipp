<!--
 * @Author: saber
 * @Date: 2022-02-15 09:56:34
 * @LastEditTime: 2022-02-23 19:15:56
 * @LastEditors: saber
 * @Description: 
-->
<script lang="ts" setup>
import { SimpleBar } from 'simplebar-vue3';
import { FileAddition, FolderPlus } from '@icon-park/vue-next';
import DirectoryListing from './DirectoryListing.vue';
import { useEditorStore } from '@/stores/editor';
import { useUiStore } from '@/stores/ui';
import { useFilesStore } from '@/stores/files';
import { computed } from 'vue';
// todo 怎么解决这个错误呢
const SimpleBar1: any = SimpleBar;
const editorState = useEditorStore();
const uiState = useUiStore();
const filesState = useFilesStore();
// 关于返回函数的问题
const children = computed(() => editorState.getChildren());
const setShowCreateFileModal = (obj: { flag: boolean }) => {
  uiState.setShowCreateFileModal(obj);
};
const createNewFolder = () => {
  filesState.createDirectory({ editable: true });
};
</script>
<template>
  <div class="file-explorer">
    <header>
      <h4>File Explorer</h4>
      <div class="menu">
        <div v-tooltip="'Create new file (Alt+N)'" class="icon-wrapper">
          <FileAddition
            size="18"
            class="icon"
            @click="setShowCreateFileModal({ flag: true })"
          />
        </div>
        <div v-tooltip="'Create new folder (Ctrl+Alt+N)'" class="icon-wrapper">
          <FolderPlus
            size="18"
            class="icon"
            @click="createNewFolder"
          />
        </div>
      </div>
    </header>
    <SimpleBar1 class="content-area">
      {{children.length}}
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

    .menu {
      display: flex;
    }

    .icon-wrapper {
      position: relative;
    }

    .icon {
      padding: 7px;
      border-radius: 3px;
      transition: 0.3s all ease-in-out;

      &:hover {
        cursor: pointer;
        background: var(--color-secondary);
        color: var(--color-primary);
      }

      &:active {
        opacity: 0.7;
        transform: scale(0.98);
      }
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
