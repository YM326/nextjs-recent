import css from 'styled-jsx/css';

export const commonFont = (size: string = '1rem', weight: number = 400) => css`
  font-size: ${size};
  font-weight: ${weight};
  line-height: 1.5;
`;
