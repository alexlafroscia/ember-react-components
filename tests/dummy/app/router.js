import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import { get, getWithDefault } from '@ember/object';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

import config from './config/environment';

const Router = AddonDocsRouter.extend({
  metrics: service(),

  location: config.locationType,
  rootURL: config.rootURL,

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page = get(this, 'url');
      const title = getWithDefault(this, 'currentRouteName', 'unknown');

      get(this, 'metrics').trackPage({ page, title });
    });
  }
});

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

export default Router;
