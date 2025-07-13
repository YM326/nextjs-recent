'use client';

import { useInfiniteQueryGetRandomData } from '@hooks/queries/infinite/useInfiniteQueryGetRandomData';
import { Fragment, useCallback, useMemo } from 'react';
import { Color } from '@defines/common/color';
import { Button } from '@components/common/button/Button';

export default function InfiniteScrollView() {
  const { data, hasNextPage, fetchNextPage, isPending } = useInfiniteQueryGetRandomData();
  const infiniteInfos = useMemo(() => data?.pages?.flatMap((pageData) => pageData.data) || [], [data]);

  const handleClickMoreLoad = useCallback(async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  return (
    <>
      <div className={'infinite-items-wrapper'}>
        {infiniteInfos.map((infiniteInfo) => {
          return (
            <div className={'item'} key={infiniteInfo.id}>
              {`${infiniteInfo.id}-${infiniteInfo.count}`}
            </div>
          );
        })}
      </div>
      <Button onClick={handleClickMoreLoad}>더보기</Button>
      <style jsx>{`
        .infinite-items-wrapper {
          width: 300px;
          overflow: auto;

          .item {
            border: 1px solid ${Color.CG50};
            padding: 30px 30px;
          }
        }
      `}</style>
    </>
  );
}
