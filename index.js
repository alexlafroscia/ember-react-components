'use strict';

const configureJsxTransform = require('./lib/configure-jsx-transform');

module.exports = {
  name: 'ember-react-components',

  appOptions() {
    return (
      (this.parent && this.parent.options) || (this.app && this.app.options)
    );
  },

  included(parent) {
    this._super.included.apply(this, arguments);

    const opts = this.appOptions();
    const cliOpts = opts['ember-react-components'];
    const outputFile = (cliOpts && cliOpts.outputFile) || '/assets/vendor.js';

    this.import(
      {
        development: 'node_modules/react/umd/react.development.js',
        production: 'node_modules/react/umd/react.production.min.js'
      },
      {
        using: [{ transformation: 'amd', as: 'react' }],
        outputFile
      }
    );

    this.import(
      {
        development: 'node_modules/react-dom/umd/react-dom.development.js',
        production: 'node_modules/react-dom/umd/react-dom.production.min.js'
      },
      {
        using: [{ transformation: 'amd', as: 'react-dom' }],
        outputFile
      }
    );

    configureJsxTransform(parent);
  }
};
