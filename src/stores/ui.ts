/*
 * @Author: saber
 * @Date: 2022-02-14 10:13:35
 * @LastEditTime: 2022-02-22 15:46:06
 * @LastEditors: saber
 * @Description: ui 的数据状态
 */
import { defineStore } from 'pinia';
import { Search, FileEditing } from '@icon-park/vue-next';

export const PANELS = {
  explorer: {
    id: 'explorer',
    icon: 'FileEditing',
    // icon: FileEditing,
    name: 'File Explorer',
  },
  search: {
    id: 'search',
    icon: 'Search',
    name: 'Search',
  },
};

type PANELS_KEYS = keyof typeof PANELS;

interface StateI {
  activePanelId: string;
  panelsById: string[];
  showCreateFileModal: boolean;
  bootstrappedFileName: string | null;
}

export const useUiStore = defineStore('ui', {
  state: () =>
    ({
      activePanelId: PANELS.explorer.id,
      panelsById: ['explorer', 'search'],
      showCreateFileModal: false,
      bootstrappedFileName: '',
    } as StateI),
  getters: {
    getPanels: (state) => {
      return state.panelsById.map((panelId) => PANELS[panelId as PANELS_KEYS]);
    },
    getShowCreateFileModal: (state) => {
      return state.showCreateFileModal;
    },
  },
  actions: {
    setActivePanelId({ id }: typeof PANELS.explorer) {
      if (id) {
        this.$state.activePanelId = id;
      }
    },
    setShowCreateFileModal({ flag, filename }: any) {
      if (filename) {
        // 这个情况下是修改吧
      }
      this.showCreateFileModal = flag;
      if (!flag) {
        this.bootstrappedFileName = null;
      }
    },
  },
});
