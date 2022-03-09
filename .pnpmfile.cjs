/*
 * @Author: saber
 * @Date: 2022-01-12 10:47:22
 * @LastEditTime: 2022-03-09 21:28:10
 * @LastEditors: saber
 * @Description:
 */
const { linkPaths } = require('./.digitforce.js');
function readPackage(pkg, context) {
  // 添加了 dev 环境
  if (pkg.name == 'vue3-snipp') {
    Object.keys(linkPaths).forEach((key) => {
      if (pkg.dependencies[key]) {
        pkg.dependencies[key] = linkPaths[key];
      }
      if (pkg.devDependencies[key]) {
        pkg.devDependencies[key] = linkPaths[key];
      }
    });
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
