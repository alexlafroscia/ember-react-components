import {
  Component as ReactComponent,
  createElement,
  DetailedReactHTMLElement,
  HTMLAttributes
} from 'react';

interface YieldWrapperProps {
  key: string;
  nodes: Node[];
}

/**
 * @see https://github.com/AltSchool/ember-cli-react/blob/78f8d09b1eab2d0b12cb4923a3dfd84d46b86f1d/addon/components/react-component.js
 * @hide
 */
export default class YieldWrapper extends ReactComponent<YieldWrapperProps> {
  el: HTMLElement | null = null;

  componentDidMount() {
    // Different with the integration guide, we avoid jQuery here
    const fragment = document.createDocumentFragment();
    for (let node of this.props.nodes) {
      fragment.appendChild(node);
    }

    // This replace the original DOM element
    const element = this.el!;
    element.parentNode!.replaceChild(fragment, element);
  }

  render(): DetailedReactHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement> {
    // This element is temporary. When this is mounted,
    // it will be replaced by the children nodes, handled by Ember.
    return createElement('span', {
      ref: el => (this.el = el)
    });
  }
}
