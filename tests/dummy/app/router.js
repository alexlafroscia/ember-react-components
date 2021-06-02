import EmberRouter from '@ember/routing/router';
import { docsRoute } from 'ember-cli-addon-docs/router';
import { inject as service } from '@ember/service';

import config from './config/environment';

export default class Router extends EmberRouter {
  @service metrics;
  @service router;

  location = config.locationType;
  rootURL = config.rootURL;

  constructor() {
    super(...arguments);

    let router = this.router;
    router.on('routeDidChange', () => {
      const page = router.currentURL;
      const title = router.currentRouteName || 'unknown';

      this.metrics.trackPage({ page, title });
    });
  }
}

Router.map(function() {
  docsRoute(this, function() {
    this.route('installation');
    this.route('options');

    this.route('features', function() {
      this.route('generator');
      this.route('services');
      this.route('children');
      this.route('functional');
    });
  });
});
