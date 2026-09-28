import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {ease, pop, progress, rise} from './anim';
import {C, COPY, HEIGHT, WARM, WIDTH} from './config';
import {BODY, DISPLAY} from './fonts';
import {ArrowUp, Star} from './components/Icons';
import {Phone} from './components/Phone';
import {GradientText, Heading, RolePill} from './components/Ui';
import {FinanceApp} from './screens/FinanceApp';
import {FitnessApp} from './screens/FitnessApp';
import {FoodApp} from './screens/FoodApp';

// Every entrance below finishes by frame 42; from then on the cover is completely static.
export const COVER_SETTLE_FRAMES = 42;

// The gig cover. With no `frame` it renders its final, static state (used for the PNG).
// The layout is authored on a 1920x1080 stage and scaled to fit any output size
// (e.g. Fiverr's 1280x769), while the background always fills the whole frame.
export const Cover: React.FC<{frame?: number}> = ({frame = 999}) => {
  const {width, height} = useVideoConfig();
  const u = Math.min(width / WIDTH, height / HEIGHT);
  const screenP = progress(frame, 6, 40);

  const phones = [
    {key: 'fit', x: 1160, y: 250, rot: -10, w: 300, delay: 10, bg: '#F3F5FB', dark: true, el: <FitnessApp p={screenP} />},
    {key: 'food', x: 1600, y: 250, rot: 10, w: 300, delay: 14, bg: '#FFFFFF', dark: true, el: <FoodApp p={screenP} />},
    {key: 'fin', x: 1380, y: 170, rot: 0, w: 340, delay: 4, bg: '#0B0F2A', dark: false, el: <FinanceApp p={screenP} />},
  ];

  const chips = ['iOS', 'Android', 'Flutter', 'React Native'];

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{width: WIDTH, height: HEIGHT, position: 'relative', transform: `scale(${u})`, flexShrink: 0}}>
        {/* phones */}
        {phones.map((ph) => {
          const v = ease(frame, ph.delay, 28);
          return (
            <div
              key={ph.key}
              style={{
                position: 'absolute',
                left: ph.x - ph.w / 2,
                top: ph.y,
                opacity: Math.min(1, v * 1.5),
                transform: `translate(${(1 - v) * 220}px, ${(1 - v) * 80}px) rotate(${ph.rot * v}deg)`,
              }}
            >
              <Phone width={ph.w} screenBg={ph.bg} darkStatus={ph.dark} glow={ph.key === 'fin' ? 'rgba(124,92,255,0.5)' : undefined}>
                {ph.el}
              </Phone>
            </div>
          );
        })}

        {/* floating rating-style badge on the hero phone */}
        <div
          style={{
            position: 'absolute',
            left: 1540,
            top: 118,
            transform: `scale(${pop(frame, 14, 26)})`,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '16px 24px',
            borderRadius: 22,
            background: '#FFFFFF',
            boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
            fontFamily: DISPLAY,
            fontWeight: 800,
            fontSize: 28,
            color: '#0B1020',
          }}
        >
          <div style={{width: 44, height: 44, borderRadius: 14, background: WARM, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Star size={26} color="#fff" />
          </div>
          <div>
            <div style={{lineHeight: 1}}>Store-ready</div>
            <div style={{fontFamily: BODY, fontWeight: 500, fontSize: 18, color: '#5B6280', marginTop: 4}}>iOS & Android</div>
          </div>
        </div>

        {/* copy */}
        <div style={{position: 'absolute', left: 110, top: 0, bottom: 0, width: 900, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <div style={rise(ease(frame, 0, 20), -24)}>
            <RolePill label={COPY.role} />
          </div>
          <Heading size={94} style={{marginTop: 36, ...rise(ease(frame, 4, 24), 40)}}>
            {COPY.coverTitle[0]}
            <br />
            <GradientText>{COPY.coverTitle[1]}</GradientText>
          </Heading>

          <div style={{display: 'flex', alignItems: 'center', gap: 30, marginTop: 44, ...rise(ease(frame, 10, 24), 30)}}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                padding: '14px 30px 14px 22px',
                borderRadius: 30,
                background: WARM,
                boxShadow: '0 18px 44px rgba(255,120,60,0.45)',
                transform: `scale(${pop(frame, 12, 26)})`,
                transformOrigin: 'left center',
              }}
            >
              <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 108, lineHeight: 1, letterSpacing: -4, color: '#1A0E00'}}>{COPY.years}+</div>
              <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 34, lineHeight: 1.05, color: '#1A0E00'}}>
                YEARS
                <br />
                EXPERIENCE
              </div>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 12, width: 380}}>
              {chips.map((c, i) => {
                const v = pop(frame, 12 + i * 2, 24);
                return (
                  <div
                    key={c}
                    style={{
                      padding: '10px 20px',
                      borderRadius: 999,
                      background: C.glass,
                      border: `1.5px solid ${C.line}`,
                      fontFamily: BODY,
                      fontWeight: 600,
                      fontSize: 25,
                      color: C.ink,
                      transform: `scale(${v})`,
                      opacity: Math.min(v, 1),
                    }}
                  >
                    {c}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{marginTop: 48, ...rise(ease(frame, 18, 24), 30)}}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 16,
                padding: '22px 38px',
                borderRadius: 999,
                background: '#FFFFFF',
                color: '#0B1020',
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: 34,
                boxShadow: '0 20px 50px rgba(124,92,255,0.45)',
              }}
            >
              {COPY.cta}
              <span style={{width: 46, height: 46, borderRadius: 23, background: WARM, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(45deg)'}}>
                <ArrowUp size={26} color="#1A0E00" stroke={3} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
