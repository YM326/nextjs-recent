import { Size } from '@defines/common/cssType';

export const sizeToCss = (size: Size): string => {
  if (typeof size === 'number') {
    return `${size}px`;
  }

  return `${size}`;
};
