/*
 * @Author: saber
 * @Date: 2022-02-21 13:48:47
 * @LastEditTime: 2022-02-21 13:48:47
 * @LastEditors: saber
 * @Description:
 */
import FileItem from './FileItem.vue';
import DirectoryItem from './DirectoryItem.vue';
import { fileTypes } from '@/models/vFile.model';

export const components = {
  [fileTypes.FILE]: FileItem,
  [fileTypes.DIRECTORY]: DirectoryItem,
};
