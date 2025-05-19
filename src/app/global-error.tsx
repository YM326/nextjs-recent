'use client';

import NextError from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({ error, params: { lng } }: { error: Error & { digest?: string }; params: { lng: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang={lng}>
      <body>
        <NextError statusCode={undefined as any} />
      </body>
    </html>
  );
}
