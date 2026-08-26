import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 0' }}>
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #00E599 0%, #00B876 100%)',
          color: '#ffffff',
          fontWeight: 900,
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 16px rgba(0, 229, 153, 0.45)',
        }}
      >
        TC
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.02em', color: 'inherit' }}>
          TechCentera<span style={{ color: '#00E599' }}>.</span>
        </span>
        <span style={{ fontSize: '10px', fontWeight: 700, color: '#00E599', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Enterprise CMS
        </span>
      </div>
    </div>
  );
};

export default Logo;
