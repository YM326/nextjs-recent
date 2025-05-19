import './globals.css';
import './ui.common.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import TanstackQueryProvider from '@components/common/TanstackQueryProvider';
import StyledJsxRegistry from '@components/common/StyledRegistry';
import MswComponent from '@components/common/MswComponent';
import HomeSnb from '@components/home/HomeSnb';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'YM',
  description: 'For Me',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={`${pretendard.variable}`}>
        <TanstackQueryProvider>
          <StyledJsxRegistry>
            <MswComponent>
              {children}
              <HomeSnb />
            </MswComponent>
          </StyledJsxRegistry>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
