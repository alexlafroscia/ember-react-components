/* eslint-env node */

const pkg = require('../../package.json');

function getDependencyVersion(packageJson, name) {
  var dependencies = packageJson.dependencies;
  var devDependencies = packageJson.devDependencies;

  return dependencies[name] || devDependencies[name];
}

module.exports = {
  description: 'Install React and ReactDOM',

  normalizeEntityName() {},

  afterInstall() {
    return Promise.all([
      this.addPackageToProject('react', getDependencyVersion(pkg, 'react')),
      this.addPackageToProject(
        'react-dom',
        getDependencyVersion(pkg, 'react-dom')
      )
    ]);
  }
};
