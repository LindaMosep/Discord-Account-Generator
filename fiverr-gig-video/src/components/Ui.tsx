import React from 'react';
import {C, GRADIENT} from '../config';
import {BODY, DISPLAY} from '../fonts';
import {Phone as PhoneIcon} from './Icons';

export const GradientText: React.FC<{children: React.ReactNode; gradient?: string; style?: React.CSSProperties}> = ({
  children,
  gradient = GRADIENT,
  style,
}) => (
  <span
    style={{
      backgroundImage: gradient,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      ...style,
    }}
  >
    {children}
  </span>
);

export const RolePill: React.FC<{label: string; style?: React.CSSProperties; scale?: number}> = ({label, style, scale = 1}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12 * scale,
      padding: `${12 * scale}px ${26 * scale}px ${12 * scale}px ${14 * scale}px`,
      borderRadius: 999,
      background: C.glass,
      border: `1.5px solid ${C.line}`,
      color: C.ink,
      fontFamily: BODY,
      fontWeight: 600,
      fontSize: 22 * scale,
      letterSpacing: 3 * scale,
      textTransform: 'uppercase',
      backdropFilter: 'blur(12px)',
      ...style,
    }}
  >
    <span
      style={{
        width: 38 * scale,
        height: 38 * scale,
        borderRadius: '50%',
        background: GRADIENT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PhoneIcon size={20 * scale} color="#fff" stroke={2.4} />
    </span>
    {label}
  </div>
);

export const Heading: React.FC<{children: React.ReactNode; size: number; style?: React.CSSProperties}> = ({
  children,
  size,
  style,
}) => (
  <div
    style={{
      fontFamily: DISPLAY,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.05,
      letterSpacing: -size * 0.025,
      color: C.ink,
      ...style,
    }}
  >
    {children}
  </div>
);
