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

    const opts = this.appOptions();
    opts.babel = opts.babel || {};
    opts.babel.plugins = opts.babel.plugins || [];

    opts.babel.plugins.push(['transform-class-properties', 'transform-react-jsx']);
  }
};
