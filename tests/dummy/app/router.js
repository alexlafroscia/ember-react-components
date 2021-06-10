import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';

import config from './config/environment';

class Router extends AddonDocsRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  docsRoute(this, function () {
    this.route('installation');
    this.route('options');

    this.route('features', function () {
      this.route('generator');
      this.route('services');
      this.route('children');
      this.route('functional');
      this.route('mixin-props');
    });
  });
});

export default Router;
