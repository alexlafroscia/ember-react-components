// BEGIN-SNIPPET functional-component.js
import React from 'react';
import WithEmberSupport from 'ember-react-components';

export default WithEmberSupport(function FunctionalComponent(props) {
  const { name, children, ...rest } = props;

  return (
    <div id="wrapper" {...rest}>
      <div data-test-name>{name}</div>
      {children}
    </div>
  );
});
// END-SNIPPET
