'use client';

import { studyDefines } from '@components/study/studyDefines';
import StudyItem from '@components/study/StudyItem';

export default function StudyView() {
  return (
    <>
      <div className={'study-view-wrapper'}>
        <section>
          {studyDefines.map((studyItem) => {
            return <StudyItem key={studyItem.title} {...studyItem} />;
          })}
        </section>
      </div>
      <style jsx>{`
        .study-view-wrapper {
          padding: 50px 100px;

          section {
            display: flex;
            flex-direction: column;
            gap: 5px;
            overflow-y: auto;
            height: 100%;
          }
        }
      `}</style>
    </>
  );
}
