/*
 * @Author: saber
 * @Date: 2022-02-15 14:50:21
 * @LastEditTime: 2022-02-23 15:33:48
 * @LastEditors: saber
 * @Description:
 */
// todo: typescript 提示
// @ts-nocheck
import { v4 as uuid } from 'uuid';

export const fileTypes = {
  FILE: 'file',
  DIRECTORY: 'directory',
  MARKDOWN: 'markdown',
};

// todo: any
export default class VFile {
  constructor({
    id,
    parent,
    type = fileTypes.FILE,
    name,
    contents,
    created_at,
    editable,
  }: any) {
    this.id = id || `${type}_${uuid()}`;
    this.parent = parent || 'root';
    this.name = name || '';
    this.contents = contents || '';
    this.created_at = created_at || Date.now();
    this.type = type;
    this.editable = editable || false;
  }
}
