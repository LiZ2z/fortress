import React from 'react';
import Skills from './modules/skills';

const App: React.FC = () => {
  return (
    <div>
      <h1>This is us</h1>

      <div>
        <h3>skill</h3>
        <Skills />
      </div>
    </div>
  );
};

export default React.memo(App);
