import Component from '@ember/component';
import { get } from '@ember/object';
import { schedule } from '@ember/runloop';
import { getOwner } from '@ember/application';

import React from 'react';
import ReactDOM from 'react-dom';

import YieldWrapper from './-private/yield-wrapper';
import grantOwnerAccess from './-private/grant-owner-access';

/**
 * @function WithEmberSupport
 * @param {React.Component} Klass The React class to "transform"
 * @return {Ember.Component} the resulting class
 * @hide
 */
export default function WithEmberSupport(Klass) {
  return class extends Component {
    _getPropsForReact() {
      return Object.keys(this.attrs).reduce((acc, key) => {
        const value = get(this, key);

        acc[key] = value;

        return acc;
      }, {});
    }

    _mountElement() {
      const props = this._getPropsForReact();
      let { children } = props;

      if (!children) {
        const childNodes = get(this, 'element.childNodes');
        children = [
          React.createElement(YieldWrapper, {
            key: get(this, 'elementId'),
            nodes: [...childNodes]
          })
        ];
      }

      const owner = getOwner(this);
      const KlassWithOwner = grantOwnerAccess(Klass, owner);

      this._reactElement = ReactDOM.render(
        <KlassWithOwner {...props}>{children}</KlassWithOwner>,
        this.element
      );
    }

    didUpdateAttrs() {
      schedule('render', () => {
        this._mountElement();
      });
    }

    didInsertElement() {
      super.didInsertElement(...arguments);

      this._mountElement();
    }

    willDestroyElement() {
      ReactDOM.unmountComponentAtNode(this.element);

      super.willDestroyElement(...arguments);
    }
  };
}
