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

export const useUiStore = defineStore('ui', {
  state: () => ({
    activePanelId: PANELS.explorer.id,
    panelsById: ['explorer', 'search'],
  }),
  getters: {
    getPanels: (state) => {
      return state.panelsById.map((panelId) => PANELS[panelId as PANELS_KEYS]);
    },
  },
  actions: {
    setActivePanelId({ id }: typeof PANELS.explorer | { id: null }) {
      if (id) {
        this.$state.activePanelId = id;
      }
    },
  },
});
