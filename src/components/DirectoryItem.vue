<!--
 * @Author: saber
 * @Date: 2022-02-15 14:40:54
 * @LastEditTime: 2022-02-21 14:17:42
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts">
import { FolderClose, FolderOpen, MoreOne } from '@icon-park/vue-next';
import { onMounted, ref, type PropType } from 'vue';
import { useEditorStore } from '@/stores/editor';
import FileItem from './FileItem.vue';
// import DirectoryItem from './DirectoryItem.vue';
import { fileTypes } from '@/models/vFile.model';

const components = {
  [fileTypes.FILE]: FileItem,
  [fileTypes.DIRECTORY]: this,
};

const editorState = useEditorStore();
const props = defineProps({
  file: Object as PropType<{ name: string; id: string }>,
});
const filename = ref(props.file?.name || '');
const readonly = ref(true);
const showChildren = ref(false);
const showContextMenu = ref(false);
onMounted(() => {
  filename.value = props.file?.name || '???';
});

const toggleShowChildren = () => {
  showChildren.value = !showChildren.value;
};
</script>
<template>
  <div class="directory-wrapper">
    <div :class="['file-item']">
      <div class="clickable-area" @click="toggleShowChildren">
        <FolderOpen v-if="showChildren" class="icon" size="20px"></FolderOpen>
        <FolderClose v-else class="icon" size="20px"></FolderClose>
        <form>
          <input type="text" v-model="filename" :readonly="readonly" size="2" />
        </form>
      </div>
      <div class="context-menu">
        <MoreOne
          class="trigger-icon no-margin"
          :style="showContextMenu ? 'visibility: visible' : null"
          size="18px"
        />
      </div>
    </div>
    <div v-if="showChildren" class="files">
      <component
        v-for="child in editorState.getChildren(file?.id)"
        :key="child.id"
        :is="components[child.type]"
        :file="child"
        :isActive="!!editorState.getActiveFileList[child.id]"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.directory-wrapper {
  display: flex;
  flex-direction: column;
  .files {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
  }
}
.file-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 5px 2px 0;
  margin: 0px 5px 1px 5px;
  border-radius: 5px;

  .clickable-area {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 3px 10px;
  }

  .icon {
    margin-right: 5px;
    width: 20px;
  }

  form {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  input {
    border: 0;
    padding: 6px 8px;
    border-radius: 2px;
    color: var(--font-color);
    border: 2px solid transparent;
    outline: none;
    transition: 0.2s all ease-in-out;
    background: transparent;
    min-width: 0;

    &[readonly] {
      pointer-events: none;
    }

    &:focus {
      border-bottom: 2px solid var(--color-primary);
    }
  }

  .context-menu {
    align-items: center;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: 0.3s all ease-in-out;

    .trigger-icon {
      display: block;
      visibility: hidden;
      padding: 5px;
      border-radius: 5px;
      margin-right: 5px;

      &.no-margin {
        margin-right: 0;
      }

      &:hover {
        background: var(--color-secondary-light);
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }

  &:hover {
    background: var(--color-secondary);
    cursor: pointer;
    color: var(--font-color);
  }
}
</style>
