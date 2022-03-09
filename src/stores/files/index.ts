/*
 * @Author: saber
 * @Date: 2022-02-15 14:20:08
 * @LastEditTime: 2022-03-09 22:12:09
 * @LastEditors: saber
 * @Description:
 */

import { defineStore } from 'pinia';
import sortBy from 'lodash/sortBy';
import omit from 'lodash/omit';
import VFile, { fileTypes } from '@/models/vFile.model';

interface FilesI {
  [k: string]: any;
}

const defaultState = {
  files: {
    'directory_6b467c39-3528-4c2d-93b6-8529c1187bc2': {
      id: 'directory_6b467c39-3528-4c2d-93b6-8529c1187bc2',
      parent: 'root',
      name: '111',
      contents: '',
      created_at: 1644397638595,
      type: 'directory',
      editable: false,
    },
    'directory_97d869b8-1e28-443e-b52d-1e5763e783dd': {
      id: 'directory_97d869b8-1e28-443e-b52d-1e5763e783dd',
      parent: 'root',
      name: '123123',
      contents: '',
      created_at: 1644906221699,
      type: 'directory',
      editable: false,
    },
    'directory_fb35525b-59ad-47e5-8cda-2862e498ba6f': {
      id: 'directory_fb35525b-59ad-47e5-8cda-2862e498ba6f',
      parent: 'root',
      name: '333',
      contents: '',
      created_at: 1644906669684,
      type: 'directory',
      editable: false,
    },
    'file_0d65484c-0809-4853-9810-7d83ffe4477a': {
      id: 'file_0d65484c-0809-4853-9810-7d83ffe4477a',
      parent: 'directory_6b467c39-3528-4c2d-93b6-8529c1187bc2',
      name: '1.sh',
      contents: '',
      created_at: 1644397729035,
      type: 'file',
      editable: false,
    },
    'file_74cbcb97-3cd4-4b39-9ba6-d72e915c48a7': {
      id: 'file_74cbcb97-3cd4-4b39-9ba6-d72e915c48a7',
      parent: 'directory_97d869b8-1e28-443e-b52d-1e5763e783dd',
      name: '22.js',
      contents: '',
      created_at: 1644906231636,
      type: 'file',
      editable: false,
    },
    'file_e35c93b8-572c-4199-91e4-bc0c5e44cbeb': {
      id: 'file_e35c93b8-572c-4199-91e4-bc0c5e44cbeb',
      parent: 'root',
      name: '2.jar',
      contents: '奥术大师多',
      created_at: 1644397737776,
      type: 'file',
      editable: false,
    },
    'file_f49dfcd4-05ad-4c39-8da3-ff9ba364d433': {
      id: 'file_f49dfcd4-05ad-4c39-8da3-ff9ba364d433',
      parent: 'root',
      name: 'a.sql',
      contents: 'select * from tablename',
      created_at: 1644397720935,
      type: 'file',
      editable: false,
    },
  } as FilesI,
  filesById: [
    'directory_6b467c39-3528-4c2d-93b6-8529c1187bc2',
    'directory_97d869b8-1e28-443e-b52d-1e5763e783dd',
    'directory_fb35525b-59ad-47e5-8cda-2862e498ba6f',
    'file_0d65484c-0809-4853-9810-7d83ffe4477a',
    'file_74cbcb97-3cd4-4b39-9ba6-d72e915c48a7',
    'file_e35c93b8-572c-4199-91e4-bc0c5e44cbeb',
    'file_f49dfcd4-05ad-4c39-8da3-ff9ba364d433',
  ],
  filteredFiles: {},
};

export const useFilesStore = defineStore('files', {
  state: () => {
    return {
      ...defaultState,
    };
  },
  getters: {
    getFiles: (state) => {
      return sortBy(
        state.filesById.map((id) => state.files[id]),
        ['type', 'name']
      );
    },
    getFile: (state) => {
      return (id: string) => state.files[id];
    },
  },
  actions: {
    setFiles(files: { [x: string]: VFile }) {
      // // 这个逻辑的抽象
      this.files = files;
      this.filesById = Object.keys(files);
    },
    // todo: any
    async createFile(fileDetails: any) {
      // todo: showExplorerPanel
      const details = fileDetails ? fileDetails : {};
      const file = new VFile({ ...details, type: fileTypes.FILE });
      const files = {
        ...this.files,
        // todo: ts提示
        // @ts-ignore
        [file.id]: file,
      };
      this.setFiles(files);
      // todo: 保存到 indexDB
      return file;
    },
    // todo: any
    async createDirectory(directoryDetails: any) {
      // todo: showExplorerPanel
      const details = directoryDetails ? directoryDetails : {};
      const directory = new VFile({ ...details, type: fileTypes.DIRECTORY });
      const files = {
        ...this.files,
        // todo: ts提示
        // @ts-ignore
        [directory.id]: directory,
      };
      this.setFiles(files);
      // todo: 保存到 indexDB
      return directory;
    },
    // todo: any
    async renameFile({ id, name }: any) {
      if (!id) return;
      const files = {
        ...this.files,
        [id]: {
          ...this.files[id],
          name,
          editable: false,
        },
      };
      this.setFiles(files);
      // todo: 保存到 indexDB
    },
    // todo: any
    async moveFile({ id, directoryId }: any) {
      if (!id) return;
      const files = {
        ...this.files,
        [id]: {
          ...this.files[id],
          parent: directoryId,
          editable: false,
        },
      };
      this.setFiles(files);
      // todo: 保存到 indexDB
    },
    // todo: any
    async deleteFile({ id }: any) {
      if (!id) return;
      const files = omit(this.files, id);
      this.setFiles(files);
    },
    // todo: any
    async deleteDirectory({ id }: any) {
      if (!id) return;
      const files = omit(this.files, id);
      this.setFiles(files);
    },
  },
});
