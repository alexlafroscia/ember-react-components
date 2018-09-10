import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | context', function(hooks) {
  setupRenderingTest(hooks);

  test('it can use the React context API', async function(assert) {
    await render(hbs`
      {{#context/provider-component value='Replacement value'}}
        {{context/consumer-component}}
      {{/context/provider-component}}
    `);

    assert.dom(this.element).hasText('Replacement value');
  });
});
