import { LayoutDefines } from '@defines/layoutDefines';

export default function HomeContentView() {
  return (
    <>
      <main>메인</main>
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
