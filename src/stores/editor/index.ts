import { defineStore } from 'pinia';

// 编辑面板 支持 两个
export const EDITORS = {
  primary: 'PRIMARY',
  secondary: 'SECONDARY',
};

export const useEditorStore = defineStore('editor', {
  state: () => ({
    activeEditor: EDITORS.primary,
    openFiles: {
      [EDITORS.primary]: [],
      [EDITORS.secondary]: [],
    },
    activeFiles: {
      [EDITORS.primary]: null,
      [EDITORS.secondary]: null,
    },
  }),
  getters: {},
  actions: {},
});
