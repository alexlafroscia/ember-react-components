'use strict';

module.exports = {
  name: 'ember-react-components',

  options: {
    babel: {
      plugins: ['transform-class-properties', 'transform-react-jsx']
    }
  },

  appOptions() {
    return (
      (this.parent && this.parent.options) || (this.app && this.app.options)
    );
  },

  included() {
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

    opts.babel = opts.babel || {};
    opts.babel.plugins = opts.babel.plugins || [];

    const existingPlugins = opts.babel.plugins || [];

    opts.babel.plugins = [
      ...existingPlugins,
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-react-jsx'
    ];
  }
};
