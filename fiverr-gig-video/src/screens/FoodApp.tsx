import React from 'react';
import {interpolate} from 'remotion';
import {Clock, Heart, Home, Search, Star, User, Plus} from '../components/Icons';
import {C} from '../config';
import {BODY, DISPLAY} from '../fonts';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Abstract top-down "dish" illustration built from layered gradients.
const Dish: React.FC<{size: number; a: string; b: string; c: string}> = ({size, a, b, c}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: '#EDE9DF',
      boxShadow: '0 12px 24px rgba(0,0,0,0.35)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <div
      style={{
        width: size * 0.78,
        height: size * 0.78,
        borderRadius: '50%',
        background: `radial-gradient(circle at 35% 35%, ${a} 0 18%, transparent 19%), radial-gradient(circle at 65% 40%, ${b} 0 14%, transparent 15%), radial-gradient(circle at 48% 66%, ${c} 0 16%, transparent 17%), radial-gradient(circle, #E9C48A 0%, #C9974F 100%)`,
      }}
    />
  </div>
);

// "Munch" — a concept food-delivery app.
export const FoodApp: React.FC<{p: number}> = ({p}) => {
  const cats = ['Popular', 'Burgers', 'Sushi', 'Healthy'];
  const hero = interpolate(p, [0, 0.5], [0, 1], clamp);
  const items = [
    {n: 'Green Bowl Co.', t: '15–20 min', r: '4.9', d: ['#7FA650', '#C4453A', '#E8C547']},
    {n: 'Tokyo Roll Bar', t: '20–25 min', r: '4.8', d: ['#E07B3C', '#F3F0E8', '#5E8C61']},
  ];

  return (
    <div style={{position: 'absolute', inset: 0, padding: '64px 20px 0', fontFamily: BODY, color: C.ink}}>
      <div style={{fontSize: 12.5, color: C.muted}}>Deliver to</div>
      <div style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 19}}>221 Baker Street</div>
      <div style={{marginTop: 14, height: 46, borderRadius: 16, background: C.surface2, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', color: C.muted, fontSize: 14}}>
        <Search size={18} color={C.muted} /> Search dishes, restaurants
      </div>

      <div style={{display: 'flex', gap: 8, marginTop: 14}}>
        {cats.map((c, i) => (
          <div
            key={c}
            style={{
              padding: '8px 13px',
              borderRadius: 14,
              fontSize: 13,
              fontWeight: 600,
              background: i === 0 ? C.hot : C.surface2,
              color: i === 0 ? '#fff' : C.muted,
            }}
          >
            {c}
          </div>
        ))}
      </div>

      <div style={{marginTop: 16, borderRadius: 26, height: 170, background: C.hot, position: 'relative', overflow: 'hidden', color: '#fff', padding: 18, boxSizing: 'border-box'}}>
        <div style={{fontSize: 12, fontWeight: 600, background: 'rgba(0,0,0,0.18)', display: 'inline-block', borderRadius: 10, padding: '3px 8px'}}>Today only</div>
        <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 27, lineHeight: 1, marginTop: 8, width: 150, letterSpacing: -0.5}}>30% off your first order</div>
        <div style={{marginTop: 10, fontSize: 12.5, fontWeight: 700, background: C.bg, color: '#fff', display: 'inline-block', borderRadius: 12, padding: '6px 12px'}}>Order now</div>
        <div style={{position: 'absolute', right: -26, top: 20, transform: `rotate(${hero * 40 - 20}deg) scale(${0.7 + hero * 0.3})`}}>
          <Dish size={150} a="#B8323A" b="#6E9E3A" c="#E8C547" />
        </div>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 18, alignItems: 'baseline'}}>
        <div style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 18}}>Near you</div>
        <div style={{fontSize: 12, color: C.hot, fontWeight: 600}}>See all</div>
      </div>
      {items.map((it, i) => {
        const o = interpolate(p, [0.3 + i * 0.15, 0.6 + i * 0.15], [0, 1], clamp);
        return (
          <div
            key={it.n}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 12,
              padding: 10,
              borderRadius: 20,
              background: C.surface2,
              opacity: o,
              transform: `translateX(${(1 - o) * 30}px)`,
            }}
          >
            <Dish size={58} a={it.d[0]} b={it.d[1]} c={it.d[2]} />
            <div style={{flex: 1}}>
              <div style={{fontSize: 14.5, fontWeight: 700}}>{it.n}</div>
              <div style={{display: 'flex', gap: 10, fontSize: 12, color: C.muted, marginTop: 4, alignItems: 'center'}}>
                <span style={{display: 'flex', alignItems: 'center', gap: 3}}>
                  <Star size={13} color={C.accent} /> {it.r}
                </span>
                <span style={{display: 'flex', alignItems: 'center', gap: 3}}>
                  <Clock size={13} color={C.muted} /> {it.t}
                </span>
              </div>
            </div>
            <div style={{width: 32, height: 32, borderRadius: 11, background: C.hot, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Plus size={18} color="#fff" stroke={2.6} />
            </div>
          </div>
        );
      })}

      <div style={{position: 'absolute', left: 16, right: 16, bottom: 22, height: 62, borderRadius: 22, background: C.surface2, display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <Home size={22} color={C.hot} />
        <Search size={22} color={C.dim} />
        <Heart size={22} color={C.dim} />
        <User size={22} color={C.dim} />
      </div>
    </div>
  );
};
