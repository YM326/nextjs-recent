'use client';

import { useCallback, UIEvent, useRef, useState } from 'react';
import { DebouncedFunc, throttle } from 'lodash-es';
import { Color } from '@defines/common/color';

export default function VirtualScrollView() {
  const [nowScrollY, setNowScrollY] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const windowHeight = window.innerHeight;
  const randomCards = useRef(Array.from({ length: 200 }, () => parseInt(String(Math.random() * 100), 10) % 3)).current;

  // const onScroll = useCallback<DebouncedFunc<() => void>>(
  //   throttle(() => {
  //     setNowScrollY(wrapperRef.current.scrollHeight);
  //   }, 300) as DebouncedFunc<() => void>,
  //   [],
  // );

  // useEffect(() => {
  //   wrapperRef.current.addEventListener('scroll', onScroll);
  //
  //   return () => {
  //     wrapperRef.current.removeEventListener('scroll', onScroll);
  //   };
  // }, []);

  // const handleScroll = useCallback(
  //   throttle((e: UIEvent<HTMLDivElement>) => {
  //     if (e.currentTarget) setNowScrollY(e.currentTarget?.scrollTop);
  //   }, 50),
  //   [],
  // );

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (e.currentTarget) setNowScrollY(e.currentTarget.scrollTop);
  };

  console.log(nowScrollY, windowHeight);

  return (
    <>
      <div className={'overflow'} ref={wrapperRef} onScroll={handleScroll}>
        <div className={'card-wrapper'}>
          {randomCards.map((card, index) => {
            return (
              <div key={index} className={'card-item'}>
                {nowScrollY < 200 * (index + 3) && nowScrollY > 200 * (index - 3) ? card : '-'}
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .overflow {
          height: 500px;
          overflow-y: auto;
        }

        .card-wrapper {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .card-item {
          height: 200px;
          width: 100%;
          background: ${Color.SB140};
        }
      `}</style>
    </>
  );
}
