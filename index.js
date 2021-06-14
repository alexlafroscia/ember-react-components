'use strict';

const configureJsxTransform = require('./lib/configure-jsx-transform');
const addJsxExtensionSupport = require('./lib/add-jsx-extension-support');

module.exports = {
  name: require('./package').name,

  included(parent) {
    this._super.included.apply(this, arguments);

    configureJsxTransform(parent);
    addJsxExtensionSupport(parent);
  },
};
