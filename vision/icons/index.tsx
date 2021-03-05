import React from 'react';
import ReactDOM from 'react-dom';
import Icon from './dest';
import map from './dest/map';

const App = () => {
  return (
    <div className="wrap">
      {Object.keys(map).map((key) => (
        <Icon type={key} key={key} />
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
