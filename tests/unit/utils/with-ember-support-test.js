import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Unit | Utility | with-ember-support', function(hooks) {
  setupRenderingTest(hooks);

  test('it can render a React component', async function(assert) {
    await render(hbs`
      {{basic-component}}
    `);

    assert.equal(
      this.element.textContent.trim(),
      'Hello from React',
      'Renders content from a React component'
    );
  });

  test('it can pass properties to a React component', async function(assert) {
    this.set('foo', 'bar');

    await render(hbs`
      {{with-properties foo=foo}}
    `);

    assert.equal(
      this.element.textContent.trim(),
      'foo equals bar',
      'Renders passed in properties'
    );

    this.set('foo', 'some new value');

    assert.equal(
      this.element.textContent.trim(),
      'foo equals some new value',
      'Updates when properties change'
    );
  });
});
