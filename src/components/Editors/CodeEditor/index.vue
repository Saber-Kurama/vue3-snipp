<!--
 * @Author: saber
 * @Date: 2022-02-14 11:36:35
 * @LastEditTime: 2022-03-11 11:46:10
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts">
import type * as monaco from 'monaco-editor';
// @ts-ignore
import MonacoEditor from '@dangojs/vue3-monaco';
// import 'monaco-graphql/src/monaco.contribution.ts';
import { computed, ref, watch } from 'vue';
// console.log('monaco', monaco);
const props = defineProps<{
  file: any;
}>();
const editorOptions = {
  automaticLayout: true,
  selectOnLineNumbers: true,
  fontSize: 16,
  fontLigatures: true,
  minimap: {
    enabled: false,
  },
};
const code = ref(props.file?.contents || '');
const editRef = ref();
const getLanguage = computed(() => {
  const languageExts: any = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    py: 'python',
    json: 'json',
    html: 'html',
    css: 'css',
    md: 'markdown',
    csv: 'csv',
    sql: 'sql',
    sh: 'shell',
    graphql: 'graphql',
  };
  if (props.file?.name) {
    const nameParts = props.file.name.split('.');
    const ext = nameParts[nameParts.length - 1];
    return languageExts[ext] || 'markdown'; // fallback to default syntax highlightning to be markdown
  } else {
    return 'markdown';
  }
});
const editorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
  editor.focus();
  editor
};
watch(
  () => props.file,
  (newVal) => {
    console.log(props.file, newVal);
    code.value = newVal?.contents || '';
    console.log('code', code.value);
  }
);
// setTimeout(() => {
//   console.log('editRef', editRef.value.getEditor());
// }, 3000);
</script>
<template>
  <MonacoEditor
    ref="editRef"
    v-model="code"
    theme="Dracula"
    :language="getLanguage"
    :options="editorOptions"
    @editorDidMount="editorDidMount"
    class="monaco-editor"
  />
</template>
<style lang="scss">
.monaco-editor {
  flex: 1;
  width: 100%;
  * {
    font-family: 'Fira Code', monospace;
  }
}
</style>
