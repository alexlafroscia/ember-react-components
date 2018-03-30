import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { get, getWithDefault } from '@ember/object';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

const Router = EmberRouter.extend({
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
  this.route('docs', function() {
    this.route('installation');

    this.route('features', function() {
      this.route('generator');
      this.route('services');
      this.route('children');
    });

    this.route('api', function() {
      this.route('item', { path: '/*path' });
    });
  });
});

export default Router;
