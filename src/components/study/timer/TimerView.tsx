'use client';

import { useEffect, useRef, useState } from 'react';
import { TimerDefine } from '@utils/worker/timerWorker';
import { Button } from '@components/common/button/Button';
import { commonFont } from '@utils/font';

export default function TimerView() {
  const [time, setTime] = useState(0);
  const timerRef = useRef<Worker | null>(null);

  useEffect(() => {
    timerRef.current = new Worker(new URL('../../../utils/worker/timerWorker.ts', import.meta.url));

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
      <div className={'timer-wrapper'}>
        <span>{time}</span>
        <Button onClick={handleClickStartTimer}>Timer Start</Button>
        <Button onClick={handleClickStopTimer}>Timer Stop</Button>
      </div>
      <style jsx>{`
        .timer-wrapper {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;

          span {
            ${commonFont('50px', 700)};
          }
        }
      `}</style>
    </>
  );
}
