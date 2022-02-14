<script lang="ts" setup>
import { SimpleBar } from 'simplebar-vue3';
import { ref } from 'vue';
import type { FileType } from '@/stores/editor';
import { Close } from '@icon-park/vue-next';

// todo 怎么解决这个错误呢
const SimpleBar1: any = SimpleBar;
const props = defineProps({
  openFiles: {
    type: Array as () => FileType[],
    default: () => [],
    // required: true
  },
});
</script>
<template>
  <div>
    <SimpleBar1 class="topbar">
      <ul class="file-tabs">
        <li v-for="file in props.openFiles" :key="file.id">
          <span>{{ file.name }}</span>
          <Close size="14px" class="icon"></Close>
        </li>
      </ul>
    </SimpleBar1>
  </div>
</template>
<style lang="scss" scoped>
.topbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: auto;

  .file-tabs {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    li {
      padding: 7px 5px 7px 15px;
      opacity: 0.7;
      background: var(--color-secondary);
      margin-top: 2px;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-radius: 5px 5px 0 0;
      border-bottom: 2px solid var(--color-secondary);
      margin-right: 1px;
      max-width: 150px;
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        pointer-events: none;
        /* &:hover {
          background-color: red;
        } */
      }

      &:last-child {
        margin-right: 0;
      }

      .icon {
        margin-left: 5px;
        padding: 5px;
        border-radius: 3px;
        pointer-events: auto;
        &:hover {
          cursor: pointer;
          background: var(--color-secondary-light);
        }
      }

      &:hover {
        opacity: 1;
        cursor: pointer;
      }

    }
  }
}
</style>
