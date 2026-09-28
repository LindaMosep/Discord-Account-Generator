import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {springTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {settledClock} from './anim';
import {Background} from './components/Background';
import {Cover, COVER_SETTLE_FRAMES} from './Cover';
import {Intro} from './scenes/Intro';
import {Experience} from './scenes/Experience';
import {Portfolio} from './scenes/Portfolio';
import {Services} from './scenes/Services';

export const SCENES = {intro: 84, experience: 96, portfolio: 144, services: 96, cover: 80};
export const TRANSITION = 16;
export const VIDEO_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b, 0) - TRANSITION * (Object.keys(SCENES).length - 1);

// Frame at which the closing cover (and background) come to a complete stop.
export const STILL_FROM = VIDEO_FRAMES - SCENES.cover + COVER_SETTLE_FRAMES;

const timing = springTiming({config: {damping: 200}, durationInFrames: TRANSITION});

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
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES.experience}>
          <Experience />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES.portfolio}>
          <Portfolio />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES.services}>
          <Services />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES.cover}>
          <CoverScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
