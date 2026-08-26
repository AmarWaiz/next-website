import React from 'react';

export const Icon: React.FC = () => {
  return (
    <div
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #00E599 0%, #00B876 100%)',
        color: '#ffffff',
        fontWeight: 900,
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 10px rgba(0, 229, 153, 0.4)',
      }}
    >
      TC
    </div>
  );
};

export default Icon;
