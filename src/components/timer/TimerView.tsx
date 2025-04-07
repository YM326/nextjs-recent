'use client';

import { useEffect, useRef, useState } from 'react';
import { TimerDefine } from '@utils/worker/timerWorker';

export default function TimerView() {
  const [time, setTime] = useState(0);
  const timerRef = useRef<Worker | null>(null);

  useEffect(() => {
    timerRef.current = new Worker(new URL('../../utils/worker/timerWorker.ts', import.meta.url));

    const handleMessage = (event: MessageEvent<number>) => {
      setTime(event.data);
    };

    timerRef.current!.addEventListener('message', handleMessage);

    return () => {
      timerRef.current?.terminate();
    };
  }, []);

  const handleClickStartTimer = () => {
    if (timerRef.current) {
      timerRef.current!.postMessage(TimerDefine.START);
    }
  };

  const handleClickStopTimer = () => {
    if (timerRef.current) {
      timerRef.current!.postMessage(TimerDefine.STOP);
    }
  };

  return (
    <>
      <span>{time}</span>
      <button onClick={handleClickStartTimer}>Timer Start</button>
      <button onClick={handleClickStopTimer}>Timer Stop</button>
    </>
  );
}
