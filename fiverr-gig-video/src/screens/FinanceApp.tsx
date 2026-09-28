import React from 'react';
import {interpolate} from 'remotion';
import {ArrowDown, ArrowUp, Chart, Home, Plus, User} from '../components/Icons';
import {BODY, DISPLAY} from '../fonts';

// "Vaulta" — a concept fintech wallet. `p` (0..1) drives the in-screen animations.
export const FinanceApp: React.FC<{p: number}> = ({p}) => {
  const balance = interpolate(p, [0, 0.8], [0, 24562.8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const draw = interpolate(p, [0.1, 0.9], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pts = [60, 52, 58, 40, 46, 30, 36, 18, 24, 10];
  const path = pts.map((y, i) => `${i === 0 ? 'M' : 'L'}${i * 30} ${y}`).join(' ');

  const tx = [
    {name: 'Salary deposit', sub: 'Today, 09:12', amt: '+$4,200.00', up: true, c: '#22C55E'},
    {name: 'Coffee House', sub: 'Yesterday', amt: '-$6.40', up: false, c: '#FF6A3D'},
    {name: 'Groceries', sub: 'Mon, 18:30', amt: '-$82.15', up: false, c: '#7C5CFF'},
  ];

  return (
    <div style={{position: 'absolute', inset: 0, padding: '64px 22px 0', fontFamily: BODY, color: '#fff'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <div style={{fontSize: 13, color: '#8E96C2'}}>Good morning,</div>
          <div style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 21}}>Alex Morgan</div>
        </div>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            background: 'linear-gradient(135deg,#FFB547,#FF6A3D)',
          }}
        />
      </div>

      <div
        style={{
          marginTop: 20,
          borderRadius: 26,
          padding: '20px 20px 14px',
          background: 'linear-gradient(135deg,#7C5CFF 0%,#3B82F6 60%,#22D3EE 100%)',
          boxShadow: '0 18px 40px rgba(59,130,246,0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{position: 'absolute', right: -40, top: -40, width: 140, height: 140, borderRadius: 70, background: 'rgba(255,255,255,0.12)'}} />
        <div style={{fontSize: 13, opacity: 0.85}}>Total balance</div>
        <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 34, marginTop: 4, letterSpacing: -0.5}}>
          ${balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </div>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 12, fontWeight: 600, background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '3px 8px'}}>
          <ArrowUp size={12} color="#fff" stroke={3} /> 12.4% this month
        </div>
        <svg width="270" height="70" viewBox="0 0 270 70" style={{display: 'block', marginTop: 8}}>
          <path d={path} fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={draw} />
        </svg>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 20}}>
        {[
          {l: 'Send', i: <ArrowUp size={20} color="#fff" />},
          {l: 'Receive', i: <ArrowDown size={20} color="#fff" />},
          {l: 'Top up', i: <Plus size={20} color="#fff" />},
          {l: 'Stats', i: <Chart size={20} color="#fff" />},
        ].map((a) => (
          <div key={a.l} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7}}>
            <div style={{width: 56, height: 56, borderRadius: 18, background: '#1A2150', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.08)'}}>
              {a.i}
            </div>
            <div style={{fontSize: 12, color: '#B8BFE3'}}>{a.l}</div>
          </div>
        ))}
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 22, alignItems: 'baseline'}}>
        <div style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 17}}>Transactions</div>
        <div style={{fontSize: 12, color: '#7C8BFF'}}>See all</div>
      </div>
      {tx.map((t, i) => {
        const o = interpolate(p, [0.3 + i * 0.12, 0.55 + i * 0.12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <div key={t.name} style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 13, opacity: o, transform: `translateY(${(1 - o) * 12}px)`}}>
            <div style={{width: 42, height: 42, borderRadius: 14, background: `${t.c}26`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {t.up ? <ArrowDown size={18} color={t.c} stroke={2.5} /> : <ArrowUp size={18} color={t.c} stroke={2.5} />}
            </div>
            <div style={{flex: 1}}>
              <div style={{fontSize: 14, fontWeight: 600}}>{t.name}</div>
              <div style={{fontSize: 11.5, color: '#8E96C2', marginTop: 2}}>{t.sub}</div>
            </div>
            <div style={{fontSize: 14, fontWeight: 600, color: t.up ? '#4ADE80' : '#fff'}}>{t.amt}</div>
          </div>
        );
      })}

      <div style={{position: 'absolute', left: 16, right: 16, bottom: 22, height: 62, borderRadius: 22, background: '#141A42', display: 'flex', justifyContent: 'space-around', alignItems: 'center', border: '1px solid rgba(255,255,255,0.06)'}}>
        <Home size={22} color="#7C8BFF" />
        <Chart size={22} color="#5A628F" />
        <div style={{width: 44, height: 44, borderRadius: 16, background: 'linear-gradient(135deg,#7C5CFF,#3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Plus size={22} color="#fff" stroke={2.5} />
        </div>
        <ArrowUp size={22} color="#5A628F" />
        <User size={22} color="#5A628F" />
      </div>
    </div>
  );
};
