import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../config';

const Orb: React.FC<{
  color: string;
  size: number;
  x: number;
  y: number;
  opacity: number;
}> = ({color, size, x, y, opacity}) => (
  <div
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}%`,
      aspectRatio: '1',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
      opacity,
    }}
  />
);

// `time` is in frames. The video feeds it an eased clock that comes to rest before
// the final second, so the closing cover frame is completely still.
export const Background: React.FC<{time: number}> = ({time}) => {
  const t = time / 30;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 70% 10%, ${C.bg2} 0%, ${C.bg} 60%)`,
        overflow: 'hidden',
      }}
    >
      <Orb color="rgba(124,92,255,0.55)" size={70} x={78 + Math.sin(t * 0.5) * 6} y={20 + Math.cos(t * 0.4) * 8} opacity={0.9} />
      <Orb color="rgba(34,211,238,0.35)" size={55} x={12 + Math.cos(t * 0.45) * 7} y={85 + Math.sin(t * 0.35) * 6} opacity={0.8} />
      <Orb color="rgba(255,106,61,0.22)" size={45} x={45 + Math.sin(t * 0.3) * 10} y={110} opacity={0.9} />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          backgroundPosition: `${(t * 6) % 64}px ${(t * 6) % 64}px`,
          opacity: 0.35,
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 0%, transparent 75%)',
        }}
      />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(3,5,18,0.65) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
