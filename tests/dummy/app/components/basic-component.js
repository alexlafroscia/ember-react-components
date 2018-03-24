// BEGIN-SNIPPET basic-component.js
import React from 'react';
import WithEmberSupport from 'ember-cli-react';

@WithEmberSupport
export default class BasicComponent extends React.Component {
  render() {
    return <h1>Hello from React</h1>;
  }
}
// END-SNIPPET
