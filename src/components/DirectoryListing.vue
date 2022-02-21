<!--
 * @Author: saber
 * @Date: 2022-02-15 10:18:58
 * @LastEditTime: 2022-02-21 21:15:15
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
import { ref } from 'vue';

const searchInput = ref('123');
setTimeout(() => {
  searchInput.value = '';
}, 3000);
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
    <FadeTransition
      tag="div"
      :duration="10000"
      :delay="10000"
      v-if="searchInput == ''"
    >
      <component
        v-for="file in props.files"
        :key="file.id"
        :is="components[file.type]"
        :file="file"
      ></component>
    </FadeTransition>
  </div>
</template>
<style lang="scss" scoped></style>
