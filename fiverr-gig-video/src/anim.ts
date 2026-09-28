import type React from 'react';
import {Easing, interpolate, spring} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Critically-damped entrance that lands exactly on 1 after `duration` frames,
// so anything that has finished animating is pixel-stable afterwards.
export const ease = (frame: number, delay: number, duration = 24) => {
  if (frame >= delay + duration) return 1;
  return spring({frame: frame - delay, fps: 30, durationInFrames: duration, config: {damping: 200}});
};

// Springy entrance with a little overshoot, for badges and chips.
export const pop = (frame: number, delay: number, duration = 26) => {
  if (frame >= delay + duration) return 1;
  return spring({frame: frame - delay, fps: 30, durationInFrames: duration, config: {damping: 12, mass: 0.7, stiffness: 140}});
};

// Fade + rise + de-blur, the house entrance style.
export const rise = (v: number, distance = 40): React.CSSProperties => ({
  opacity: interpolate(v, [0, 1], [0, 1], clamp),
  transform: `translateY(${(1 - v) * distance}px)`,
  filter: v < 1 ? `blur(${(1 - Math.min(v, 1)) * 10}px)` : undefined,
});

export const progress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {...clamp, easing: Easing.bezier(0.22, 1, 0.36, 1)});

// Background clock: runs at normal speed, then glides to a stop at `stopAt`
// so the final cover second is perfectly static.
export const settledClock = (frame: number, slowFrom: number, stopAt: number) => {
  if (frame <= slowFrom) return frame;
  const span = stopAt - slowFrom;
  const x = Math.min(frame - slowFrom, span) / span;
  // integral of (1 - smoothstep(x)) over [0, x], scaled by span
  const integral = x - (x * x * x - (x * x * x * x) / 2);
  return slowFrom + integral * span;
};
