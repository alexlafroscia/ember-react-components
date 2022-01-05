import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import React from 'react';

import isFunctionalComponent from 'ember-react-components/-private/is-functional-component';

module('Unit | Private Utility | isReactComponent', function (hooks) {
  setupTest(hooks);

  test('it can detect React.FC component', function (assert) {
    const MockReactFunctionalComponent = () =>
      React.createElement('div', null, 'Foo');

    assert.ok(isFunctionalComponent(MockReactFunctionalComponent));
  });

  test('it can detect non-React.FC component', function (assert) {
    class MockReactClassComponent extends React.Component {
      render() {
        <div>Bar</div>;
      }
    }

    assert.notOk(isFunctionalComponent(MockReactClassComponent));
  });
});
