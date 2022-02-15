/*
 * @Author: saber
 * @Date: 2022-02-14 10:13:35
 * @LastEditTime: 2022-02-15 14:31:33
 * @LastEditors: saber
 * @Description:
 */
import { defineStore } from 'pinia';

// 编辑面板 支持 两个
export const EDITORS = {
  primary: 'PRIMARY',
  secondary: 'SECONDARY',
};

// todo: 先在这定一下file的数据类型

export interface FileType {
  id: string;
  name: string;
}

export const useEditorStore = defineStore('editor', {
  state: () => ({
    activeEditor: EDITORS.primary,
    openFiles: {
      [EDITORS.primary]: [
        { id: '11', name: 'kafa' },
        { id: '22', name: 'saber' },
      ] as FileType[],
      [EDITORS.secondary]: [] as FileType[],
    },
    activeFiles: {
      // TODO: 这里的数据最好是用 id 存储
      [EDITORS.primary]: { id: '11', name: 'kafa' } as FileType,
      [EDITORS.secondary]: null,
    } as {
      [x: string]: FileType | null;
    },
  }),
  getters: {
    getChildren() {
      const files = [
        {
          contents: '',
          created_at: '',
          editable: false,
          id: 1,
          name: '111',
          parent: 'root',
          type: 'directory',
        },
        {
          contents: '',
          created_at: '',
          editable: false,
          id: 2,
          name: '2222',
          parent: 'root',
          type: 'directory',
        },
        {
          contents: '',
          created_at: '',
          editable: false,
          id: 3,
          name: '33.js',
          parent: 'root',
          type: 'file',
        },
        {
          contents: '',
          created_at: '',
          editable: false,
          id: 4,
          name: '44.js',
          parent: 'root',
          type: 'file',
        },
      ];
      return files;
    },
  },
  actions: {
    closeFile() {
      // 删除文件
    },
  },
});
