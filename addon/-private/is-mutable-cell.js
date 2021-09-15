import isObject from 'is-object';

/**
 * Detect whether a given prop value is an Ember-based (or Glimmer-based) `MutableCell` object.
 *
 * NOTE: A MutableCell object can be created via a native Symbol or a fallback Ember `enumerableSymbol` object
 * (when `Symbol` is not available in the build environment).
 *
 * @param {*} propValue Ember prop value to be passed to React
 * @returns {boolean}
 *
 * @see {@link https://github.com/emberjs/ember.js/blob/master/packages/%40ember/-internals/glimmer/lib/utils/process-args.ts}
 * @see {@link https://github.com/emberjs/ember.js/blob/21bd70c773dcc4bfe4883d7943e8a68d203b5bad/packages/%40ember/-internals/utils/lib/symbol.ts}
 * @private
 */
export default function isMutableCell(propValue) {
  return Boolean(
    isObject(propValue) &&
      propValue.constructor &&
      (propValue.constructor.name === 'MutableCell' ||
        Object.keys(propValue).some((propKey) =>
          propKey.startsWith('__MUTABLE_CELL__')
        ))
  );
}
