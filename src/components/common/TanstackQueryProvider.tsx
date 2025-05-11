'use client';

import { PropsWithChildren, useState } from 'react';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useErrorStore } from '@stores/errorStore';

type TanstackQueryProviderProps = PropsWithChildren;

export default function TanstackQueryProvider({ children }: TanstackQueryProviderProps) {
  const { setErrorString } = useErrorStore();

  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
      queryCache: new QueryCache({
        onError: async (error: Error) => {
          // TODO React Query 전역 에러 핸들링 추가
          console.error(error);
        },
      }),
      mutationCache: new MutationCache({
        onError: async (error: Error) => {
          // TODO React Query 전역 에러 핸들링 추가
          console.error(error);
        },
      }),
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
