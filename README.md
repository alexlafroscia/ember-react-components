ember-cli-react
==============================================================================

[![Build Status](https://travis-ci.org/alexlafroscia/ember-cli-react.svg?branch=master)](https://travis-ci.org/alexlafroscia/ember-cli-react)

> Consume React components in Ember

This addon is a proof-of-concept for an approach to rendering React components in Ember. It is almost entirely inspired by [a blog post][blog-post] by [Sivakumar Kailasam][sivakumar], from which the general idea was borrowed.

Installation
------------------------------------------------------------------------------

```bash
yarn add -D alexlafroscia/ember-cli-react react react-dom
```

Note: `react` and `react-dom` are considered peer dependencies of this addon. You should install them in addition to the addon itself.


Usage
------------------------------------------------------------------------------

This addon provides an ES6 class decorator that allows a React element to be rendered in Ember.

As an example, you can create a component like this:

```javascript
// app/components/my-react-component.js
import React from 'react';
import WithEmberSupport from 'ember-cli-react';

@WithEmberSupport
export default class extends React.Component {
  render() {
    const { name } = this.props;

    return (
      <p>Hello, {name}</p>
    );
  }
}
```

And render it like this:

```handlebars
{{my-react-component name='Alex'}}
```

That would create a component that renders `Hello, Alex`.

What all is this addon doing?
------------------------------------------------------------------------------

* Provides imports for `react` and `react-dom`
* Hooks up a bunch of necessary `babel` transforms
* Includes the decorator for creating a React-Ember-component Frankenstein-ian monster class that does the "heavy lifting" to bridge the two frameworks

Is this production ready?
------------------------------------------------------------------------------

Probably not. It _does_ work, but you should be really careful about including both the Ember _and_ React libraries in your application since that's quite a lot of JavaScript to ship to your users.

I also make no guarantees about all React APIs working correctly. However, for basic components, this should work fine.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

[blog-post]: https://medium.com/@sivakumar_k/using-react-components-in-your-ember-app-8f7805d409b0
[sivakumar]: https://github.com/sivakumar-kailasam
