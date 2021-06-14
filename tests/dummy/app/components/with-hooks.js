import React, { useState } from 'react';
import WithEmberSupport from 'ember-react-components';

const HooksComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <React.Fragment>
      <p data-test="state">You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </React.Fragment>
  );
};

export default WithEmberSupport(HooksComponent);
