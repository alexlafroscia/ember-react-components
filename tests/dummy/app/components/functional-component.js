// BEGIN-SNIPPET functional-component.js
import React from 'react';
import WithEmberSupport from 'ember-react-components';

const componentStyle = bg => ({
  background: bg,
  color: 'white'
});

export default WithEmberSupport(function FunctionalComponent(props) {
  const { children } = props;

  return (
    <div style={componentStyle('red')}>
      This is part of the parent component
      <div style={componentStyle('blue')}>{children}</div>
    </div>
  );
});
// END-SNIPPET
