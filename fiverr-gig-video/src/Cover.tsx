import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {ease, pop, progress} from './anim';
import {C, COPY, HEIGHT, WIDTH} from './config';
import {DISPLAY, MONO} from './fonts';
import {Phone} from './components/Phone';
import {Accent, Heading, Label, MaskLine} from './components/Ui';
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
    {key: 'fit', x: 1255, y: 250, rot: -8, w: 290, delay: 8, bg: '#0F0F0E', el: <FitnessApp p={screenP} />},
    {key: 'food', x: 1705, y: 250, rot: 8, w: 290, delay: 12, bg: '#121210', el: <FoodApp p={screenP} />},
    {key: 'fin', x: 1480, y: 175, rot: 0, w: 330, delay: 4, bg: '#111110', el: <FinanceApp p={screenP} />},
  ];

  const badge = pop(frame, 14, 26);

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{width: WIDTH, height: HEIGHT, position: 'relative', transform: `scale(${u})`, flexShrink: 0}}>
        {phones.map((ph) => {
          const v = ease(frame, ph.delay, 30);
          return (
            <div
              key={ph.key}
              style={{
                position: 'absolute',
                left: ph.x - ph.w / 2,
                top: ph.y,
                opacity: Math.min(1, v * 1.5),
                transform: `translateY(${(1 - v) * 360}px) rotate(${ph.rot * v + (1 - v) * 12}deg)`,
              }}
            >
              <Phone width={ph.w} screenBg={ph.bg} glow={ph.key === 'fin' ? C.accent : undefined}>
                {ph.el}
              </Phone>
            </div>
          );
        })}

        <div style={{position: 'absolute', left: 120, top: 0, bottom: 0, width: 980, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <MaskLine frame={frame} delay={0} duration={20}>
            <Label style={{fontSize: 32}}>{COPY.role}</Label>
          </MaskLine>

          <Heading size={132} style={{marginTop: 34}}>
            <MaskLine frame={frame} delay={3} duration={24}>
              {COPY.coverTitle[0]}
            </MaskLine>
            <MaskLine frame={frame} delay={8} duration={24}>
              {COPY.coverTitle[1].split(' ')[0]}{' '}
              <Accent style={{fontSize: '1.13em'}}>{COPY.coverTitle[1].split(' ').slice(1).join(' ')}</Accent>
            </MaskLine>
          </Heading>

          <div style={{display: 'flex', alignItems: 'center', gap: 40, marginTop: 50}}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                padding: '10px 34px 10px 26px',
                borderRadius: 26,
                background: C.accent,
                color: C.accentInk,
                transform: `scale(${badge}) rotate(${(1 - badge) * -6}deg)`,
                transformOrigin: 'left center',
                opacity: Math.min(1, badge),
              }}
            >
              <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 150, lineHeight: 1, letterSpacing: -8}}>{COPY.years}+</div>
              <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 40, lineHeight: 1.02, letterSpacing: -0.5}}>
                YEARS OF
                <br />
                EXPERIENCE
              </div>
            </div>
            <div style={{fontFamily: MONO, fontSize: 30, lineHeight: 1.7, color: C.muted}}>
              {['Swift · Kotlin', 'Flutter', 'React Native'].map((t, i) => {
                const v = ease(frame, 16 + i * 4, 18);
                return (
                  <div key={t} style={{opacity: v, transform: `translateX(${(1 - v) * 30}px)`}}>
                    {t}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
