/*
 * @Author: saber
 * @Date: 2022-02-14 10:13:35
 * @LastEditTime: 2022-02-24 18:00:58
 * @LastEditors: saber
 * @Description:
 */
import { defineStore } from 'pinia';
import { useFilesStore } from '../files';

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
    draggingId: null as unknown as string | null,
    draggingFileId: null as unknown as string | null,
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
      const filesState = useFilesStore();
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
        console.log('??>>>>');
        const filesState = useFilesStore();
        const children = filesState.getFiles.filter(
          (item: any) => item.parent === parentId
        );
        console.log('children', children);
        return children;
      };
    },
  },
  actions: {
    closeFile() {
      // 删除文件
    },
    setDraggingId(id: string | null) {
      this.draggingId = id;
    },
  },
});
