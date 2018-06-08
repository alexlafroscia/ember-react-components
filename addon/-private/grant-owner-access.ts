import { Component as ReactComponent } from 'react';
import { setOwner } from '@ember/application';

import Constructor from './constructor';

type Owner = any;
type KlassMap = WeakMap<
  Owner,
  WeakMap<Constructor<ReactComponent>, Constructor<ReactComponent>>
>;

const klassMap: KlassMap = new WeakMap();

function ensureMapHasOwner(owner: Owner) {
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
 */
export default function grantOwnerAccess<T extends Constructor<ReactComponent>>(
  Klass: T,
  owner: Owner
): Constructor<ReactComponent> {
  ensureMapHasOwner(owner);

  const mapForOwner = klassMap.get(owner)!;

  // Re-use the class we already created if possible
  if (mapForOwner.has(Klass)) {
    return mapForOwner.get(Klass)!;
  }

  const KlassWithOwner = class extends Klass {
    constructor(...args: any[]) {
      super(...args);

      setOwner(this, owner);
    }
  };

  mapForOwner.set(Klass, KlassWithOwner);

  return KlassWithOwner;
}
