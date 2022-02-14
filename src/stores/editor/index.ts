/*
 * @Author: saber
 * @Date: 2022-02-14 10:13:35
 * @LastEditTime: 2022-02-14 10:54:26
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
  getters: {},
  actions: {
    closeFile() {
      // 删除文件
    },
  },
});
