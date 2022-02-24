<!--
 * @Author: saber
 * @Date: 2022-02-15 14:40:54
 * @LastEditTime: 2022-02-24 15:16:21
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts">
import {
  FolderClose,
  FolderOpen,
  FileAddition,
  FolderPlus,
  MoreOne,
  Edit,
  Download,
  Delete,
} from '@icon-park/vue-next';
import {
  computed,
  getCurrentInstance,
  onMounted,
  ref,
  type PropType,
} from 'vue';
import { useEditorStore } from '@/stores/editor';
import { useFilesStore } from '@/stores/files';
// @ts-ignore
import {
  SlideYUpTransition,
  // @ts-ignore
} from '@dangojs/vue3-transitions';
import FileItem from './FileItem.vue';
// import DirectoryItem from './DirectoryItem.vue';
import { fileTypes } from '@/models/vFile.model';

const components = {
  [fileTypes.FILE]: FileItem,
  [fileTypes.DIRECTORY]: getCurrentInstance()?.type,
};

const refInput = ref<HTMLElement | null>();
const editorState = useEditorStore();
const filesState = useFilesStore();
const props = defineProps({
  file: Object as PropType<{ name: string; id: string; editable: boolean }>,
});
const filename = ref(props.file?.name || '');
const readonly = ref(true);
const showChildren = ref(true);
const showContextMenu = ref(false);

const childrenFiles = computed(() => editorState.getChildren(props.file?.id));
onMounted(() => {
  readonly.value = !props.file?.editable;
  filename.value = props.file?.name || '';
  if (props.file?.editable) {
    // this.$refs.input.focus();
    refInput.value?.focus();
  }
});

const toggleShowChildren = () => {
  showChildren.value = !showChildren.value;
};

const toggleContextMenu = () => {
  showContextMenu.value = !showContextMenu.value;
};

const changeFileName = () => {
  if (filename.value && props.file?.id) {
    filesState.renameFile({ id: props.file.id, name: filename.value });
    // 重命名
    readonly.value = true;
  } else {
    // 删除目录
  }
};

const createNewFile = () => {
  if (props.file) {
    showChildren.value = true;
    filesState.createFile({ parent: props.file.id, editable: true });
    showContextMenu.value = false;
  }
};
const createNewFolder = () => {
  if (props.file) {
    console.log('??>>>>>');
    filesState.createDirectory({ parent: props.file.id, editable: true });
    showContextMenu.value = false;
    showChildren.value = true;
  }
};
const openRenameMode = () => {
  showContextMenu.value = false;
  readonly.value = false;
  refInput.value?.focus();
};
const saveFolderAs = () => {
  console.log('--');
};
const deleteCurrentFolder = () => {
  showContextMenu.value = false;
  if (props.file) {
    filesState.deleteDirectory({ id: props.file.id });
  }
};
</script>
<template>
  <div class="directory-wrapper">
    <div :class="['file-item']">
      <div
        class="clickable-area"
        @click="toggleShowChildren"
        @dblclick="readonly = !readonly"
      >
        <FolderOpen v-if="showChildren" class="icon" size="20px"></FolderOpen>
        <FolderClose v-else class="icon" size="20px"></FolderClose>
        <form @submit.prevent="refInput?.blur()">
          <input
            ref="refInput"
            type="text"
            v-model="filename"
            :readonly="readonly"
            size="2"
            @blur="changeFileName"
          />
        </form>
      </div>
      <div class="context-menu">
        <MoreOne
          class="trigger-icon no-margin"
          :style="showContextMenu ? 'visibility: visible' : null"
          size="18px"
          @click="toggleContextMenu"
        />
        <SlideYUpTransition>
          <div v-if="showContextMenu" class="options">
            <div class="option-item" @click="createNewFile">
              <FileAddition size="18" class="icon" />Create File
            </div>
            <div class="option-item" @click="createNewFolder">
              <FolderPlus size="18" class="icon" />Create Folder
            </div>
            <div class="option-item" @click="openRenameMode">
              <Edit size="18" class="icon" />Rename
            </div>
            <div class="option-item" @click="saveFolderAs">
              <Download size="18" class="icon" />Download
            </div>
            <div class="option-item" @click="deleteCurrentFolder">
              <Delete size="18" class="icon" />Delete Folder
            </div>
          </div>
        </SlideYUpTransition>
      </div>
    </div>
    <!-- {{ childrenFiles }} -->
    <div v-if="showChildren" class="files">
      <component
        v-for="child in childrenFiles"
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

    .options {
      position: absolute;
      right: 0;
      top: 35px;
      width: 170px;
      height: auto;
      z-index: 99;
      display: flex;
      flex-direction: column;
      border-radius: 5px;
      background: var(--color-secondary);
      box-shadow: var(--smooth-shadow);
      border: 1px solid var(--border-color);
      padding: 5px;

      .option-item {
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 3px;

        &:hover {
          cursor: pointer;
          // background: var(--color-secondary-light);
          color: var(--color-primary);
          .icon {
            color: var(--color-primary);
          }
        }
      }
    }
  }

  &:hover {
    background: var(--color-secondary);
    cursor: pointer;
    color: var(--font-color);
    .context-menu {
      display: flex;
      .trigger-icon {
        visibility: visible;
      }
    }
  }
}
</style>
