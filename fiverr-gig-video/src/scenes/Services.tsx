import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {ease, pop, progress, rise} from '../anim';
import {C, COPY, GRADIENT, WARM} from '../config';
import {BODY, DISPLAY} from '../fonts';
import {Check, Rocket} from '../components/Icons';
import {GradientText, Heading} from '../components/Ui';

const STACK_COLORS = ['#F05138', '#7F52FF', '#02569B', '#61DAFB', '#FFCA28'];
const STEPS = ['Design', 'Develop', 'Test', 'Launch'];

export const Services: React.FC = () => {
  const frame = useCurrentFrame();
  const card = ease(frame, 10, 26);
  const bar = progress(frame, 34, 80);

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', gap: 90, alignItems: 'center'}}>
        <div style={{width: 860}}>
          <Heading size={80} style={rise(ease(frame, 0, 22), 40)}>
            Everything you need
            <br />
            to <GradientText>launch & grow</GradientText>
          </Heading>
          <div style={{display: 'flex', flexDirection: 'column', gap: 20, marginTop: 44}}>
            {COPY.services.map((s, i) => {
              const v = ease(frame, 8 + i * 5, 20);
              const c = pop(frame, 14 + i * 5);
              return (
                <div key={s} style={{display: 'flex', alignItems: 'center', gap: 22, ...rise(v, 24)}}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      background: C.green,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: `scale(${c})`,
                      boxShadow: '0 0 24px rgba(34,197,94,0.5)',
                    }}
                  >
                    <Check size={26} color="#fff" stroke={3.4} />
                  </div>
                  <div style={{fontFamily: BODY, fontWeight: 500, fontSize: 36, color: C.ink}}>{s}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            width: 620,
            padding: 44,
            borderRadius: 40,
            background: 'rgba(255,255,255,0.05)',
            border: `1.5px solid ${C.line}`,
            boxShadow: '0 40px 80px rgba(0,0,0,0.35)',
            opacity: card,
            transform: `translateY(${(1 - card) * 60}px) rotate(${(1 - card) * 4}deg)`,
          }}
        >
          <div style={{fontFamily: BODY, fontWeight: 600, fontSize: 22, letterSpacing: 6, color: C.muted}}>TECH STACK</div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 22}}>
            {COPY.stack.map((t, i) => {
              const v = pop(frame, 20 + i * 4);
              return (
                <div
                  key={t}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 22px',
                    borderRadius: 18,
                    background: 'rgba(255,255,255,0.07)',
                    border: `1.5px solid ${C.line}`,
                    fontFamily: DISPLAY,
                    fontWeight: 700,
                    fontSize: 28,
                    color: C.ink,
                    transform: `scale(${v})`,
                    opacity: Math.min(v, 1),
                  }}
                >
                  <span style={{width: 14, height: 14, borderRadius: 4, background: STACK_COLORS[i % STACK_COLORS.length]}} />
                  {t}
                </div>
              );
            })}
          </div>

          <div style={{height: 1.5, background: C.line, margin: '38px 0 30px'}} />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontFamily: BODY, fontWeight: 600, fontSize: 22, letterSpacing: 6, color: C.muted}}>DELIVERY</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: 22, color: C.amber}}>
              <Rocket size={24} color={C.amber} /> {Math.round(bar * 100)}%
            </div>
          </div>
          <div style={{height: 14, borderRadius: 7, background: 'rgba(255,255,255,0.08)', marginTop: 18, overflow: 'hidden'}}>
            <div style={{width: `${bar * 100}%`, height: '100%', borderRadius: 7, background: WARM}} />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 16}}>
            {STEPS.map((s, i) => {
              const done = bar >= (i + 1) / STEPS.length - 0.001;
              return (
                <div key={s} style={{display: 'flex', alignItems: 'center', gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: 22, color: done ? C.ink : C.muted}}>
                  <span style={{width: 10, height: 10, borderRadius: 5, background: done ? GRADIENT : 'rgba(255,255,255,0.2)'}} />
                  {s}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
