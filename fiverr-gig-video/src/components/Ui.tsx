import React from 'react';
import {interpolate, random} from 'remotion';
import {ease} from '../anim';
import {C} from '../config';
import {DISPLAY, MONO, SERIF} from '../fonts';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Italic serif accent word in the accent color.
export const Accent: React.FC<{children: React.ReactNode; color?: string; style?: React.CSSProperties}> = ({
  children,
  color = C.accent,
  style,
}) => (
  <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, letterSpacing: 0, color, ...style}}>
    {children}
  </span>
);

export const Heading: React.FC<{children: React.ReactNode; size: number; style?: React.CSSProperties}> = ({
  children,
  size,
  style,
}) => (
  <div
    style={{
      fontFamily: DISPLAY,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 0.98,
      letterSpacing: -size * 0.035,
      color: C.ink,
      ...style,
    }}
  >
    {children}
  </div>
);

// A line of text that slides up from behind an invisible mask.
export const MaskLine: React.FC<{
  frame: number;
  delay: number;
  duration?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({frame, delay, duration = 26, children, style}) => {
  const v = ease(frame, delay, duration);
  return (
    <div style={{overflow: 'hidden', paddingBottom: '0.08em', marginBottom: '-0.08em', ...style}}>
      <div style={{transform: `translateY(${(1 - v) * 110}%) rotate(${(1 - v) * 4}deg)`, transformOrigin: 'left top'}}>
        {children}
      </div>
    </div>
  );
};

// Characters rise in one after another with a slight tilt.
export const SplitChars: React.FC<{text: string; frame: number; delay: number; stagger?: number; style?: React.CSSProperties}> = ({
  text,
  frame,
  delay,
  stagger = 1.6,
  style,
}) => (
  <span style={{display: 'inline-block', whiteSpace: 'pre', ...style}}>
    {text.split('').map((ch, i) => {
      const v = ease(frame, delay + i * stagger, 20);
      return (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: v,
            transform: `translateY(${(1 - v) * 0.6}em) rotate(${(1 - v) * 12}deg)`,
          }}
        >
          {ch}
        </span>
      );
    })}
  </span>
);

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>/';

// Text that decodes from random glyphs, left to right.
export const Scramble: React.FC<{text: string; frame: number; delay: number; duration?: number; style?: React.CSSProperties}> = ({
  text,
  frame,
  delay,
  duration = 24,
  style,
}) => {
  const p = interpolate(frame, [delay, delay + duration], [0, 1], clamp);
  const revealed = Math.floor(p * text.length);
  const visible = Math.ceil(interpolate(frame, [delay - 4, delay + duration * 0.4], [0, text.length], clamp));
  const out = text
    .split('')
    .map((ch, i) => {
      if (i >= visible) return '';
      if (i < revealed || ch === ' ') return ch;
      return GLYPHS[Math.floor(random(`${text}-${i}-${Math.floor(frame / 2)}`) * GLYPHS.length)];
    })
    .join('');
  return <span style={{fontFamily: MONO, whiteSpace: 'pre', ...style}}>{out}</span>;
};

// A marker-style highlight that sweeps across the text, flipping it to dark-on-accent.
export const Highlight: React.FC<{frame: number; delay: number; duration?: number; children: React.ReactNode}> = ({
  frame,
  delay,
  duration = 18,
  children,
}) => {
  const p = ease(frame, delay, duration);
  return (
    <span style={{position: 'relative', display: 'inline-block', padding: '0 0.12em', margin: '0 -0.04em'}}>
      <span>{children}</span>
      <span
        style={{
          position: 'absolute',
          inset: '0.06em 0 0.02em 0',
          padding: '0 0.12em',
          background: C.accent,
          color: C.accentInk,
          clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {children}
      </span>
    </span>
  );
};

// Slot-machine digit column that rolls up to `digit`.
export const RollingDigit: React.FC<{digit: number; frame: number; delay: number; duration?: number; spins?: number}> = ({
  digit,
  frame,
  delay,
  duration = 40,
  spins = 2,
}) => {
  const total = spins * 10 + digit;
  const v = ease(frame, delay, duration);
  const pos = v * total;
  return (
    <span style={{display: 'inline-block', height: '1em', overflow: 'hidden', verticalAlign: 'top', lineHeight: 1}}>
      <span style={{display: 'block', transform: `translateY(${-pos}em)`}}>
        {Array.from({length: total + 1}).map((_, i) => (
          <span key={i} style={{display: 'block', height: '1em'}}>
            {i % 10}
          </span>
        ))}
      </span>
    </span>
  );
};

// Words that roll vertically through a clipped slot, landing on the last one.
export const WordRotator: React.FC<{words: string[]; frame: number; start: number; every: number}> = ({
  words,
  frame,
  start,
  every,
}) => {
  const idx = Math.min(words.length - 1, Math.max(0, Math.floor((frame - start) / every)));
  const local = frame - start - idx * every;
  const t = frame < start ? 1 : ease(local, 0, 12);
  const enter = frame < start ? ease(frame, start - 20, 20) : 1;
  return (
    <span style={{display: 'inline-block', position: 'relative', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.1em'}}>
      <span style={{display: 'inline-block', visibility: 'hidden'}}>{words.reduce((a, b) => (b.length > a.length ? b : a))}</span>
      {idx > 0 && t < 1 ? (
        <span style={{position: 'absolute', left: 0, top: 0, transform: `translateY(${-t * 100}%)`, opacity: 1 - t}}>{words[idx - 1]}</span>
      ) : null}
      <span
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translateY(${idx === 0 ? (1 - enter) * 100 : (1 - t) * 100}%)`,
        }}
      >
        {words[idx]}
      </span>
    </span>
  );
};

// Small caps label with an accent dot.
export const Label: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 16,
      fontFamily: MONO,
      fontWeight: 500,
      fontSize: 28,
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: C.ink,
      ...style,
    }}
  >
    <span style={{width: 14, height: 14, borderRadius: 7, background: C.accent}} />
    {children}
  </div>
);
