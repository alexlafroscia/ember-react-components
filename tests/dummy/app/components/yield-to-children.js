// BEGIN-SNIPPET yield-to-children.js
import React from 'react';
import WithEmberSupport from 'ember-react-components';

@WithEmberSupport
export default class YieldToChildren extends React.Component {
  state = {
    updated: false
  };

  render() {
    const { children } = this.props;

    return <div id="wrapper">{children}</div>;
  }
}
// END-SNIPPET
