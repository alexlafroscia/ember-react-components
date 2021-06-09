// BEGIN-SNIPPET span-component.js
import React from 'react';
import WithEmberSupport from 'ember-react-components';

@WithEmberSupport({ tagName: 'span' })
export default class SpanClassComponent extends React.Component {
  render() {
    return <button>Click me</button>;
  }
}
// END-SNIPPET
