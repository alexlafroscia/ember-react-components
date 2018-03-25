import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import td from 'testdouble';

module('Unit | Utility | with-ember-support', function(hooks) {
  setupRenderingTest(hooks);

  test('it can render a React component', async function(assert) {
    await render(hbs`
      {{basic-component}}
    `);

    assert
      .dom('h1')
      .hasText('Hello from React', 'Renders content from a React component');
  });

  test('it can pass properties to a React component', async function(assert) {
    this.set('foo', 'bar');

    await render(hbs`
      {{with-properties foo=foo}}
    `);

    assert.dom('button').hasText('Updated is false', 'Has the initial state');
    assert.dom('p').hasText('foo equals bar', 'Renders passed in properties');

    await click('button');

    assert.dom('button').hasText('Updated is true', 'Has the updated state');

    this.set('foo', 'some new value');

    assert
      .dom('p')
      .hasText('foo equals some new value', 'Updates when properties change');
    assert
      .dom('button')
      .hasText('Updated is true', 'Maintains the updated state');
  });

  test('an action passed into the component can be called', async function(assert) {
    const action = td.function();
    this.set('action', action);

    await render(hbs`
      {{invoke-action action=action}}
    `);

    await click('button');

    assert.equal(
      td.explain(action).callCount,
      1,
      'Invoked the passed in action'
    );
  });
});
