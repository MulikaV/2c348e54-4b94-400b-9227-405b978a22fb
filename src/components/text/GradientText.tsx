'use client';

import React, { memo } from 'react';

interface GradientTextProps {
  text: string;
  className?: string;
  ariaLabel?: string;
}

const GradientText = ({
  text,
  className = '',
  ariaLabel
}: GradientTextProps) => {
  return (
    <span 
      className={`gradient-text ${className}`}
      style={{
        backgroundImage: 'radial-gradient(47.08% 208.33% at 79.71% 128.33%, rgba(237, 125, 255, .8) 11.69%, rgba(108, 84, 255, .8) 35.44%, #1d1935 70.24%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block'
      }}
      aria-label={ariaLabel || text}
    >
      {text}
    </span>
  );
};

GradientText.displayName = 'GradientText';

export default memo(GradientText);