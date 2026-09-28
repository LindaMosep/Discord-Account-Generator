import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {ease, pop, progress, rise} from '../anim';
import {C, COPY, GRADIENT, WARM} from '../config';
import {BODY, DISPLAY} from '../fonts';
import {Check, Code, Layers, Phone} from '../components/Icons';
import {GradientText, Heading} from '../components/Ui';

const R = 230;
const CIRC = 2 * Math.PI * R;

export const Experience: React.FC = () => {
  const frame = useCurrentFrame();
  const ring = progress(frame, 4, 50);
  const count = Math.round(interpolate(ring, [0, 1], [0, COPY.years]));
  const plus = pop(frame, 46);
  const block = ease(frame, 6, 26);
  const icons = [Phone, Layers, Code];

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 90}}>
        <div style={{position: 'relative', width: 540, height: 540, ...rise(block, 0), transform: `scale(${0.85 + block * 0.15})`}}>
          <svg width="540" height="540" viewBox="0 0 540 540" style={{position: 'absolute', inset: 0}}>
            <defs>
              <linearGradient id="warm" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={C.amber} />
                <stop offset="100%" stopColor={C.orange} />
              </linearGradient>
            </defs>
            <circle cx="270" cy="270" r={R} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth={22} />
            <circle
              cx="270"
              cy="270"
              r={R}
              fill="none"
              stroke="url(#warm)"
              strokeWidth={22}
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - ring)}
              transform="rotate(-90 270 270)"
              style={{filter: 'drop-shadow(0 0 18px rgba(255,140,60,0.6))'}}
            />
          </svg>
          <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 250, lineHeight: 0.9, letterSpacing: -8, display: 'flex'}}>
              <GradientText gradient={WARM}>{count}</GradientText>
              <span style={{display: 'inline-block', transform: `scale(${plus})`, opacity: Math.min(plus, 1)}}>
                <GradientText gradient={WARM}>+</GradientText>
              </span>
            </div>
            <div style={{fontFamily: BODY, fontWeight: 600, fontSize: 30, letterSpacing: 8, color: C.muted, marginTop: 10}}>YEARS</div>
          </div>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 36, width: 900}}>
          <Heading size={82} style={rise(ease(frame, 14, 24), 40)}>
            Years of building
            <br />
            <GradientText>mobile apps</GradientText> that ship.
          </Heading>
          <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
            {COPY.pillars.map((p, i) => {
              const v = ease(frame, 30 + i * 7, 22);
              const Icon = icons[i];
              return (
                <div
                  key={p}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 22,
                    padding: '18px 26px',
                    borderRadius: 24,
                    background: C.glass,
                    border: `1.5px solid ${C.line}`,
                    opacity: v,
                    transform: `translateX(${(1 - v) * 80}px)`,
                  }}
                >
                  <div style={{width: 54, height: 54, borderRadius: 16, background: GRADIENT, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon size={28} color="#fff" stroke={2.2} />
                  </div>
                  <div style={{flex: 1, fontFamily: BODY, fontWeight: 600, fontSize: 36, color: C.ink}}>{p}</div>
                  <Check size={34} color={C.green} stroke={3} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
