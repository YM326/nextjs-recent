'use client';

import { LayoutDefines } from '@defines/layoutDefines';
import { commonFont } from '@utils/font';
import { useRouter } from 'next/navigation';
import { Color } from '@defines/common/color';

const snbItems = [
  {
    title: 'Home',
    href: '/',
    name: '홈',
  },
  {
    title: 'Study',
    href: '/study',
    name: '스터디',
  },
  {
    title: 'etc',
    href: '/etc',
    name: '이것저것',
  },
];

export default function HomeSnb() {
  const router = useRouter();

  const handleClickSnbItem = (href: string) => {
    router.push(href);
  };

  return (
    <>
      <aside>
        <ul>
          {snbItems.map((snbItem) => {
            return (
              <li key={snbItem.title} onClick={() => handleClickSnbItem(snbItem.href)}>
                {snbItem.name}
              </li>
            );
          })}
        </ul>
      </aside>
      <style jsx>{`
        aside {
          position: fixed;
          top: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: ${LayoutDefines.SIDEBAR_WIDTH}px;
          border-left: 1px solid rgba(0, 0, 0, 0.1);
          padding: 100px 30px;
          background: ${Color.WHITE};
        }

        ul {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        li {
          ${commonFont('20px', 700)}
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
