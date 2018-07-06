Options
------------------------------------------------------------------------------

`outputFile` - imports `react` and `react-dom` into a separate file than `/assets/vendor.js`. This is useful if your entire Ember application doesn't require `react`. The separate file containing `react` and `react-dom` can be imported via a template or initializer.

Update your `EmberApp` in `ember-cli-build` by setting the file you wish `react` and `react-dom` to be imported using the `outputFile` option.

```javascript
// ember-cli-build.js
let app = new EmberApp(defaults, {
  'ember-react-components': {
    outputFile: '/assets/react.js'
  }
});
```

If you are migrating your Ember application to React you can decide to only include React if a user has a feature flag enabled or when an environment variable is set in a build. Then using an initializer, we can determine whether to include `react` and `react-dom` on the page.

```javascript
import config from '../config/environment';

export function initialize(App) {
  // check the environment variable set in the config/environment file
  // or check if we have the isUsingReact feature flag enabled
  const isUsingReact = config.isUsingReact || window.featureFlag.isUsingReact;

  if (isUsingReact) {

    App.deferReadiness();

    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/assets/react.js';
    script.onload = function() {
      App.advanceReadiness();
    };

    document.body.appendChild(script);
  }
}

export default {
  name: 'react',
  initialize
};
```
