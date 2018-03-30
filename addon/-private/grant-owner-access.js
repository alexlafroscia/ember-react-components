import { setOwner } from '@ember/application';

const klassMap = new WeakMap();

function ensureMapHasOwner(owner) {
  if (!klassMap.has(owner)) {
    klassMap.set(owner, new WeakMap());
  }
}

/**
 * Memoizes the "KlassWithOwner" classes, so that only one is generated
 * for any given pair of Klass and owner. Otherwise, we generate a new
 * class for every render, which not only is bad for performance but also
 * breaks the way that the wrapper translates updates to props down to
 * the underlying React component.
 *
 * @param {Class} Klass the class to extend with owner access
 * @param {object} owner the owner to grant access with
 * @return {Class} an extension of Klass with owner access
 * @hide
 */
export default function grantOwnerAccess(Klass, owner) {
  ensureMapHasOwner(owner);

  // Re-use the class we already created if possible
  if (klassMap.get(owner).has(Klass)) {
    return klassMap.get(owner).get(Klass);
  }

  const KlassWithOwner = class extends Klass {
    constructor() {
      super(...arguments);

      setOwner(this, owner);
    }
  };

  klassMap.get(owner).set(Klass, KlassWithOwner);

  return KlassWithOwner;
}
