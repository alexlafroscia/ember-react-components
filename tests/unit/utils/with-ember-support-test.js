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

  test('state is persisted through updated props', async function(assert) {
    this.set('prop', 'foo');

    await render(hbs`
      {{set-state someValue=prop}}
    `);

    assert
      .dom('[data-test="state"]')
      .hasText('foo', 'Sets the state to the initial value');
    assert
      .dom('[data-test="prop"]')
      .hasText('foo', 'The initial prop value is displayed');

    this.set('prop', 'bar');

    assert
      .dom('[data-test="state"]')
      .hasText('foo', 'Has the initial state after props change');
    assert
      .dom('[data-test="prop"]')
      .hasText('bar', 'The prop has actually updated');
  });

  module('supporting yields and children', function() {
    test('it can yield the block to the React children', async function(assert) {
      await render(hbs`
        {{#yield-to-children}}
          <h1>Child content</h1>
        {{/yield-to-children}}
      `);

      assert.dom('#wrapper').exists();
      assert.dom('h1').exists();
    });

    test('the yield can have multiple children', async function(assert) {
      await render(hbs`
        {{#yield-to-children}}
          <p data-test="foo">Foo</p>
          <p data-test="bar">Bar</p>
        {{/yield-to-children}}
      `);

      assert.dom('#wrapper').exists();
      assert.dom('[data-test="foo"]').exists();
      assert.dom('[data-test="bar"]').exists();
    });
  });
});
