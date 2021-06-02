import EmberComponent from '@ember/component';
import { get } from '@ember/object';
import { schedule } from '@ember/runloop';
import { getOwner } from '@ember/application';

import React from 'react';
import ReactDOM from 'react-dom';

import YieldWrapper from './-private/yield-wrapper';
import grantOwnerAccess from './-private/grant-owner-access';
import isFunctionalComponent from './-private/is-functional-component';

const wrapReactComponent = (Klass) =>
  class extends EmberComponent {
    /* Add type annotation for private `attrs` property on component */
    getPropsForReact() {
      return Object.keys(this.attrs).reduce((acc, key) => {
        const value = get(this, key);

        acc[key] = value;

        return acc;
      }, {});
    }

    mountElement() {
      const props = this.getPropsForReact();
      let { children } = props;

      if (!children) {
        const childNodes = this.element.childNodes;
        children = [
          React.createElement(YieldWrapper, {
            key: get(this, 'elementId'),
            nodes: [...childNodes],
          }),
        ];
      }

      const KlassToRender = isFunctionalComponent(Klass)
        ? Klass
        : grantOwnerAccess(Klass, getOwner(this));

      ReactDOM.render(
        React.createElement(KlassToRender, props, children),
        this.element
      );
    }

    didUpdateAttrs() {
      schedule('render', () => this.mountElement());
    }

    didInsertElement() {
      super.didInsertElement();

      this.mountElement();
    }

    willDestroyElement() {
      ReactDOM.unmountComponentAtNode(this.element);

      super.willDestroyElement();
    }
  };

export default function WithEmberSupport(descriptor) {
  return descriptor.toString() === '[object Descriptor]'
    ? Object.assign({}, descriptor, {
        finisher(Klass) {
          return wrapReactComponent(Klass);
        },
      })
    : wrapReactComponent(descriptor);
}
