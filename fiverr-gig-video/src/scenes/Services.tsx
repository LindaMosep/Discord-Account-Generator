import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {ease} from '../anim';
import {C, COPY} from '../config';
import {DISPLAY, MONO} from '../fonts';
import {Accent, Heading, MaskLine} from '../components/Ui';

// Pseudo-Swift, tokenised so it can be syntax-colored while it types out.
type Tok = [string, 'kw' | 'ty' | 'str' | 'pl' | 'cm'];
const CODE: Tok[][] = [
  [['// your idea → the App Store', 'cm']],
  [['struct ', 'kw'], ['YourApp', 'ty'], [': App {', 'pl']],
  [['  var ', 'kw'], ['platforms', 'pl'], [' = [.', 'pl'], ['iOS', 'ty'], [', .', 'pl'], ['android', 'ty'], [']', 'pl']],
  [['  var ', 'kw'], ['design', 'pl'], [' = ', 'pl'], ['"pixel-perfect"', 'str']],
  [['', 'pl']],
  [['  func ', 'kw'], ['launch', 'ty'], ['() ', 'pl'], ['async', 'kw'], [' {', 'pl']],
  [['    await ', 'kw'], ['build', 'ty'], ['()', 'pl']],
  [['    await ', 'kw'], ['test', 'ty'], ['()', 'pl']],
  [['    await ', 'kw'], ['ship', 'ty'], ['(to: .', 'pl'], ['stores', 'ty'], [')', 'pl']],
  [['  }', 'pl']],
  [['}', 'pl']],
];
const COLORS: Record<Tok[1], string> = {kw: C.hot, ty: C.accent, str: '#E8D8A8', pl: C.ink, cm: C.dim};
const TOTAL = CODE.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0) + 1, 0);

const CodeCard: React.FC<{frame: number}> = ({frame}) => {
  const enter = ease(frame, 6, 26);
  const typed = Math.floor(interpolate(frame, [18, 88], [0, TOTAL], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  let budget = typed;
  let caretLine = 0;
  const lines = CODE.map((line, li) => {
    if (budget >= 0) caretLine = li;
    const parts = line.map(([t, k], ti) => {
      const shown = t.slice(0, Math.max(0, budget));
      budget -= t.length;
      return (
        <span key={ti} style={{color: COLORS[k]}}>
          {shown}
        </span>
      );
    });
    budget -= 1;
    return parts;
  });
  const caretOn = Math.floor(frame / 8) % 2 === 0;

  return (
    <div
      style={{
        position: 'absolute',
        right: 140,
        top: 190,
        width: 760,
        borderRadius: 28,
        background: C.surface,
        border: `1.5px solid ${C.line}`,
        boxShadow: '0 50px 100px rgba(0,0,0,0.6)',
        opacity: enter,
        transform: `translateY(${(1 - enter) * 80}px) rotate(${(1 - enter) * 3}deg)`,
        overflow: 'hidden',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '20px 26px', borderBottom: `1.5px solid ${C.line}`}}>
        {[C.hot, C.accent, C.dim].map((c) => (
          <span key={c} style={{width: 14, height: 14, borderRadius: 7, background: c}} />
        ))}
        <span style={{marginLeft: 14, fontFamily: MONO, fontSize: 22, color: C.muted}}>YourApp.swift</span>
      </div>
      <div style={{padding: '24px 30px 30px', fontFamily: MONO, fontSize: 27, lineHeight: 1.6}}>
        {lines.map((parts, li) => (
          <div key={li} style={{display: 'flex', whiteSpace: 'pre', minHeight: '1.6em'}}>
            <span style={{width: 44, color: C.dim}}>{li + 1}</span>
            {parts}
            {li === caretLine && caretOn ? <span style={{width: 14, background: C.accent, marginLeft: 2}} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 140, top: 140, width: 900}}>
        <Heading size={128}>
          <MaskLine frame={frame} delay={0}>
            From idea
          </MaskLine>
          <MaskLine frame={frame} delay={6}>
            to <Accent style={{fontSize: '1.12em'}}>App Store.</Accent>
          </MaskLine>
        </Heading>

        <div style={{marginTop: 56}}>
          {COPY.services.map((s, i) => {
            const d = 14 + i * 6;
            const line = ease(frame, d, 22);
            return (
              <div key={s} style={{position: 'relative', padding: '16px 0'}}>
                <div style={{position: 'absolute', left: 0, top: 0, height: 2, width: `${line * 100}%`, background: C.line}} />
                <MaskLine frame={frame} delay={d + 2} duration={20}>
                  <div style={{display: 'flex', alignItems: 'baseline', gap: 28}}>
                    <span style={{fontFamily: MONO, fontSize: 26, color: C.accent}}>0{i + 1}</span>
                    <span style={{fontFamily: DISPLAY, fontWeight: 600, fontSize: 54, letterSpacing: -1.5, color: C.ink}}>{s}</span>
                  </div>
                </MaskLine>
              </div>
            );
          })}
        </div>
      </div>

      <CodeCard frame={frame} />
    </AbsoluteFill>
  );
};
