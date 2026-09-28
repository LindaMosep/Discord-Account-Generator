import React from 'react';
import {interpolate} from 'remotion';
import {ArrowDown, ArrowUp, Chart, Home, Plus, User} from '../components/Icons';
import {C} from '../config';
import {BODY, DISPLAY} from '../fonts';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// "Vaulta" — a concept fintech wallet. `p` (0..1) drives the in-screen animations.
export const FinanceApp: React.FC<{p: number}> = ({p}) => {
  const balance = interpolate(p, [0, 0.8], [0, 24562.8], clamp);
  const draw = interpolate(p, [0.1, 0.9], [1, 0], clamp);
  const pts = [60, 52, 58, 40, 46, 30, 36, 18, 24, 10];
  const path = pts.map((y, i) => `${i === 0 ? 'M' : 'L'}${i * 30} ${y}`).join(' ');

  const tx = [
    {name: 'Salary deposit', sub: 'Today, 09:12', amt: '+$4,200.00', up: true},
    {name: 'Coffee House', sub: 'Yesterday', amt: '-$6.40', up: false},
    {name: 'Groceries', sub: 'Mon, 18:30', amt: '-$82.15', up: false},
  ];

  return (
    <div style={{position: 'absolute', inset: 0, padding: '64px 22px 0', fontFamily: BODY, color: C.ink}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <div style={{fontSize: 13, color: C.muted}}>Good morning,</div>
          <div style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 22}}>Alex Morgan</div>
        </div>
        <div style={{width: 42, height: 42, borderRadius: 21, background: '#2A2925', border: `2px solid ${C.accent}`}} />
      </div>

      <div style={{marginTop: 20, borderRadius: 26, padding: '20px 20px 14px', background: C.accent, color: C.accentInk, position: 'relative', overflow: 'hidden'}}>
        <div style={{fontSize: 13, fontWeight: 500, opacity: 0.7}}>Total balance</div>
        <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 36, marginTop: 4, letterSpacing: -1}}>
          ${balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </div>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 12, fontWeight: 600, background: 'rgba(12,12,11,0.12)', borderRadius: 12, padding: '3px 8px'}}>
          <ArrowUp size={12} color={C.accentInk} stroke={3} /> 12.4% this month
        </div>
        <svg width="270" height="70" viewBox="0 0 270 70" style={{display: 'block', marginTop: 8}}>
          <path d={path} fill="none" stroke={C.accentInk} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={draw} />
        </svg>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 20}}>
        {[
          {l: 'Send', i: <ArrowUp size={20} color={C.ink} />},
          {l: 'Receive', i: <ArrowDown size={20} color={C.ink} />},
          {l: 'Top up', i: <Plus size={20} color={C.ink} />},
          {l: 'Stats', i: <Chart size={20} color={C.ink} />},
        ].map((a) => (
          <div key={a.l} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7}}>
            <div style={{width: 56, height: 56, borderRadius: 18, background: C.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{a.i}</div>
            <div style={{fontSize: 12, color: C.muted}}>{a.l}</div>
          </div>
        ))}
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 22, alignItems: 'baseline'}}>
        <div style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 18}}>Transactions</div>
        <div style={{fontSize: 12, color: C.accent}}>See all</div>
      </div>
      {tx.map((t, i) => {
        const o = interpolate(p, [0.3 + i * 0.12, 0.55 + i * 0.12], [0, 1], clamp);
        return (
          <div key={t.name} style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 13, opacity: o, transform: `translateY(${(1 - o) * 12}px)`}}>
            <div style={{width: 42, height: 42, borderRadius: 14, background: C.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {t.up ? <ArrowDown size={18} color={C.accent} stroke={2.5} /> : <ArrowUp size={18} color={C.muted} stroke={2.5} />}
            </div>
            <div style={{flex: 1}}>
              <div style={{fontSize: 14, fontWeight: 600}}>{t.name}</div>
              <div style={{fontSize: 11.5, color: C.muted, marginTop: 2}}>{t.sub}</div>
            </div>
            <div style={{fontSize: 14, fontWeight: 600, color: t.up ? C.accent : C.ink}}>{t.amt}</div>
          </div>
        );
      })}

      <div style={{position: 'absolute', left: 16, right: 16, bottom: 22, height: 62, borderRadius: 22, background: C.surface2, display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <Home size={22} color={C.accent} />
        <Chart size={22} color={C.dim} />
        <div style={{width: 44, height: 44, borderRadius: 16, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Plus size={22} color={C.accentInk} stroke={2.5} />
        </div>
        <ArrowUp size={22} color={C.dim} />
        <User size={22} color={C.dim} />
      </div>
    </div>
  );
};
