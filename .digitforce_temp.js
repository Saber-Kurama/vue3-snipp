/*
 * @Author: saber
 * @Date: 2022-01-12 19:57:21
 * @LastEditTime: 2022-03-03 11:03:54
 * @LastEditors: saber
 * @Description:
 */
const dangojsComBasePath =
  '/Users/saber/coding/mygithub/vue3-arco-pro-components/packages';
const baseSource = '/Users/saber/coding/mygithub';
const envBridgePath = `${baseSource}/vite-plugin-env-bridge`;

// TODO: 这个需要通过 digitforceBasePath 来得到 绝对路径，目前是手写
// TODO: 开发中是否用src的源码，还是需要组件库构建， 目前需要组件库的构建: (1. 使用源码，在项目中构建. 2.组件库 启动 dev， 实时构建)
// TODO:
// TODO: 如何解决 本地开发 之后 版本更新的问题(1. script 更新一下版本， 2. )
const linkPaths = {
  '@dangojs/a-query-header': `file://${dangojsComBasePath}/query-header`,
};

module.exports.linkPaths = linkPaths;
