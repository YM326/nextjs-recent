'use client';

import { ReactNode, useEffect, useState } from 'react';

interface MswComponentProps {
  children: ReactNode;
}

export default function MswComponent({ children }: MswComponentProps) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const init = async () => {
        const { browser } = await import('../../mocks/browser');
        await browser.start();
        setMswReady(true);
      };

      if (!mswReady) {
        init();
      }
    } else {
      setMswReady(true);
    }
  }, [mswReady]);

  if (!mswReady) {
    return null;
  }

  return <>{children}</>;
}
