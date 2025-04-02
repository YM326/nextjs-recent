'use client';

import { PropsWithChildren } from 'react';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type TanstackQueryProviderProps = PropsWithChildren;

const queryClient = new QueryClient({
  defaultOptions: {
    // react-query 전역 설정
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({ onError: (error: Error) => console.error(error) }),
  mutationCache: new MutationCache({ onError: (error: Error) => console.error(error) }),
});

export default function TanstackQueryProvider({ children }: TanstackQueryProviderProps) {
  // const [client] = useState(
  //   new QueryClient({
  //     defaultOptions: {
  //       // react-query 전역 설정
  //       queries: {
  //         refetchOnWindowFocus: false,
  //         retry: false,
  //       },
  //     },
  //   }),
  // );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
