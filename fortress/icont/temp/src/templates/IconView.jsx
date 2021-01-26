import React, { useEffect, useState, useMemo } from 'react';
import Messenger from './Messenger';
import iconsMap from './iconsMap';

const IconView = () => {
  const [usedMap, setUsedMap] = useState(() => {
    try {
      const message = Messenger.getMessageFromCache();
      return JSON.parse(message) || {};
    } catch {
      return {};
    }
  });

  const iconsQueue = useMemo(() => Object.entries(iconsMap), []);

  const isUsed = key => {
    const usedCount = usedMap[key];
    return typeof usedCount !== 'undefined';
  };

  useEffect(() => {
    return Messenger.onMessage(message => {
      setUsedMap(JSON.parse(message));
    });
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9,
        overflow: 'auto',
      }}
    >
      {iconsQueue.map(([iconName, Icon]) => {
        const isIconUsed = isUsed(iconName);

        return (
          <div
            style={{
              width: '10%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              margin: '16px',
              background: isIconUsed ? '#cbffcb' : '#f1f1f1',
              padding: '28px 0 12px',
              borderRadius: 4,
              cursor: 'pointer',
            }}
            key={iconName}
          >
            <span style={{ fontSize: 38 }}>
              <i
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#777',
                  lineHeight: 1,
                  textAlign: 'center',
                  width: '1em',
                  height: '1em',
                }}
              >
                <Icon />
              </i>
            </span>

            <span style={{ fontSize: 16, whiteSpace: 'nowrap', marginTop: 20 }}>
              {iconName}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(IconView);
