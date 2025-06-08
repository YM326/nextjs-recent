'use client';

import { Color } from '@defines/common/color';
import { IconProps } from './iconDefines';

export default function InfoIcon(props: IconProps) {
  const { color = Color.CG70, size = 16 } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" vectorEffect="non-scaling-stroke" stroke={color} strokeWidth="1.2" />
      <path
        d="M12 10.5L12 16.5"
        vectorEffect="non-scaling-stroke"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7.5V7.6"
        vectorEffect="non-scaling-stroke"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
