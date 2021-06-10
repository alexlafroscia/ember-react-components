// BEGIN-SNIPPET span-function-component.js
import React from 'react';
import WithEmberSupport from 'ember-react-components';

const SpanFunctionComponent = () => <button>Button wrapped in a span</button>;

export default WithEmberSupport(SpanFunctionComponent, { tagName: 'span' });
// END-SNIPPET
