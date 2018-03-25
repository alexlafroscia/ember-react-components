import React from 'react';
import WithEmberSupport from 'ember-cli-react';

@WithEmberSupport
export default class WithProperties extends React.Component {
  state = {
    updated: false
  };

  render() {
    const { foo } = this.props;

    return (
      <React.Fragment>
        <p>foo equals {foo}</p>
        <button onClick={() => this.setState({ updated: true })}>
          {`Updated is ${this.state.updated}`}
        </button>
      </React.Fragment>
    );
  }
}
