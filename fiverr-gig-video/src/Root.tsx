import React from 'react';
import {AbsoluteFill, Composition, Still} from 'remotion';
import './fonts';
import {FPS, HEIGHT, WIDTH} from './config';
import {Background} from './components/Background';
import {Cover} from './Cover';
import {GigVideo, STILL_FROM, VIDEO_FRAMES} from './GigVideo';
import {settledClock} from './anim';

// The still cover uses the exact background state the video settles on.
const FINAL_TIME = settledClock(VIDEO_FRAMES, STILL_FROM - 50, STILL_FROM);

const CoverStill: React.FC = () => (
  <AbsoluteFill>
    <Background time={FINAL_TIME} />
    <Cover />
  </AbsoluteFill>
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="GigVideo" component={GigVideo} durationInFrames={VIDEO_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    {/* Fiverr's recommended gig image size */}
    <Still id="GigCover" component={CoverStill} width={1280} height={769} />
    <Still id="GigCoverHD" component={CoverStill} width={WIDTH} height={HEIGHT} />
  </>
);
