// BEGIN-SNIPPET using-service.js
import React from 'react';
import WithEmberSupport from 'ember-react-components';
import { get } from '@ember/object';
import {
  inject as injectService,
  service as oldInjectService,
} from '@ember-decorators/service';

const service = oldInjectService || injectService;

@WithEmberSupport
export default class UsingService extends React.Component {
  @service session;

  render() {
    const session = get(this, 'session');

    return <p>Hello, {session.userName}</p>;
  }
}
// END-SNIPPET
