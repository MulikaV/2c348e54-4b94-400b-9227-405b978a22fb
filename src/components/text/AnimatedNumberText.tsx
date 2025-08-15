'use client';

import React, { memo } from 'react';
import { AnimateNumber } from 'motion-number';

interface AnimatedNumberTextProps {
  value: number;
  format?: Omit<Intl.NumberFormatOptions, "notation"> & {
    notation?: Exclude<Intl.NumberFormatOptions["notation"], "scientific" | "engineering">;
  };
  locales?: Intl.LocalesArgument;
  className?: string;
  suffix?: string;
  prefix?: string;
}

const AnimatedNumberText = ({
  value,
  format,
  locales = 'en-US',
  className = '',
  suffix,
  prefix
}: AnimatedNumberTextProps) => {
  return (
    <AnimateNumber
      format={format}
      locales={locales}
      className={className}
      suffix={suffix}
      prefix={prefix}
    >
      {value}
    </AnimateNumber>
  );
};

AnimatedNumberText.displayName = 'AnimatedNumberText';

export default memo(AnimatedNumberText);