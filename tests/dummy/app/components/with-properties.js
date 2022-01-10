import React from 'react';
import WithEmberSupport from 'ember-react-components';

@WithEmberSupport
export default class WithProperties extends React.Component {
  state = {
    updated: false,
    foo: '',
  };

  handleChange = (event) => {
    this.setState({ foo: event.target.value });
  };

  componentDidMount() {
    const { foo } = this.props;

    this.setState({ foo });
  }

  componentDidUpdate(prevProps) {
    const { foo } = this.props;

    if (foo !== prevProps.foo) {
      this.setState({ foo });
    }
  }

  render() {
    return (
      <React.Fragment>
        <p>{`foo equals ${this.state.foo}`}</p>
        <input
          type="text"
          value={this.state.foo}
          onChange={this.handleChange}
          onBlur={this.handleChange}
        />
        <br />
        <button onClick={() => this.setState({ updated: true })}>
          {`Updated is ${this.state.updated}`}
        </button>
      </React.Fragment>
    );
  }
}
