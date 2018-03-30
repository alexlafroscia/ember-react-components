import Component from '@ember/component';
import { get } from '@ember/object';
import { schedule } from '@ember/runloop';
import React from 'react';
import ReactDOM from 'react-dom';
import YieldWrapper from './yield-wrapper';

/**
 * @function WithEmberSupport
 * @param {React.Component} klass The React class to "transform"
 * @return {Ember.Component} the resulting class
 */
export function WithEmberSupport(Klass) {
  return class extends Component {
    constructor() {
      super(...arguments);

      for (const key in Klass.prototype) {
        this[key] = Klass.prototype[key];
      }
    }

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

      this._reactElement = ReactDOM.render(
        React.createElement(Klass, props, children),
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
