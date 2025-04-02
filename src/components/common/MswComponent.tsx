'use client';

import { PropsWithChildren, useEffect } from 'react';

async function startClientMSW() {
  if (typeof window !== 'undefined') {
    const worker = await import('../../utils/mocks/browser').then((res) => res.browser);
    worker.start({});
  }
}

export default function MswComponent({ children }: PropsWithChildren) {
  // const [mswReady, setMswReady] = useState(false);
  //
  // useEffect(() => {
  //   const init = async () => {
  //     const initMsw = await import('../../utils/mocks/init').then((res) => res.init);
  //     await initMsw();
  //     setMswReady(true);
  //   };
  //
  //   if (!mswReady) {
  //     init();
  //   }
  // }, [mswReady]);

  useEffect(() => {
    startClientMSW();
  }, []);

  return <>{children}</>;
}
