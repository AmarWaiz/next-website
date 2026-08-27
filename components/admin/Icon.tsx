import React from 'react';

/**
 * Compact admin icon — same accent tile as the site header logo mark.
 */
export const Icon: React.FC = () => {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
        borderRadius: '10px',
        backgroundColor: '#1763cc',
        color: '#ffffff',
        fontWeight: 900,
        fontSize: '12px',
        letterSpacing: '-0.01em',
        boxShadow: '0 4px 6px -1px rgba(23, 99, 204, 0.2)',
      }}
    >
      TC
    </span>
  );
};

export default Icon;
