<!--
 * @Author: saber
 * @Date: 2022-02-14 10:13:35
 * @LastEditTime: 2022-02-14 11:55:42
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts">
import { EDITORS, useEditorStore } from '@/stores/editor';
import LoadingScreen from '@/components/LoadingScreen.vue';
import type { FileType } from '@/stores/editor';
import { computed, defineAsyncComponent } from 'vue';
import TopBar from './TopBar.vue';

const CodeEditor = defineAsyncComponent({
  loader: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300000));
    return import('@/components/Editors/CodeEditor/index.vue');
  },
  loadingComponent: LoadingScreen,
  delay: 200,
});
const editorState = useEditorStore();

const getEditorModel = computed(() => {
  // todo: 如果只有 secondary 的情况呢？
  if (editorState.openFiles[EDITORS.secondary]?.length > 0) {
    return 'multiple';
  } else {
    return 'single';
  }
});
const activePrimaryFile = editorState.activeFiles[EDITORS.primary] as FileType;
</script>
<template>
  <div :class="['editor-area', getEditorModel]">
    <div id="primary-editor" class="codemirror-instances">
      <TopBar
        :openFiles="editorState.openFiles[EDITORS.primary]"
        :activeFile="activePrimaryFile"
        :isActive="true"
      />
      <div class="scroll-wrapper">
        <!-- <component></component> -->
        <CodeEditor />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.editor-area {
  display: grid;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  &.single {
    grid-template-columns: 1fr;
  }

  &.multiple {
    grid-template-columns: 1fr 1fr;
    column-gap: 3px;
  }

  .scroll-wrapper {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .codemirror-instances {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
}
</style>
