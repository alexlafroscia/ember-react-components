/* eslint-env node */

module.exports = {
  description: 'Install React and ReactDOM',

  normalizeEntityName() {},

  afterInstall() {
    return this.addPackagesToProject([
      { name: 'react' },
      { name: 'react-dom' }
    ]);
  }
};
