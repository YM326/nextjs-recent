export interface StudyInfo {
  title: string;
  description: string;
  href: string;
}

export const studyDefines: StudyInfo[] = [
  {
    title: 'Timer',
    description: '타이머를 워커를 이용하여 구현한 예시',
    href: '/timer',
  },
  {
    title: 'Editor',
    description: '커스텀 에디터 구현한 예시',
    href: '/editor',
  },
  {
    title: 'Carousel',
    description: '캐러셀 구현한 예시',
    href: '/carousel',
  },
  {
    title: 'Virtual Scroll',
    description: '가상 스크롤 예시',
    href: '/virtual-scroll',
  },
  {
    title: 'Test',
    description: '테스트를 위한 페이지',
    href: '/test',
  },
];
