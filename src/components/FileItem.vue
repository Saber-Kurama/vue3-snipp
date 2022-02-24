<!--
 * @Author: saber
 * @Date: 2022-02-15 14:42:05
 * @LastEditTime: 2022-02-24 19:20:50
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts">
import {
  FileCode,
  FileAddition,
  FolderPlus,
  MoreOne,
  Edit,
  Download,
  Delete,
} from '@icon-park/vue-next';
// @ts-ignore
import {
  SlideYUpTransition,
  // @ts-ignore
} from '@dangojs/vue3-transitions';
import { onMounted, ref, watch, type PropType } from 'vue';
import { useFilesStore } from '@/stores/files';
import { useEditorStore } from '@/stores/editor';

const editorState = useEditorStore();
const filesState = useFilesStore();
const props = defineProps({
  file: Object as PropType<{ name: string; id: string; editable: boolean }>,
  isActive: Boolean,
});
const filename = ref(props.file?.name);
const readonly = ref(true);
const refInput = ref<HTMLElement | null>();
const showContextMenu = ref(false);

const openFile = (file: any) => {
  console.log('openFile', file);
};
const toggleContextMenu = () => {
  showContextMenu.value = !showContextMenu.value;
};
const changeFileName = () => {
  if (filename.value) {
    if (props.file) {
      filesState.renameFile({ id: props.file.id, name: filename.value });
      readonly.value = true;
      // this.openFile({ id: this.file.id });
    }
  } else {
    // todo 删除文件
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
const deleteCurrentFile = () => {
  showContextMenu.value = false;
  if (props.file) {
    filesState.deleteFile({ id: props.file.id });
  }
};
onMounted(() => {
  readonly.value = !props.file?.editable;
  filename.value = props.file?.name || '';
  if (props.file?.editable) {
    // this.$refs.input.focus();
    refInput.value?.focus();
  }
});
// watch(readonly, (newVal) => {
//   if (!newVal) {
//     refInput.value?.focus();
//   }
// });
// watch(
//   () => props.file,
//   (newVal) => {
//     if (newVal) {
//       // readonly.value = !newVal.editable;
//       // filename.value = newVal.name;
//       // todo: 为啥这样 不能正确 focus？
//       // if (newVal.editable) {
//       //   // setTimeout(() => {
//       //   // refInput.value?.focus();
//       //   // }, 200);
//       //   nextTick(() => {
//       //     refInput.value?.focus();
//       //   });
//       // }
//     }
//   }
// );
// 文件的拖拽
const handleDrag = (event: DragEvent) => {
  if (event.dataTransfer && props.file) {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('fileId', props.file.id);
    // this.setDraggingFileId({ id: this.file.id });
  }
};
const handleDragEnd = () => {
  setTimeout(() => {
    // this.setDraggingFileId({ id: null });
    editorState.setDraggingId(null);
  }, 100);
};
</script>
<template>
  <div :class="['file-item', { active: props.isActive || showContextMenu }]">
    <div
      class="clickable-area"
      @click="editorState.openFile({ id: props.file?.id })"
      @dblclick="readonly = !readonly"
      draggable="true"
      @dragstart="handleDrag"
      @dragend="handleDragEnd"
    >
      <FileCode class="icon" size="20px"></FileCode>
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
      <div class="active-indicator" v-if="isActive"></div>
    </div>
    <div class="context-menu">
      <MoreOne
        class="trigger-icon no-margin"
        :style="showContextMenu ? 'visibility: visible' : null"
        size="18px"
        @click="toggleContextMenu"
      />
      <SlideYUpTransition>
        <div
          v-if="showContextMenu"
          class="options"
          @mouseleave.once="showContextMenu = false"
        >
          <div class="option-item" @click="openRenameMode">
            <Edit size="18" class="icon" />Rename
          </div>
          <div class="option-item" @click="saveFolderAs">
            <Download size="18" class="icon" />Download
          </div>
          <div class="option-item" @click="deleteCurrentFile">
            <Delete size="18" class="icon" />Delete File
          </div>
        </div>
      </SlideYUpTransition>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.file-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 5px 2px 0;
  margin: 0 5px 1px 5px;
  border-radius: 5px;

  &.active {
    // color: var(--color-primary);
    background: var(--color-secondary);
  }

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

  .active-indicator {
    width: 5px;
    height: 5px;
    background: var(--color-primary);
    border-radius: 50%;
  }

  .context-menu {
    display: none;
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
