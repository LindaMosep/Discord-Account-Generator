import React from 'react';

export const PHONE_W = 360;
export const PHONE_H = 760;

// A modern bezel-less phone. Screens are authored at 336x736 and the whole device is scaled to `width`.
export const Phone: React.FC<{
  width: number;
  screenBg: string;
  darkStatus?: boolean;
  glow?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({width, screenBg, darkStatus = false, glow, style, children}) => {
  const scale = width / PHONE_W;
  const statusColor = darkStatus ? '#0B1020' : '#FFFFFF';
  return (
    <div style={{width, height: PHONE_H * scale, position: 'relative', ...style}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: PHONE_W,
          height: PHONE_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          borderRadius: 58,
          background: 'linear-gradient(145deg, #3A3F55 0%, #12141F 45%, #2A2E40 100%)',
          padding: 12,
          boxSizing: 'border-box',
          boxShadow: `0 40px 80px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(255,255,255,0.12) inset${
            glow ? `, 0 0 120px ${glow}` : ''
          }`,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 46,
            overflow: 'hidden',
            background: screenBg,
          }}
        >
          {/* status bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 30px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 15,
              color: statusColor,
              zIndex: 5,
            }}
          >
            <span>9:41</span>
            <div style={{display: 'flex', gap: 5, alignItems: 'center'}}>
              {[6, 9, 12, 15].map((h) => (
                <div key={h} style={{width: 3.5, height: h, borderRadius: 2, background: statusColor}} />
              ))}
              <div
                style={{
                  marginLeft: 6,
                  width: 25,
                  height: 12,
                  borderRadius: 4,
                  border: `1.5px solid ${statusColor}`,
                  padding: 1.5,
                  boxSizing: 'border-box',
                }}
              >
                <div style={{width: '75%', height: '100%', borderRadius: 2, background: statusColor}} />
              </div>
            </div>
          </div>
          {/* dynamic island */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 104,
              height: 30,
              borderRadius: 20,
              background: '#000',
              zIndex: 6,
            }}
          />
          {children}
          {/* home indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: 9,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 120,
              height: 5,
              borderRadius: 3,
              background: statusColor,
              opacity: 0.6,
              zIndex: 6,
            }}
          />
          {/* glass reflection */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 35%)',
              pointerEvents: 'none',
              zIndex: 7,
            }}
          />
        </div>
      </div>
    </div>
  );
};
