import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../config';

// Film grain. The seed steps with `time`, so the grain flickers while the clock runs
// and freezes when the clock stops.
const Grain: React.FC<{seed: number}> = ({seed}) => (
  <AbsoluteFill style={{opacity: 0.09, mixBlendMode: 'screen'}}>
    <svg width="100%" height="100%">
      <filter id={`grain-${seed}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={seed} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
    </svg>
  </AbsoluteFill>
);

// `time` is in frames. The video feeds it an eased clock that comes to rest before
// the final second, so the closing cover frame is completely still.
export const Background: React.FC<{time: number}> = ({time}) => {
  const drift = Math.sin(time / 90) * 4;
  return (
    <AbsoluteFill style={{background: C.bg, overflow: 'hidden'}}>
      {/* soft overhead light, neutral and barely there */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 55% at ${58 + drift}% 0%, rgba(243,240,232,0.07) 0%, transparent 70%)`,
        }}
      />
      {/* editorial column guides */}
      <AbsoluteFill style={{display: 'flex', justifyContent: 'space-between', padding: '0 140px'}}>
        {Array.from({length: 7}).map((_, i) => (
          <div key={i} style={{width: 1, height: '100%', background: 'rgba(243,240,232,0.035)'}} />
        ))}
      </AbsoluteFill>
      <Grain seed={Math.floor(time / 2) % 97} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%)'}} />
    </AbsoluteFill>
  );
};
