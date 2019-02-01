'use strict';

const configureJsxTransform = require('./lib/configure-jsx-transform');

module.exports = {
  name: 'ember-react-components',

  included(parent) {
    this._super.included.apply(this, arguments);

    configureJsxTransform(parent);
  }
};
