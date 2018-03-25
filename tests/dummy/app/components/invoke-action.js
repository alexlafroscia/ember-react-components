import React from 'react';
import WithEmberSupport from 'ember-cli-react';

@WithEmberSupport
export default class InvokeAction extends React.Component {
  render() {
    const { action } = this.props;

    return <button onClick={action()}>click me</button>;
  }
}
