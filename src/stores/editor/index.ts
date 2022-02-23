/*
 * @Author: saber
 * @Date: 2022-02-14 10:13:35
 * @LastEditTime: 2022-02-23 19:17:15
 * @LastEditors: saber
 * @Description:
 */
import { defineStore } from 'pinia';
import { useFileStore } from '../files';

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
      [EDITORS.primary]: '11',
      [EDITORS.secondary]: null,
    } as {
      [x: string]: string | null;
    },
  }),
  getters: {
    getActiveFiles(state) {
      const primary_id = state.activeFiles[EDITORS.primary];
      const secondary_id = state.activeFiles[EDITORS.secondary];
      const filesState = useFileStore();
      return {
        [EDITORS.primary]: primary_id ? filesState.getFile(primary_id) : null,
        [EDITORS.secondary]: secondary_id
          ? filesState.getFile(secondary_id)
          : null,
      };
    },
    getActiveFileList() {
      // todo: 解决any问题
      const activeFiles: any = this.getActiveFiles;
      return Object.keys(activeFiles).reduce((result, editor) => {
        if (activeFiles[editor]) {
          return Object.assign(result, {
            [activeFiles[editor].id]: true,
          });
        } else {
          return result;
        }
      }, {} as any);
    },
    getChildren(state) {
      return (parentId = 'root') => {
        const filesState = useFileStore();
        const children = filesState.getFiles.filter(
          (item: any) => item.parent === parentId
        );
        return children;
      };
    },
  },
  actions: {
    closeFile() {
      // 删除文件
    },
  },
});
