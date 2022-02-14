import { defineStore } from 'pinia';

// 编辑面板 支持 两个
export const EDITORS = {
  primary: 'PRIMARY',
  secondary: 'SECONDARY',
};

// todo: 先在这定一下file的数据类型

export interface FileType {
    id: string,
    name: string
}

export const useEditorStore = defineStore('editor', {
  state: () => ({
    activeEditor: EDITORS.primary,
    openFiles: {
      [EDITORS.primary]: [
          {id: '11', name: 'kafa'},
          {id: '22', name: 'saber'}
    ] as FileType[],
      [EDITORS.secondary]: [] as FileType[],
    },
    activeFiles: {
      [EDITORS.primary]: null,
      [EDITORS.secondary]: null,
    },
  }),
  getters: {},
  actions: {},
});
