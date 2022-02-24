/*
 * @Author: saber
 * @Date: 2022-02-14 10:13:35
 * @LastEditTime: 2022-02-24 19:21:02
 * @LastEditors: saber
 * @Description:
 */
import { keys } from 'lodash';
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
      [EDITORS.primary]: [] as string[],
      [EDITORS.secondary]: [] as string[],
    },
    activeFiles: {
      [EDITORS.primary]: null,
      [EDITORS.secondary]: null,
    } as {
      [x: string]: string | null;
    },
  }),
  getters: {
    getOpenFiles(state) {
      const filesState = useFilesStore();
      // todo：返回一个方法
      return Object.keys(state.openFiles).reduce((result, editor) => {
        return Object.assign(result, {
          [editor]: state.openFiles[editor].reduce((file_results, id) => {
            const file = filesState.getFile(id);
            if (file) file_results.push(file);
            return file_results;
          }, [] as any[]),
        });
      }, {} as any);
    },
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
        const filesState = useFilesStore();
        const children = filesState.getFiles.filter(
          (item: any) => item.parent === parentId
        );
        return children;
      };
    },
  },
  actions: {
    // todo: any
    openFile({ id, editor }: any) {
      editor = editor || this.activeEditor;
      // 如果没有包含
      if (!this.openFiles[editor].includes(id)) {
        this.openFiles[editor].push(id);
        // 存储inexDb
      }
      this.setActiveFile({ id, editor });
    },
    closeFile() {
      // 删除文件
    },
    async setActiveFile({ editor, id }: any) {
      this.activeFiles[editor] = id;
      // todo 设置编辑区
    },
    setDraggingId(id: string | null) {
      this.draggingId = id;
    },
  },
});
