import React from 'react';
import {AbsoluteFill} from 'remotion';
import type {TransitionPresentation, TransitionPresentationComponentProps} from '@remotion/transitions';
import {C} from '../config';

type Props = Record<string, never>;

// Scenes are transparent over a shared background, so the outgoing and incoming scenes get
// complementary clips, and a solid accent bar rides the seam between them.
const BarWipeComponent: React.FC<TransitionPresentationComponentProps<Props>> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  const edge = (1 - p) * 100; // seam position, % from the left
  if (presentationDirection === 'exiting') {
    return (
      <AbsoluteFill style={{clipPath: `inset(0 ${100 - edge}% 0 0)`}}>
        {children}
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{clipPath: `inset(0 0 0 ${edge}%)`}}>{children}</AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `calc(${edge}% - 28px)`,
          width: 56,
          background: C.accent,
          opacity: p > 0 && p < 1 ? 1 : 0,
        }}
      />
    </AbsoluteFill>
  );
};

export const barWipe = (): TransitionPresentation<Props> => ({component: BarWipeComponent, props: {}});
