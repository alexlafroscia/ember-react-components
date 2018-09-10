/* eslint-env node */

module.exports = {
  description: 'Install React, ReactDOM and decorator support',

  normalizeEntityName() {},

  afterInstall() {
    return Promise.all([
      this.addPackagesToProject([{ name: 'react' }, { name: 'react-dom' }]),
      this.addAddonToProject('@ember-decorators/babel-transforms')
    ]);
  }
};
