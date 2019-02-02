'use strict';

const configureJsxTransform = require('./lib/configure-jsx-transform');

module.exports = {
  name: require('./package').name,

  included(parent) {
    this._super.included.apply(this, arguments);

    configureJsxTransform(parent);
  }
};
