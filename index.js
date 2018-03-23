'use strict';

module.exports = {
  name: 'ember-cli-react',

  appOptions() {
    return (
      (this.parent && this.parent.options) || (this.app && this.app.options)
    );
  },

  included() {
    this._super.included.apply(this, arguments);

    this.import({
      development: 'node_modules/react/umd/react.development.js',
      production: 'node_modules/react/umd/react.production.min.js'
    }, {
      using: [{ transformation: 'amd', as: 'react' }]
    });

    this.import({
      development: 'node_modules/react-dom/umd/react-dom.development.js',
      production: 'node_modules/react-dom/umd/react-dom.production.min.js'
    }, {
      using: [{ transformation: 'amd', as: 'react-dom' }]
    });

    const opts = this.appOptions();
    opts.babel = opts.babel || {};
    opts.babel.plugins = opts.babel.plugins || [];

    opts.babel.plugins.push(['transform-class-properties', 'transform-react-jsx']);
  }
};
