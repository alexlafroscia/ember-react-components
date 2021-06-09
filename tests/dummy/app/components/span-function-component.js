// BEGIN-SNIPPET span-component.js
import React from 'react';
import WithEmberSupport from 'ember-react-components';

const SpanFunctionComponent = () => <button>Click me</button>;

export default WithEmberSupport(SpanFunctionComponent, { tagName: 'span' });
// END-SNIPPET
