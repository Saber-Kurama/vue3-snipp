<!--
 * @Author: saber
 * @Date: 2022-02-22 15:31:22
 * @LastEditTime: 2022-02-22 17:38:13
 * @LastEditors: saber
 * @Description: 
-->
<script lang="ts" setup>
// @ts-ignore
import { SlideYUpTransition } from '@dangojs/vue3-transitions';
import { computed, ref } from 'vue';
import {
  Close,
  ArrowRight,
  FileText,
  FileCode,
  ElectronicPen,
} from '@icon-park/vue-next';
import { useUiStore } from '@/stores/ui';

const uiState = useUiStore();
// const showModal = ref(false);
const filename = ref('');
const fileTypes = {
  empty: {
    ext: null,
    name: 'Empty File',
    icon: FileCode,
  },
  doc: {
    ext: 'doc',
    name: 'Document',
    icon: FileText,
  },
  draw: {
    ext: 'draw',
    name: '[Beta] Drawing',
    icon: ElectronicPen,
  },
};
const showModal = computed({
  get() {
    return uiState.getShowCreateFileModal;
  },
  set(value) {
    //
  },
});
const getCurrentFileType = computed(() => {
  if (filename.value && filename.value.trim().length > 0) {
    const parts = filename.value.trim().split('.');
    const ext = parts.slice(-1)[0];
    if (ext !== 'empty' && Object.keys(fileTypes).includes(ext)) {
      return ext;
    } else {
      return null;
    }
  } else {
    return null;
  }
});
const createNewFile = () => {
  console.log('----');
};
</script>
<template>
  <div class="file-create">
    <SlideYUpTransition>
      <div class="file-creation-modal" v-if="showModal">
        <div class="creation-card">
          <div class="header">
            <h3 class="title">Create new file</h3>
            <button class="close-button">
              <Close size="18" />
            </button>
          </div>
          <div class="contents">
            <form class="input-area" @submit.prevent="createNewFile">
              <input
                v-model="filename"
                type="text"
                placeholder="Enter your file name..."
                ref="fileNameInput"
                autofocus
              />
              <!-- <SlideXRightTransition> -->
              <button
                v-if="filename && filename.length > 0"
                class="create-btn"
                type="submit"
              >
                <ArrowRight size="20" class="create-icon" />
              </button>
              <!-- </SlideXRightTransition> -->
            </form>
            <div class="file-types">
              <div
                v-for="fileType in Object.values(fileTypes)"
                :key="fileType.name"
                :class="[
                  'item',
                  { active: getCurrentFileType === fileType.ext },
                ]"
              >
                <component :is="fileType.icon" size="18" class="item-icon" />{{
                  fileType.name
                }}<span v-if="fileType.ext" class="hint"
                  >.{{ fileType.ext }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideYUpTransition>
  </div>
</template>
<style lang="scss" scoped>
.file-creation-modal {
  z-index: 9999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--popup-background);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  .creation-card {
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 600px;
    border-radius: 5px;
    background: var(--color-secondary);
    margin-top: 150px;

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 15px;

      .close-button {
        padding: 5px;
        background: var(--color-secondary-light);
        display: flex;
        align-content: center;
        justify-content: center;
        border-radius: 5px;
        border: none;
        color: var(--font-color);

        &:hover {
          cursor: pointer;
          color: var(--color-error);
        }
      }
    }

    .contents {
      display: flex;
      flex-direction: column;
      padding: 5px 15px;

      form.input-area {
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;

        input {
          flex: 1;
          background: transparent;
          border: 0;
          padding: 15px;
          font-size: 1.2rem;
          color: var(--font-color);
          border-radius: 0;
          border-bottom: 2px solid var(--border-color);
          outline: none;
          transition: 0.3s all ease-in-out;
          &:focus {
            border: none;
            border-bottom: 2px solid var(--color-accent);
          }
        }

        button.create-btn {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto 0;
          width: 40px;
          height: 40px;
          padding: 0;
          background: transparent;
          border: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--color-primary);
          opacity: 1;

          &:hover {
            background: var(--color-secondary-light);
          }
          .create-icon {
            color: var(--color-primary);
          }
        }
      }

      .file-types {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px 0;
        .item {
          display: flex;
          align-items: center;
          //   background: var(--color-secondary-light);
          padding: 5px 10px;
          margin-right: 10px;
          border-radius: 5px;
          font-size: 0.8rem;
          color: var(--font-color);
          opacity: 0.7;

          .item-icon {
            margin-right: 5px;
          }
          .hint {
            opacity: 0.5;
            color: inherit;
          }

          &.active {
            color: var(--color-primary);
            opacity: 1;
            background: var(--color-secondary-light);
          }

          &:hover {
            cursor: pointer;
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
