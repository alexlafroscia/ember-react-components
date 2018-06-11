// BEGIN-SNIPPET using-service.js
import React from 'react';
import WithEmberSupport from 'ember-react-components';
import { get } from '@ember/object';
import { service } from '@ember-decorators/service';

@WithEmberSupport
export default class UsingService extends React.Component {
  @service session;

  render() {
    const session = get(this, 'session');

    return <p>Hello, {session.userName}</p>;
  }
}
// END-SNIPPET
