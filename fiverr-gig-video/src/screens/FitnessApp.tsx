import React from 'react';
import {interpolate} from 'remotion';
import {Bolt, Flame, Heart, Home, User, Chart, Clock} from '../components/Icons';
import {BODY, DISPLAY} from '../fonts';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Ring: React.FC<{r: number; color: string; value: number; track: string}> = ({r, color, value, track}) => {
  const c = 2 * Math.PI * r;
  return (
    <>
      <circle cx="90" cy="90" r={r} fill="none" stroke={track} strokeWidth={16} />
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
    <div style={{position: 'absolute', inset: 0, padding: '64px 22px 0', fontFamily: BODY, color: '#0B1020'}}>
      <div style={{fontSize: 13, color: '#7A8199'}}>Wednesday, 14 May</div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 28}}>Today</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 5, background: '#FFF1E8', color: '#FF6A3D', fontWeight: 700, fontSize: 13, borderRadius: 14, padding: '5px 10px'}}>
          <Flame size={15} color="#FF6A3D" stroke={2.4} /> 12 day streak
        </div>
      </div>

      <div style={{marginTop: 16, background: '#fff', borderRadius: 26, padding: 18, display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 10px 30px rgba(20,30,80,0.08)'}}>
        <svg width="150" height="150" viewBox="0 0 180 180">
          <Ring r={76} color="#FF3D71" track="#FFE3EA" value={0.82 * k} />
          <Ring r={56} color="#22C55E" track="#DDF7E6" value={0.68 * k} />
          <Ring r={36} color="#22D3EE" track="#D8F7FC" value={0.9 * k} />
        </svg>
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          {[
            {l: 'Move', v: `${Math.round(540 * k)} kcal`, c: '#FF3D71'},
            {l: 'Exercise', v: `${Math.round(41 * k)} min`, c: '#22C55E'},
            {l: 'Stand', v: `${Math.round(11 * k)}/12 h`, c: '#0EA5C6'},
          ].map((s) => (
            <div key={s.l}>
              <div style={{fontSize: 11.5, color: '#7A8199'}}>{s.l}</div>
              <div style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 16, color: s.c}}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display: 'flex', gap: 12, marginTop: 14}}>
        {[
          {l: 'Steps', v: steps.toLocaleString('en-US'), i: <Bolt size={18} color="#7C5CFF" stroke={2.4} />, bg: '#EFEBFF'},
          {l: 'Heart', v: `${Math.round(72 * k)} bpm`, i: <Heart size={18} color="#FF3D71" stroke={2.4} />, bg: '#FFE8EE'},
        ].map((s) => (
          <div key={s.l} style={{flex: 1, background: '#fff', borderRadius: 22, padding: 14, boxShadow: '0 10px 30px rgba(20,30,80,0.06)'}}>
            <div style={{width: 34, height: 34, borderRadius: 11, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{s.i}</div>
            <div style={{fontSize: 12, color: '#7A8199', marginTop: 10}}>{s.l}</div>
            <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 20}}>{s.v}</div>
          </div>
        ))}
      </div>

      <div style={{marginTop: 14, background: '#0B1020', color: '#fff', borderRadius: 24, padding: '14px 16px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 13}}>
          <span style={{fontWeight: 600}}>Weekly activity</span>
          <span style={{color: '#8E96C2', display: 'flex', alignItems: 'center', gap: 4}}>
            <Clock size={13} color="#8E96C2" /> 7 days
          </span>
        </div>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: 12, height: 70, marginTop: 10}}>
          {bars.map((b, i) => {
            const h = interpolate(p, [0.15 + i * 0.06, 0.55 + i * 0.06], [0, b], clamp);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h * 100}%`,
                  borderRadius: 7,
                  background: i === 6 ? 'linear-gradient(180deg,#22D3EE,#7C5CFF)' : 'rgba(255,255,255,0.18)',
                }}
              />
            );
          })}
        </div>
      </div>

      <div style={{position: 'absolute', left: 16, right: 16, bottom: 22, height: 62, borderRadius: 22, background: '#fff', display: 'flex', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0 10px 30px rgba(20,30,80,0.1)'}}>
        <Home size={22} color="#7C5CFF" />
        <Chart size={22} color="#B3B8CC" />
        <Heart size={22} color="#B3B8CC" />
        <User size={22} color="#B3B8CC" />
      </div>
    </div>
  );
};
