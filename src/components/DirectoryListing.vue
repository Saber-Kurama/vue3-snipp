<!--
 * @Author: saber
 * @Date: 2022-02-15 10:18:58
 * @LastEditTime: 2022-02-15 14:52:00
 * @LastEditors: saber
 * @Description: 
-->
<script lang="ts" setup>
import FileItem from './FileItem.vue';
import DirectoryItem from './DirectoryItem.vue';
import { fileTypes } from '@/models/vFile.model';

const props = defineProps({
  files: {
    type: Array as () => Array<any>,
    default: () => [],
  },
});

const components = {
  [fileTypes.FILE]: FileItem,
  [fileTypes.DIRECTORY]: DirectoryItem,
};
</script>
<template>
  <div class="directory-listing">
    <component
      v-for="file in props.files"
      :key="file.id"
      :is="components[file.type]"
    ></component>
  </div>
</template>
<style lang="scss" scoped></style>
