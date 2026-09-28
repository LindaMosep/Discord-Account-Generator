import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {ease, progress} from '../anim';
import {C} from '../config';
import {DISPLAY, MONO} from '../fonts';
import {Phone, PHONE_H, PHONE_W} from '../components/Phone';
import {Accent, Heading, Label, MaskLine, Scramble, SplitChars} from '../components/Ui';
import {FinanceApp} from '../screens/FinanceApp';
import {FitnessApp} from '../screens/FitnessApp';
import {FoodApp} from '../screens/FoodApp';

const APPS = [
  {name: 'Fintech wallet', bg: '#111110', screen: (p: number) => <FinanceApp p={p} />},
  {name: 'Fitness tracker', bg: '#0F0F0E', screen: (p: number) => <FitnessApp p={p} />},
  {name: 'Food delivery', bg: '#121210', screen: (p: number) => <FoodApp p={p} />},
];

const PW = 300;
const PH = (PW * PHONE_H) / PHONE_W;
const START = 16;
const STEP = 12;
// Which project the list highlights; it walks through all three while the phones play.
const activeAt = (frame: number) => Math.min(2, Math.max(0, Math.floor((frame - 40) / 30)));

export const Portfolio: React.FC = () => {
  const frame = useCurrentFrame();
  const active = activeAt(frame);
  const drift = interpolate(frame, [0, 150], [30, -30]);

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 140, top: 150, width: 640}}>
        <Label>
          <Scramble text="Portfolio" frame={frame} delay={2} duration={16} />
        </Label>
        <Heading size={156} style={{marginTop: 30}}>
          <MaskLine frame={frame} delay={4}>
            Selected
          </MaskLine>
          <MaskLine frame={frame} delay={10}>
            <Accent style={{fontSize: '1.14em'}}>work</Accent>
          </MaskLine>
        </Heading>

        <div style={{marginTop: 70}}>
          {APPS.map((a, i) => {
            const v = ease(frame, 24 + i * 6, 20);
            const on = i === active;
            const bar = ease(frame, 40 + i * 30, 12);
            return (
              <div key={a.name} style={{position: 'relative', padding: '20px 0', opacity: v}}>
                <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 2, background: C.line}}>
                  <div style={{height: '100%', width: `${v * 100}%`, background: C.dim}} />
                </div>
                <div style={{display: 'flex', alignItems: 'baseline', gap: 26, transform: `translateX(${on ? 18 * bar : 0}px)`}}>
                  <span style={{fontFamily: MONO, fontSize: 28, color: on ? C.accent : C.dim}}>0{i + 1}</span>
                  <SplitChars
                    text={a.name}
                    frame={frame}
                    delay={26 + i * 6}
                    stagger={1}
                    style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 54, letterSpacing: -1.5, color: on ? C.ink : C.muted}}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{position: 'absolute', left: 820, top: 0, right: 0, bottom: 0, perspective: 1600}}>
        {APPS.map((a, i) => {
          const d = START + i * STEP;
          const v = ease(frame, d, 34);
          const p = progress(frame, d + 10, d + 80);
          const bob = Math.sin((frame + i * 20) / 20) * 10;
          const on = i === active;
          const lift = ease(frame, 40 + i * 30, 14) - (i < 2 ? ease(frame, 40 + (i + 1) * 30, 14) : 0);
          const bright = 1 - 0.12 * ease(frame, 34, 14) + 0.12 * lift;
          return (
            <div
              key={a.name}
              style={{
                position: 'absolute',
                left: 20 + i * 330 + drift * (i - 1) * 0.5,
                top: 540 - PH / 2 + (i === 1 ? -30 : 30),
                opacity: Math.min(1, v * 1.5),
                transform: `translateY(${(1 - v) * 420 + bob - lift * 30}px) rotateY(${(1 - v) * -70}deg) rotateZ(${(1 - v) * 10}deg) scale(${1 + lift * 0.04})`,
                transformOrigin: 'center bottom',
                filter: bright < 1 ? `brightness(${bright})` : undefined,
              }}
            >
              <Phone width={PW} screenBg={a.bg} glow={on ? C.accent : undefined}>
                {a.screen(p)}
              </Phone>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
