import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {ease, pop, progress, rise} from '../anim';
import {C} from '../config';
import {BODY} from '../fonts';
import {Phone} from '../components/Phone';
import {GradientText, Heading} from '../components/Ui';
import {FinanceApp} from '../screens/FinanceApp';
import {FitnessApp} from '../screens/FitnessApp';
import {FoodApp} from '../screens/FoodApp';

type Slot = {
  key: string;
  label: string;
  color: string;
  delay: number;
  x: number;
  y: number;
  rot: number;
  width: number;
  z: number;
  bg: string;
  darkStatus: boolean;
  screen: (p: number) => React.ReactNode;
};

const SLOTS: Slot[] = [
  {key: 'fit', label: 'Health & Fitness', color: '#22C55E', delay: 14, x: -470, y: 60, rot: -8, width: 290, z: 1, bg: '#F3F5FB', darkStatus: true, screen: (p) => <FitnessApp p={p} />},
  {key: 'food', label: 'Food Delivery', color: C.orange, delay: 20, x: 470, y: 60, rot: 8, width: 290, z: 1, bg: '#FFFFFF', darkStatus: true, screen: (p) => <FoodApp p={p} />},
  {key: 'fin', label: 'Fintech Wallet', color: C.violet, delay: 6, x: 0, y: 20, rot: 0, width: 330, z: 2, bg: '#0B0F2A', darkStatus: false, screen: (p) => <FinanceApp p={p} />},
];

export const Portfolio: React.FC = () => {
  const frame = useCurrentFrame();
  const title = ease(frame, 0, 22);
  const push = interpolate(frame, [0, 150], [1, 1.05]);

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 70, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, ...rise(title, -30)}}>
        <div style={{fontFamily: BODY, fontWeight: 600, fontSize: 24, letterSpacing: 8, color: C.amber}}>PORTFOLIO SHOWCASE</div>
        <Heading size={68} style={{textAlign: 'center'}}>
          Apps designed to <GradientText>delight users</GradientText>
        </Heading>
      </div>

      <AbsoluteFill style={{transform: `scale(${push})`, transformOrigin: '50% 70%'}}>
        {SLOTS.map((s) => {
          const v = ease(frame, s.delay, 30);
          const p = progress(frame, s.delay + 8, s.delay + 80);
          const bob = Math.sin((frame + s.delay * 3) / 22) * 8;
          const h = (s.width * 760) / 360;
          const tag = pop(frame, s.delay + 30);
          return (
            <div
              key={s.key}
              style={{
                position: 'absolute',
                left: 960 + s.x - s.width / 2,
                top: 250 + s.y,
                zIndex: s.z,
                opacity: Math.min(1, v * 1.4),
                transform: `translateY(${(1 - v) * 500 + bob}px) rotate(${s.rot * v}deg)`,
              }}
            >
              <Phone width={s.width} screenBg={s.bg} darkStatus={s.darkStatus} glow={s.z === 2 ? 'rgba(124,92,255,0.45)' : undefined}>
                {s.screen(p)}
              </Phone>
              <div
                style={{
                  position: 'absolute',
                  top: h - 22,
                  left: '50%',
                  transform: `translateX(-50%) scale(${tag})`,
                  opacity: Math.min(tag, 1),
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 22px',
                  borderRadius: 999,
                  background: 'rgba(12,16,44,0.85)',
                  border: `1.5px solid ${C.line}`,
                  fontFamily: BODY,
                  fontWeight: 600,
                  fontSize: 24,
                  color: C.ink,
                  boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                }}
              >
                <span style={{width: 12, height: 12, borderRadius: 6, background: s.color}} />
                {s.label}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
