export const TimerDefine = {
  START: 'START',
  STOP: 'STOP',
} as const;
export type TimerType = (typeof TimerDefine)[keyof typeof TimerDefine];

let sec = 0;
let intervalId: NodeJS.Timeout | null = null;
const handleMessage = (event: MessageEvent<TimerType>) => {
  if (event.data === TimerDefine.START) {
    if (intervalId) return;

    intervalId = setInterval(() => {
      sec += 1;
      postMessage(sec);
    }, 1000);
  } else if (event.data === TimerDefine.STOP) {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
};

// eslint-disable-next-line no-restricted-globals,@typescript-eslint/no-unused-expressions
typeof self === 'object' && self.addEventListener('message', handleMessage);
