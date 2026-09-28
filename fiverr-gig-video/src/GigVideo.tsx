import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {springTiming, TransitionSeries} from '@remotion/transitions';
import {ease, settledClock} from './anim';
import {Background} from './components/Background';
import {barWipe} from './components/BarWipe';
import {C} from './config';
import {MONO} from './fonts';
import {Cover, COVER_SETTLE_FRAMES} from './Cover';
import {Intro} from './scenes/Intro';
import {Experience} from './scenes/Experience';
import {Portfolio} from './scenes/Portfolio';
import {Services} from './scenes/Services';

export const SCENES = {intro: 92, experience: 100, portfolio: 142, services: 104, cover: 80};
export const TRANSITION = 18;
export const VIDEO_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b, 0) - TRANSITION * (Object.keys(SCENES).length - 1);

// Frame at which the closing cover (and background) come to a complete stop.
export const STILL_FROM = VIDEO_FRAMES - SCENES.cover + COVER_SETTLE_FRAMES;
const COVER_START = VIDEO_FRAMES - SCENES.cover;

const timing = springTiming({config: {damping: 200}, durationInFrames: TRANSITION});

// Scene start frames on the global timeline, for the HUD counter.
const STARTS = (() => {
  const d = Object.values(SCENES);
  const out: number[] = [];
  let t = 0;
  for (const len of d) {
    out.push(t);
    t += len - TRANSITION;
  }
  return out;
})();

// Corner HUD: role on the left, rolling scene counter on the right, progress line along the bottom.
// It fades out as the cover arrives so the final frame is only the cover.
const Hud: React.FC<{frame: number}> = ({frame}) => {
  const fade = 1 - ease(frame, COVER_START - 4, 16);
  const enter = ease(frame, 4, 20);
  const idx = STARTS.filter((s) => frame >= s + TRANSITION / 2).length; // 1-based, 1..5
  const scene = Math.min(idx, 4);
  const roll = ease(frame, STARTS[Math.max(0, scene - 1)] + TRANSITION / 2 - 6, 12);
  const bar = interpolate(frame, [0, COVER_START], [0, 1], {extrapolateRight: 'clamp'});
  if (fade <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: fade * enter, fontFamily: MONO, fontSize: 22, letterSpacing: 2, color: C.muted}}>
      <div style={{position: 'absolute', left: 140, top: 56, textTransform: 'uppercase'}}>iOS / Android / Cross-platform</div>
      <div style={{position: 'absolute', right: 140, top: 56, display: 'flex', gap: 10}}>
        <span style={{display: 'inline-block', height: 28, overflow: 'hidden', color: C.ink}}>
          <span style={{display: 'block', transform: `translateY(${(1 - roll) * 100}%)`}}>0{scene}</span>
        </span>
        <span>/ 04</span>
      </div>
      <div style={{position: 'absolute', left: 0, bottom: 0, height: 5, width: `${bar * 100}%`, background: C.accent}} />
    </AbsoluteFill>
  );
};

const CoverScene: React.FC = () => <Cover frame={useCurrentFrame()} />;

export const GigVideo: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Background time={settledClock(frame, STILL_FROM - 50, STILL_FROM)} />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES.intro}>
          <Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={barWipe()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES.experience}>
          <Experience />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={barWipe()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES.portfolio}>
          <Portfolio />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={barWipe()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES.services}>
          <Services />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={barWipe()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES.cover}>
          <CoverScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Hud frame={frame} />
    </AbsoluteFill>
  );
};
