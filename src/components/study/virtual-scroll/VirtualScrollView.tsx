'use client';

import { useCallback, useEffect, useState } from 'react';
import { DebouncedFunc, throttle } from 'lodash-es';

export default function VirtualScrollView() {
  const [nowScrollY, setNowScrollY] = useState(0);

  const onScroll = useCallback<DebouncedFunc<() => void>>(
    throttle(() => {
      setNowScrollY(window.scrollY);
    }, 300) as DebouncedFunc<() => void>,
    [],
  );

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <div className={'test'}>abcd</div>
      <style jsx>{`
        .test {
          height: 2000px;
        }
      `}</style>
    </>
  );
}
