ember-cli-react
==============================================================================
> Consume React components in Ember ???

This addon is a proof-of-concept for an approach to rendering React components in Ember. It is almost entirely inspired by [a blog post][blog-post] by [Sivakumar Kailasam][sivakumar], from which the general idea was mostly borrowed.

Installation
------------------------------------------------------------------------------

```
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

Got'chas
------------------------------------------------------------------------------

* Any time a property on `my-react-component` changes, it will blow away the React component entirely and re-render it. You will lose any temporal state.

What all is this addon doing?
------------------------------------------------------------------------------

* Provides imports for `react` and `react-dom`
* Hooks up a bunch of necessary `babel` transforms
* Includes the decorator for creating a React-Ember-component Frankenstein-ian monster class that does the "heavy lifting" to bridge the two frameworks

Is this production ready?
------------------------------------------------------------------------------

O god, please do not use this


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

[blog-post]: https://medium.com/@sivakumar_k/using-react-components-in-your-ember-app-8f7805d409b0
[sivakumar]: https://github.com/sivakumar-kailasam
