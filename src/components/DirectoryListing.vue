<!--
 * @Author: saber
 * @Date: 2022-02-15 10:18:58
 * @LastEditTime: 2022-02-24 17:35:37
 * @LastEditors: saber
 * @Description: 
-->
<script lang="ts" setup>
// todo: 解决 ts 提示问题
// @ts-ignore
import { FadeTransition } from '@dangojs/vue3-transitions';
import '@dangojs/vue3-transitions/es/style/style.css';
import { useEditorStore } from '@/stores/editor';
import FileItem from './FileItem.vue';
import DirectoryItem from './DirectoryItem.vue';
import { fileTypes } from '@/models/vFile.model';
import { ref, watch } from 'vue';

// setTimeout(() => {
//   searchInput.value = '';
//   filesdata.value.push(...props.files);
// }, 0);
const editorState = useEditorStore();
const props = defineProps({
  files: {
    type: Array as () => Array<any>,
    default: () => [],
  },
});
const searchInput = ref('');
const filesdata = ref<any[]>(props.files || []);
watch(
  () => props.files,
  () => {
    console.log('>>>???');
    console.log('filesdata', filesdata.value);
    filesdata.value = props.files;
  }
);
// v-if="searchInput == ''"
const components = {
  [fileTypes.FILE]: FileItem,
  [fileTypes.DIRECTORY]: DirectoryItem,
};
</script>
<template>
  <div class="directory-listing">
    <FadeTransition tag="div" group>
      <component
        v-for="file in filesdata"
        :key="file.id"
        :is="components[file.type]"
        :file="file"
        :isActive="!!editorState.getActiveFileList[file.id]"
      ></component>
    </FadeTransition>
  </div>
</template>
<style lang="scss" scoped></style>
