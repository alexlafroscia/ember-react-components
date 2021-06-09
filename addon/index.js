/* eslint-disable ember/no-classic-components */
import EmberComponent from '@ember/component';
import { schedule } from '@ember/runloop';
import { getOwner } from '@ember/application';

import React from 'react';
import ReactDOM from 'react-dom';
import isObject from 'is-object';

import YieldWrapper from './-private/yield-wrapper';
import grantOwnerAccess from './-private/grant-owner-access';
import isFunctionalComponent from './-private/is-functional-component';

const wrapReactComponent = (Klass) =>
  class extends EmberComponent {
    /**
     * Add type annotation for private `attrs` property on component
     *
     * Accounts for possibility of passing HBS props as MutableCell objects.
     *
     * @private
     */
    getReactProps() {
      return Object.entries(this.attrs).reduce(
        (acc, [propName, propValue]) => ({
          ...acc,
          [propName]:
            isObject(propValue) && propValue.constructor.name === 'MutableCell'
              ? propValue.value
              : propValue,
        }),
        {}
      );
    }

    mountElement() {
      let { children, ...props } = this.getReactProps();

      if (!children) {
        const childNodes = this.element.childNodes;
        children = [
          React.createElement(YieldWrapper, {
            key: this.elementId,
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
