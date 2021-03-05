/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import fetch from './fetch';
import './style.css';
import useZoom from './useZoom';
import useMove from './useMove';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/icon/getList').then(({ data: res }) => {
      if (res.status === 'success') {
        setData(res.data);
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

  const zoomHandler = useZoom(updateIcon);
  const moveHandler = useMove(updateIcon);

  return (
    <div className="grid">
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
              <div className="inner-circle" />
            </div>

            <div
              aria-label="button"
              tabIndex={0}
              role="button"
              className="operation-sign"
              onMouseDown={moveHandler}
            >
              <div
                aria-label="button"
                tabIndex={0}
                role="button"
                className="operation-anchor"
                onMouseDown={zoomHandler}
              />
            </div>
          </div>
          <div className="icon-name">{item.basename}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
