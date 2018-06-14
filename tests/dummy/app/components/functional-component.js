// BEGIN-SNIPPET functional-component.js
import React from 'react';
import WithEmberSupport from 'ember-cli-react';

export default WithEmberSupport(function FunctionalComponent(props) {
  const { name, children } = props;

  return (
    <div id="wrapper">
      <div data-test-name>{name}</div>
      {children}
    </div>
  );
});
// END-SNIPPET
