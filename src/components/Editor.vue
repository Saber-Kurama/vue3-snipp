<!--
 * @Author: saber
 * @Date: 2022-02-14 10:13:35
 * @LastEditTime: 2022-03-09 18:43:19
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
// const activePrimaryFile = editorState.getActiveFiles[
//   EDITORS.primary
// ] as FileType;
</script>
<template>
  <div :class="['editor-area', getEditorModel]">
    <div
      id="primary-editor"
      class="codemirror-instances"
      v-if="editorState.getOpenFiles[EDITORS.primary].length > 0"
    >
      <TopBar
        :openFiles="editorState.getOpenFiles[EDITORS.primary]"
        :activeFile="editorState.getActiveFiles[EDITORS.primary]"
        :isActive="true"
      />
      <div class="scroll-wrapper">
        <!-- <component></component> -->
        <CodeEditor :file="editorState.getActiveFiles[EDITORS.primary]" />
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
