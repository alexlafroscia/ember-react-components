import React from 'react';
import WithEmberSupport from 'ember-react-components';

import TestContext from './context';

@WithEmberSupport
export default class ContextProviderComponent extends React.Component {
  render() {
    return <TestContext.Consumer>{value => value}</TestContext.Consumer>;
  }
}
