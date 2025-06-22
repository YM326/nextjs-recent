import { LayoutDefines } from '@defines/layoutDefines';
import Link from 'next/link';
import { Color } from '@defines/common/color';
import { commonFont } from '@utils/font';

export default function HomeContentView() {
  return (
    <>
      <main>
        <div className={'link-wrapper'}>
          <Link href={'https://github.com/ym326'} target={'_blank'}>
            나의 Github
          </Link>
          <Link href={'https://github.com/YM326/nextjs-recent'} target={'_blank'}>
            현재 프로젝트 Github
          </Link>
        </div>
      </main>
      <style jsx>{`
        main {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin-right: ${LayoutDefines.SIDEBAR_WIDTH}px;

          .link-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;

            a {
              padding: 10px;
              border-radius: 3px;
              background: ${Color.KB10};
              ${commonFont('16px', 500)};
              color: ${Color.WHITE};
            }
          }
        }
      `}</style>
    </>
  );
}
