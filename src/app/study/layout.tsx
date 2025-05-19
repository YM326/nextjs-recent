'use client';

import { ReactNode } from 'react';
import { LayoutDefines } from '@defines/layoutDefines';

export default function StudyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <style jsx>{`
        main {
          height: 100vh;
          margin-right: ${LayoutDefines.SIDEBAR_WIDTH}px;
        }
      `}</style>
    </>
  );
}
