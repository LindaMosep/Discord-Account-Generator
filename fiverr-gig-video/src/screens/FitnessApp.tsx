import React from 'react';
import {interpolate} from 'remotion';
import {Bolt, Flame, Heart, Home, User, Chart, Clock} from '../components/Icons';
import {C} from '../config';
import {BODY, DISPLAY} from '../fonts';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Ring: React.FC<{r: number; color: string; value: number}> = ({r, color, value}) => {
  const c = 2 * Math.PI * r;
  return (
    <>
      <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(243,240,232,0.08)" strokeWidth={16} />
      <circle
        cx="90"
        cy="90"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={16}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value)}
        transform="rotate(-90 90 90)"
      />
    </>
  );
};

// "Pulse" — a concept health & fitness tracker.
export const FitnessApp: React.FC<{p: number}> = ({p}) => {
  const k = interpolate(p, [0, 0.85], [0, 1], clamp);
  const steps = Math.round(8432 * k);
  const bars = [0.45, 0.7, 0.55, 0.9, 0.65, 0.8, 1];

  return (
    <div style={{position: 'absolute', inset: 0, padding: '64px 22px 0', fontFamily: BODY, color: C.ink}}>
      <div style={{fontSize: 13, color: C.muted}}>Wednesday, 14 May</div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 30, letterSpacing: -1}}>Today</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,90,31,0.14)', color: C.hot, fontWeight: 700, fontSize: 13, borderRadius: 14, padding: '5px 10px'}}>
          <Flame size={15} color={C.hot} stroke={2.4} /> 12 day streak
        </div>
      </div>

      <div style={{marginTop: 16, background: C.surface2, borderRadius: 26, padding: 18, display: 'flex', alignItems: 'center', gap: 14}}>
        <svg width="150" height="150" viewBox="0 0 180 180">
          <Ring r={76} color={C.accent} value={0.82 * k} />
          <Ring r={56} color={C.hot} value={0.68 * k} />
          <Ring r={36} color={C.ink} value={0.9 * k} />
        </svg>
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          {[
            {l: 'Move', v: `${Math.round(540 * k)} kcal`, c: C.accent},
            {l: 'Exercise', v: `${Math.round(41 * k)} min`, c: C.hot},
            {l: 'Stand', v: `${Math.round(11 * k)}/12 h`, c: C.ink},
          ].map((s) => (
            <div key={s.l}>
              <div style={{fontSize: 11.5, color: C.muted}}>{s.l}</div>
              <div style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 17, color: s.c}}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display: 'flex', gap: 12, marginTop: 14}}>
        {[
          {l: 'Steps', v: steps.toLocaleString('en-US'), i: <Bolt size={18} color={C.accentInk} stroke={2.4} />, bg: C.accent},
          {l: 'Heart', v: `${Math.round(72 * k)} bpm`, i: <Heart size={18} color={C.ink} stroke={2.4} />, bg: C.hot},
        ].map((s) => (
          <div key={s.l} style={{flex: 1, background: C.surface2, borderRadius: 22, padding: 14}}>
            <div style={{width: 34, height: 34, borderRadius: 11, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{s.i}</div>
            <div style={{fontSize: 12, color: C.muted, marginTop: 10}}>{s.l}</div>
            <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 21}}>{s.v}</div>
          </div>
        ))}
      </div>

      <div style={{marginTop: 14, background: C.surface2, borderRadius: 24, padding: '14px 16px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 13}}>
          <span style={{fontWeight: 600}}>Weekly activity</span>
          <span style={{color: C.muted, display: 'flex', alignItems: 'center', gap: 4}}>
            <Clock size={13} color={C.muted} /> 7 days
          </span>
        </div>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: 12, height: 70, marginTop: 10}}>
          {bars.map((b, i) => {
            const h = interpolate(p, [0.15 + i * 0.06, 0.55 + i * 0.06], [0, b], clamp);
            return <div key={i} style={{flex: 1, height: `${h * 100}%`, borderRadius: 7, background: i === 6 ? C.accent : 'rgba(243,240,232,0.14)'}} />;
          })}
        </div>
      </div>

      <div style={{position: 'absolute', left: 16, right: 16, bottom: 22, height: 62, borderRadius: 22, background: C.surface2, display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <Home size={22} color={C.accent} />
        <Chart size={22} color={C.dim} />
        <Heart size={22} color={C.dim} />
        <User size={22} color={C.dim} />
      </div>
    </div>
  );
};
