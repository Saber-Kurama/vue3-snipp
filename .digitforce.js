/*
 * @Author: saber
 * @Date: 2022-01-12 19:57:21
 * @LastEditTime: 2022-03-09 20:43:44
 * @LastEditors: saber
 * @Description:
 */
const dangojsComBasePath = '/Users/saber/coding/mygithub/vue3-arco-pro-components/packages';
const baseSource = '/Users/saber/coding/mygithub';
// const envBridgePath = `${baseSource}/vite-plugin-env-bridge`
const monacoPath = `${baseSource}/vue3-monaco`

// TODO: 这个需要通过 digitforceBasePath 来得到 绝对路径，目前是手写
const linkPaths = {
  '@dangojs/vue3-monaco': monacoPath
  // '@dangojs/a-query-header': `file://${dangojsComBasePath}/query-header`,
  // '@dangojs/a-query-table': `file://${dangojsComBasePath}/query-table`,
  // '@dangojs/a-page-container': `file://${dangojsComBasePath}/page-container`,
};

module.exports.linkPaths = linkPaths;
