import React from 'react';
import WithEmberSupport from 'ember-cli-react';

@WithEmberSupport
export default class WithProperties extends React.Component {
  render() {
    const { foo } = this.props;

    return <p>foo equals {foo}</p>;
  }
}
