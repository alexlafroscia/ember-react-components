import React from 'react';
import WithEmberSupport from 'ember-react-components';

const ArrowFunctionComponent = ({ children, name }) => {
  return (
    <div id="wrapper">
      <div data-test-name>{name}</div>
      {children}
    </div>
  );
};

export default WithEmberSupport(ArrowFunctionComponent);
