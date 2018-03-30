import React from 'react';
import WithEmberSupport from 'ember-cli-react';

@WithEmberSupport
export default class WithSetState extends React.Component {
  constructor() {
    super(...arguments);

    const { someValue } = this.props;

    this.state = {
      initialValue: someValue
    };
  }

  render() {
    const { initialValue } = this.state;
    const { someValue } = this.props;

    return (
      <React.Fragment>
        <p data-test="state">{initialValue}</p>
        <p data-test="prop">{someValue}</p>
      </React.Fragment>
    );
  }
}
