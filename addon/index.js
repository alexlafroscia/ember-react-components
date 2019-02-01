import EmberComponent from '@ember/component';
import { get } from '@ember/object';
import { schedule } from '@ember/runloop';
import { getOwner } from '@ember/application';

import React from 'react';
import ReactDOM from 'react-dom';

import YieldWrapper from './-private/yield-wrapper';
import grantOwnerAccess from './-private/grant-owner-access';
import componentIsFunctional from './-private/component-is-functional';

export default function WithEmberSupport(Klass) {
  return class extends EmberComponent {
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
            nodes: [...childNodes]
          })
        ];
      }

      let KlassToRender;

      if (componentIsFunctional(Klass)) {
        KlassToRender = Klass;
      } else {
        const owner = getOwner(this);
        KlassToRender = grantOwnerAccess(Klass, owner);
      }

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
}
