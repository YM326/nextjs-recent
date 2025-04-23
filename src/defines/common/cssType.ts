export type Size =
  | number
  | `${number}`
  | `${number}px`
  | `${number}%`
  | `${number}rem`
  | `${number}em`
  | `${number}vh`
  | `${number}vw`
  | 'fit-content'
  | 'max-content'
  | 'normal';
