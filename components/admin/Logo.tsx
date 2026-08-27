import React from 'react';

/**
 * Admin logo — mirrors the marketing site header lockup
 * (components/layout/Header.tsx): solid accent tile, brand name,
 * pulsing accent dot.
 */
export const Logo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0' }}>
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: '12px',
          backgroundColor: '#1763cc',
          color: '#ffffff',
          fontWeight: 900,
          fontSize: '14px',
          letterSpacing: '-0.01em',
          boxShadow: '0 4px 6px -1px rgba(23, 99, 204, 0.2)',
        }}
      >
        TC
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: '#ffffff',
            lineHeight: 1.1,
          }}
        >
          TechCentera
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '9999px',
              backgroundColor: '#1763cc',
              marginLeft: '3px',
            }}
          />
        </span>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 600,
            color: '#a3a3a3',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Enterprise CMS
        </span>
      </span>
    </div>
  );
};

export default Logo;
