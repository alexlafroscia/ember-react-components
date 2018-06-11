# Component Generator

`ember-react-components` ships with a blueprint called `react-component` for generating new React components in your Ember app. You can run the following:

```bash
ember g react-component my-cool-component
```

to generate the following in your application

```javascript
// app/components/my-cool-component.js
import React from 'react';
import WithEmberSupport from 'ember-react-components';

@WithEmberSupport
export default class MyCoolComponent extends React.Component {
  render() {
    return <h1>Hello from React</h1>;
  }
}
```
