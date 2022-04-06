# ember-react-components

[![Build Status](https://travis-ci.org/alexlafroscia/ember-react-components.svg?branch=master)](https://travis-ci.org/alexlafroscia/ember-react-components)

> Consume React components in Ember

This addon is a proof-of-concept for an approach to rendering React components in Ember. It is almost entirely inspired by [a blog post][blog-post] by [Sivakumar Kailasam][sivakumar], from which the general idea was borrowed.

## Installation

```bash
ember install ember-react-components @ember-decorators/babel-transforms
```

## Compatibility

- Ember.js v3.13 or above
- Node.js v12 or above

This addon requires Ember CLI 3.13 or higher.

## Usage

This addon provides an ES6 class decorator that allows a React element to be rendered in Ember.

As an example, you can create a component like this:

```javascript
// app/components/my-react-component.js
import React from 'react';
import WithEmberSupport from 'ember-react-components';

@WithEmberSupport
export default class extends React.Component {
  render() {
    const { name } = this.props;

    return <p>Hello, {name}</p>;
  }
}
```

And render it like this:

```handlebars
<MyReactComponent @name='Alex' />
```

That would create a component that renders `Hello, Alex`.

### Testing React components in Ember

For the most part, testing React components in Ember with `@ember/testing-helpers` is functional; however, if you have a React form element whose value you change as part of a test (e.g., using the `fillIn` or `typeIn` helpers), then out of the box, your test will fail due to React internals.

In order to fix this, `ember-react-components` includes a global testing helper, which restores the expected behaviour in `@ember/testing-helpers`. 

To use it in your application or addon, add the following _before_ the `start()` function in  `test-helper.js`:

```js
import { setupGlobalReactHooks } from 'ember-react-components/test-support';

// […]

setupGlobalReactHooks();

start();
```

## Options

- `outputFile` option imports `react` and `react-dom` into a separate file than `/assets/vendor.js`. This is useful if your entire Ember application doesn't require `react`. The separate file containing `react` and `react-dom` can be imported via a template or initializer.

```javascript
// ember-cli-build.js
let app = new EmberApp(defaults, {
  'ember-react-components': {
    outputFile: '/assets/react.js',
  },
});
```

## What all is this addon doing?

- Provides imports for `react` and `react-dom`
- Hooks up a bunch of necessary `babel` transforms
- Provides a decorator for creating a thin wrapper around your React components that bridge the gap between the two libraries

## Is this production ready?

It _does_ work, but you should be really careful about including both the Ember _and_ React libraries in your application since that's quite a lot of JavaScript to ship to your users.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).

[blog-post]: https://medium.com/@sivakumar_k/using-react-components-in-your-ember-app-8f7805d409b0
[sivakumar]: https://github.com/sivakumar-kailasam
