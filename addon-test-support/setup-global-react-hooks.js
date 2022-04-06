import { _registerHook } from '@ember/test-helpers';

const _unregisterHooks = [];

/**
 * Prepare a potential React element for simulated trigger of input `change` event.
 *
 * HACK: This is necessary for React elements in `react-dom` v15.6.0+.
 *
 * @param {FormControl} element Form control element, in particular an `input` element
 *
 * @see {@link https://github.com/facebook/react/issues/11488#issuecomment-347775628}
 * @see {@link https://github.com/facebook/react/blob/main/packages/react-dom/src/client/inputValueTracking.js}
 */
function _prepareReactOnChangeEvent(element) {
  const tracker = element._valueTracker;
  if (tracker) {
    const currentTrackerValue = tracker.getValue();
    // ???: If the element value is emptied, we set it to a space so React picks up the change
    tracker.setValue(currentTrackerValue === '' ? ' ' : '');
  }
}

/**
 * Sets up React hooks to hack `change` events and ensure they are correctly simulated in tests.
 *
 * NOTE: The `@ember/test-helpers` `input` event fires after the `fillIn` and `typeIn` helpers.
 */
export function setupGlobalReactHooks() {
  const hook = _registerHook(
    `fireEvent:input`,
    'end',
    _prepareReactOnChangeEvent
  );
  _unregisterHooks.push(hook);
}

/**
 * Function to teardown configured React hooks. Used during testing.
 */
export function teardownGlobalReactHooks() {
  while (_unregisterHooks.length) {
    const hook = _unregisterHooks.shift();
    hook.unregister();
  }
}
