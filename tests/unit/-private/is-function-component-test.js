import { module, test } from 'qunit';

import React from 'react';

import isFunctionalComponent from 'ember-react-components/-private/is-functional-component';

const MockReactFunctionalCcomponent = () =>
  React.createElement('div', null, 'Foo');

class MockReactClassComponent extends React.Component {
  render() {
    <div>Bar</div>;
  }
}

module('Unit | Private Utility | isReactComponent', function () {
  test('it can detect React.FC component', function (assert) {
    assert.ok(isFunctionalComponent(MockReactFunctionalCcomponent));
  });

  test('it can detect non-React.FC component', function (assert) {
    assert.notOk(isFunctionalComponent(MockReactClassComponent));
  });
});
