/* eslint-disable react/no-danger */
import React, { useEffect, useReducer, useRef, useState } from 'react';
import './style.css';
import fetch from './fetch';
import useOptimize from './useOptimize';

const App = () => {
  const [data, setData] = useState([]);
  const [key, reset] = useReducer((v) => v + 1, 0);
  const ref = useRef(null);

  useEffect(() => {
    fetch('/icon/getList').then(({ data: res }) => {
      if (res.status === 'success') {
        setData(res.data);
        reset();
      }
    });
  }, []);

  const updateIcon = (content, filename, basename) => {
    fetch('/icon/update', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        filename,
        basename,
        content,
      }),
    });
  };

  useOptimize(ref, key);

  return (
    <div className="grid" key={key} ref={ref}>
      {data.map((item) => (
        <div className="grid-item" key={item.filename}>
          <div className="operation-area">
            <div
              dangerouslySetInnerHTML={{ __html: item.content }}
              className="icon"
              data-svg-filename={item.filename}
              data-svg-basename={item.basename}
            />

            <div className="signs">
              <div className="outter-circle" />
            </div>
          </div>
          <div className="icon-name">{item.basename}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
