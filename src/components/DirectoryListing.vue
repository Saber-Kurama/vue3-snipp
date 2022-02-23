<!--
 * @Author: saber
 * @Date: 2022-02-15 10:18:58
 * @LastEditTime: 2022-02-23 19:14:06
 * @LastEditors: saber
 * @Description: 
-->
<script lang="ts" setup>
// todo: 解决 ts 提示问题
// @ts-ignore
import { FadeTransition } from '@dangojs/vue3-transitions';
import '@dangojs/vue3-transitions/es/style/style.css';
import FileItem from './FileItem.vue';
import DirectoryItem from './DirectoryItem.vue';
import { fileTypes } from '@/models/vFile.model';
import { ref, watch } from 'vue';

const searchInput = ref('');
const filesdata = ref<any[]>([]);
// setTimeout(() => {
//   searchInput.value = '';
//   filesdata.value.push(...props.files);
// }, 0);
const props = defineProps({
  files: {
    type: Array as () => Array<any>,
    default: () => [],
  },
});

watch(
  () => props.files,
  () => {
    filesdata.value = props.files;
  }
);
const components = {
  [fileTypes.FILE]: FileItem,
  [fileTypes.DIRECTORY]: DirectoryItem,
};
</script>
<template>
  <div class="directory-listing">
    <FadeTransition
      tag="div"
      group
      :duration="1000"
      :delay="1000"
      v-if="searchInput == ''"
    >
      <component
        v-for="file in filesdata"
        :key="file.id"
        :is="components[file.type]"
        :file="file"
      ></component>
    </FadeTransition>
  </div>
</template>
<style lang="scss" scoped></style>
