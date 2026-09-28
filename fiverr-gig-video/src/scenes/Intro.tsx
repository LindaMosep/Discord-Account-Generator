import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {ease, pop, progress, rise} from '../anim';
import {C, COPY, WARM} from '../config';
import {BODY} from '../fonts';
import {GradientText, Heading, RolePill} from '../components/Ui';

const Words: React.FC<{text: string; start: number; frame: number; accent?: boolean}> = ({text, start, frame, accent}) => (
  <>
    {text.split(' ').map((w, i) => {
      const v = ease(frame, start + i * 4, 22);
      return (
        <span key={i} style={{display: 'inline-block', marginRight: '0.24em', ...rise(v, 60)}}>
          {accent ? <GradientText>{w}</GradientText> : w}
        </span>
      );
    })}
  </>
);

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const pill = ease(frame, 2, 20);
  const underline = progress(frame, 34, 56);
  const chips = ['iOS', 'Android', 'Cross-platform'];
  // gentle push-in for the whole scene
  const zoom = interpolate(frame, [0, 90], [1.04, 1]);

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', transform: `scale(${zoom})`}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 44}}>
        <div style={rise(pill, -30)}>
          <RolePill label={COPY.role} />
        </div>
        <Heading size={120} style={{textAlign: 'center'}}>
          <div>
            <Words text={COPY.headlineTop} start={8} frame={frame} />
          </div>
          <div style={{position: 'relative', display: 'inline-block'}}>
            <Words text={COPY.headlineAccent} start={22} frame={frame} accent />
            <svg
              width="100%"
              height="30"
              viewBox="0 0 800 30"
              preserveAspectRatio="none"
              style={{position: 'absolute', left: 0, bottom: -26}}
            >
              <path
                d="M8 20 C 200 4, 520 4, 792 16"
                stroke={C.amber}
                strokeWidth={8}
                fill="none"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - underline}
              />
            </svg>
          </div>
        </Heading>
        <div style={{display: 'flex', gap: 18, marginTop: 10}}>
          {chips.map((c, i) => {
            const v = pop(frame, 44 + i * 5);
            return (
              <div
                key={c}
                style={{
                  opacity: Math.min(v, 1),
                  transform: `scale(${0.6 + v * 0.4})`,
                  padding: '14px 30px',
                  borderRadius: 999,
                  fontFamily: BODY,
                  fontWeight: 600,
                  fontSize: 28,
                  color: i === 0 ? '#1A0E00' : C.ink,
                  background: i === 0 ? WARM : C.glass,
                  border: i === 0 ? 'none' : `1.5px solid ${C.line}`,
                }}
              >
                {c}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
