/*
 * @Author: saber
 * @Date: 2022-02-10 15:41:57
 * @LastEditTime: 2022-02-11 19:04:12
 * @LastEditors: saber
 * @Description:
 */
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
