import { InfiniteData, useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { InfiniteInfoData } from '@components/study/infinite-scroll/infiniteDefines';
import { infiniteKeys } from '@hooks/queries/infinite/keys';
import { getInfiniteInfo } from '@apis/infinite/infiniteApi';

export const useInfiniteQueryGetRandomData = (
  options?: Omit<UseInfiniteQueryOptions<InfiniteInfoData, Error, InfiniteData<InfiniteInfoData>>, 'queryKey' | 'queryFn'>,
) => {
  return useInfiniteQuery<InfiniteInfoData, Error, InfiniteData<InfiniteInfoData>>({
    queryKey: infiniteKeys.getRandomData(),
    queryFn: async ({ pageParam = 1 }) => getInfiniteInfo(Number(pageParam)),
    ...options,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });
};
