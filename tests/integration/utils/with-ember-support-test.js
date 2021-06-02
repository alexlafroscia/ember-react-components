import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import sinon from 'sinon';

module('Integration | Utility | with-ember-support', function (hooks) {
  setupRenderingTest(hooks);

  test('it can render a React component', async function (assert) {
    await render(hbs`
      <BasicComponent />
    `);

    assert
      .dom('h1')
      .hasText('Hello from React', 'Renders content from a React component');
  });

  test('it can pass properties to a React component', async function (assert) {
    this.set('foo', 'bar');

    await render(hbs`
      <WithProperties @foo={{foo}} />
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

  test('an action passed into the component can be called', async function (assert) {
    const action = sinon.stub();
    this.set('action', action);

    await render(hbs`
      <InvokeAction @action={{action}} />
    `);

    await click('button');

    assert.ok(action.calledOnce, 'Invoked the passed in action');
  });

  test('state is persisted through updated props', async function (assert) {
    this.set('prop', 'foo');

    await render(hbs`
      <SetState @someValue={{prop}} />
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

  module('usage with `ember-decorators`', function () {
    test('it works with services', async function (assert) {
      this.owner.lookup('service:session').set('userName', 'Alex');

      await render(hbs`<UsingService />`);

      assert.dom('p').hasText('Hello, Alex');
    });
  });

  module('supporting yields and children', function () {
    test('it can yield the block to the React children', async function (assert) {
      await render(hbs`
        <YieldToChildren>
          <h1>Child content</h1>
        </YieldToChildren>
      `);

      assert.dom('#wrapper').exists();
      assert.dom('h1').exists();
    });

    test('the yield can have multiple children', async function (assert) {
      await render(hbs`
        <YieldToChildren>
          <p data-test="foo">Foo</p>
          <p data-test="bar">Bar</p>
        </YieldToChildren>
      `);

      assert.dom('#wrapper').exists();
      assert.dom('[data-test="foo"]').exists();
      assert.dom('[data-test="bar"]').exists();
    });
  });

  module('supporting functional components', function () {
    module('with traditional functions', function () {
      test('it can render them inline', async function (assert) {
        await render(hbs`
          <TraditionalFunctionalComponent @name="Alex" />
        `);

        assert.dom('[data-test-name]').hasText('Alex');
      });

      test('it can render children', async function (assert) {
        await render(hbs`
          <TraditionalFunctionalComponent>
            <div data-test="foo">Foo</div>
          </TraditionalFunctionalComponent>
        `);

        assert.dom('[data-test="foo"]').hasText('Foo');
      });
    });

    module('with arrow functions', function () {
      test('it can render them inline', async function (assert) {
        await render(hbs`
          <ArrowFunctionComponent @name="Alex" />
        `);

        assert.dom('[data-test-name]').hasText('Alex');
      });

      test('it can render children', async function (assert) {
        await render(hbs`
          <ArrowFunctionComponent>
            <div data-test="foo">Foo</div>
          </ArrowFunctionComponent>
        `);

        assert.dom('[data-test="foo"]').hasText('Foo');
      });
    });
  });
});
