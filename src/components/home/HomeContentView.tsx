import { LayoutDefines } from '@defines/layoutDefines';
import { Button } from '@components/common/button/Button';

export default function HomeContentView() {
  return (
    <>
      <main>
        <Button variant={'dark'} buttonSize={'big'}>
          뻐튼
        </Button>
      </main>
      <style jsx>{`
        main {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin-left: ${LayoutDefines.SIDEBAR_WIDTH}px;
        }
      `}</style>
    </>
  );
}
