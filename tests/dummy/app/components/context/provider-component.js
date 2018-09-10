import React from 'react';
import WithEmberSupport from 'ember-react-components';

import TestContext from './context';

@WithEmberSupport
export default class ContextProviderComponent extends React.Component {
  render() {
    const { children, value } = this.props;

    return (
      <TestContext.Provider value={value}>{children}</TestContext.Provider>
    );
  }
}
