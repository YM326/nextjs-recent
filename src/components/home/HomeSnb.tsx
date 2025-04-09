import { LayoutDefines } from '@defines/layoutDefines';

export default function HomeSnb() {
  return (
    <>
      <aside>
        <ul>
          <li>스터디?</li>
          <li>이것저것</li>
        </ul>
      </aside>
      <style jsx>{`
        aside {
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: ${LayoutDefines.SIDEBAR_WIDTH}px;
          border-right: 1px solid rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
}
