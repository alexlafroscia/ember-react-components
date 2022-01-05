import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import isMutableCell from 'ember-react-components/-private/is-mutable-cell';

//
// Mocks
//

/**
 * @see {@link https://github.com/emberjs/ember.js/blob/master/packages/%40ember/-internals/glimmer/lib/utils/process-args.ts}
 */
const MUTABLE_CELL = Symbol('MUTABLE_CELL');

/**
 * @see {@link https://github.com/emberjs/ember.js/blob/master/packages/%40ember/-internals/glimmer/lib/utils/process-args.ts}
 */
const REF = Symbol('REF');

/**
 * Mock replica of the Ember (Glimmer) internals `MutableCell` class
 *
 * @see {@link https://github.com/emberjs/ember.js/blob/master/packages/%40ember/-internals/glimmer/lib/utils/process-args.ts}
 * @private
 */
class MutableCell {
  value;

  constructor(ref, value) {
    this[MUTABLE_CELL] = true;
    this[REF] = ref;
    this.value = value;
  }
}

//
// Tests
//

module('Unit | Private Utility | isMutableCell', function (hooks) {
  setupTest(hooks);

  test('it can detect a Symbol-based MutableCell object', function (assert) {
    const mockSymbolMutableCell = new MutableCell('foo', 'bar');

    assert.equal(isMutableCell(mockSymbolMutableCell), true);
  });

  test('it can detect an Ember internals-based MutableCell object', function (assert) {
    const mockEmberInternalsMutableCell = {
      __MUTABLE_CELL__ember16236920965631075638123397__: true,
      __REF__ember16236920965631329977260486__: {
        __UPDATE__ember1623692096563355429474145__() {},
      },
      update: function () {},
      value: false,
    };

    assert.equal(isMutableCell(mockEmberInternalsMutableCell), true);
  });

  const NON_MUTABLE_CELL_OBJECTS = [
    ['empty Array', []],
    ['empty Object', {}],
    ['simple Object', { foo: 'bar' }],
    ['Date', new Date()],
  ];
  NON_MUTABLE_CELL_OBJECTS.forEach(([ref, obj]) => {
    test(`it returns false when provided a ${ref}`, function (assert) {
      assert.equal(isMutableCell(obj), false);
    });
  });
});
