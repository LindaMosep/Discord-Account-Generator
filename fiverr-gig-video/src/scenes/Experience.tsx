import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {ease, pop} from '../anim';
import {C, COPY} from '../config';
import {DISPLAY} from '../fonts';
import {Heading, Highlight, Label, MaskLine, RollingDigit, Scramble} from '../components/Ui';

const Marquee: React.FC<{frame: number; items: string[]}> = ({frame, items}) => {
  const enter = ease(frame, 20, 26);
  const x = -frame * 7 + (1 - enter) * 600;
  const row = [...items, ...items, ...items];
  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 90, overflow: 'hidden', opacity: enter}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 48, whiteSpace: 'nowrap', transform: `translateX(${x}px)`}}>
        {row.map((t, i) => (
          <React.Fragment key={i}>
            <span
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: 130,
                letterSpacing: -4,
                lineHeight: 1,
                color: i % 2 === 0 ? C.dim : C.ink,
              }}
            >
              {t}
            </span>
            <span style={{width: 26, height: 26, borderRadius: 13, background: C.accent, flexShrink: 0}} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const Experience: React.FC = () => {
  const frame = useCurrentFrame();
  const plus = pop(frame, 36, 26);
  const yrs = ease(frame, 30, 20);
  const shift = interpolate(frame, [0, 110], [0, -30]);

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 120, top: 70, transform: `translateX(${shift}px)`}}>
        <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 600, lineHeight: 1, letterSpacing: -30, color: C.ink, display: 'flex'}}>
          {String(COPY.years)
            .split('')
            .map((d, i) => (
              <RollingDigit key={i} digit={Number(d)} frame={frame} delay={2 + i * 4} duration={40} spins={2} />
            ))}
          <span style={{color: C.accent, display: 'inline-block', transform: `scale(${plus}) rotate(${(1 - plus) * -90}deg)`, opacity: Math.min(plus, 1)}}>+</span>
        </div>
        <div style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 64, letterSpacing: 18, color: C.muted, marginTop: -70, marginLeft: 24, opacity: yrs, transform: `translateY(${(1 - yrs) * 20}px)`}}>
          YEARS
        </div>
      </div>

      <div style={{position: 'absolute', left: 920, top: 150, width: 880}}>
        <Label>
          <Scramble text="Experience" frame={frame} delay={8} duration={18} />
        </Label>
        <Heading size={112} style={{marginTop: 36}}>
          <MaskLine frame={frame} delay={12}>
            of building
          </MaskLine>
          <MaskLine frame={frame} delay={18}>
            mobile apps for
          </MaskLine>
          <MaskLine frame={frame} delay={24} style={{paddingTop: 10}}>
            <Highlight frame={frame} delay={44} duration={18}>
              iOS & Android
            </Highlight>
          </MaskLine>
        </Heading>
      </div>

      <Marquee frame={frame} items={COPY.stack} />
    </AbsoluteFill>
  );
};
