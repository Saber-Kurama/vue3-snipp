/*
 * @Author: saber
 * @Date: 2022-02-10 15:41:57
 * @LastEditTime: 2022-02-10 18:52:13
 * @LastEditors: saber
 * @Description:
 */
import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), Icons({
    compiler: 'vue3',
    customCollections: {
      custom: FileSystemIconLoader('src/assets/icons1')
    }
  }),
  Components({
    dts: true,
    resolvers: [
      IconsResolver({
        customCollections: ['custom'],
      }),
    ],
  }), 
],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
