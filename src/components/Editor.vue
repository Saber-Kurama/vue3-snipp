<script setup lang="ts">
import { EDITORS, useEditorStore } from '@/stores/editor';
import { computed } from 'vue';
import TopBar from './TopBar.vue';

const editorState = useEditorStore();

const getEditorModel = computed(() => {
  // todo: 如果只有 secondary 的情况呢？
  if (editorState.openFiles[EDITORS.secondary]?.length > 0) {
    return 'multiple';
  } else {
    return 'single';
  }
});
</script>
<template>
  <div :class="['editor-area', getEditorModel]">
    <div id="primary-editor" class="codemirror-instances">
        <TopBar :openFiles="editorState.openFiles[EDITORS.primary]"/>
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

  .codemirror-instances {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
}
</style>
