// BEGIN-SNIPPET using-service.js
import React from 'react';
import WithEmberSupport from 'ember-react-components';
import { inject as service } from '@ember/service';

@WithEmberSupport
export default class UsingService extends React.Component {
  @service session;

  render() {
    return <p>Hello, {this.session.userName}</p>;
  }
}
// END-SNIPPET
