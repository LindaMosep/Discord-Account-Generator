import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {ease, progress} from '../anim';
import {C, COPY} from '../config';
import {MONO, SERIF} from '../fonts';
import {Heading, Label, MaskLine, Scramble, WordRotator} from '../components/Ui';

// Eight-point asterisk used as a spinning accent mark.
const Asterisk: React.FC<{size: number; rotate: number; scale: number}> = ({size, rotate, scale}) => (
  <svg width={size} height={size} viewBox="-50 -50 100 100" style={{transform: `rotate(${rotate}deg) scale(${scale})`}}>
    {Array.from({length: 4}).map((_, i) => (
      <rect key={i} x={-7} y={-48} width={14} height={96} rx={7} fill={C.accent} transform={`rotate(${i * 45})`} />
    ))}
  </svg>
);

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 100], [1.035, 1]);
  const line = progress(frame, 40, 70);
  const star = ease(frame, 30, 30);
  const foot = ease(frame, 50, 20);

  return (
    <AbsoluteFill style={{transform: `scale(${zoom})`, padding: '140px 140px 0'}}>
      <Label>
        <Scramble text={`${COPY.role} / ${COPY.years}+ yrs`} frame={frame} delay={2} duration={26} />
      </Label>

      <Heading size={196} style={{marginTop: 50}}>
        <MaskLine frame={frame} delay={6}>
          {COPY.introLines[0]}
        </MaskLine>
        <MaskLine frame={frame} delay={12}>
          {COPY.introLines[1]}
        </MaskLine>
        <MaskLine frame={frame} delay={18}>
          <span>that </span>
          <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, color: C.accent, fontSize: '1.12em', letterSpacing: 0}}>
            <WordRotator words={COPY.introRotator} frame={frame} start={30} every={16} />
          </span>
        </MaskLine>
      </Heading>

      <div style={{position: 'absolute', right: 170, top: 330}}>
        <Asterisk size={250} rotate={frame * 2.2 - (1 - star) * 90} scale={star} />
      </div>

      <div style={{position: 'absolute', left: 140, right: 140, bottom: 110}}>
        <div style={{height: 2, background: C.line}}>
          <div style={{height: '100%', width: `${line * 100}%`, background: C.ink}} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 24,
            fontFamily: MONO,
            fontSize: 28,
            color: C.muted,
            opacity: foot,
            transform: `translateY(${(1 - foot) * 20}px)`,
          }}
        >
          <span>iOS · Android · Cross-platform</span>
          <span style={{color: C.ink}}>Available for new projects</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
