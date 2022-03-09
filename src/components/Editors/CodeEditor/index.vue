<!--
 * @Author: saber
 * @Date: 2022-02-14 11:36:35
 * @LastEditTime: 2022-03-09 22:11:32
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts">
// import * as monaco from "monaco-editor";
// @ts-ignore
import MonacoEditor from '@dangojs/vue3-monaco';
// import 'monaco-graphql/src/monaco.contribution.ts';
import { computed, ref, watch } from 'vue';
// console.log('monaco', monaco);
const props = defineProps<{
  file: any;
}>();
console.log('props.file?', props.file);
const code = ref(props.file?.contents || '');
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
    graphql: 'graphql'
  };
  if (props.file?.name) {
    const nameParts = props.file.name.split('.');
    const ext = nameParts[nameParts.length - 1];
    return languageExts[ext] || 'markdown'; // fallback to default syntax highlightning to be markdown
  } else {
    return 'markdown';
  }
});
watch(
  () => props.file,
  (newVal) => {
    console.log(props.file, newVal);
    code.value = newVal?.contents || '';
    console.log('code', code.value)
  }
);
</script>
<template>
  <MonacoEditor v-model="code" theme="vs-dark" :language="getLanguage" />
</template>
<style lang="scss" scoped></style>
