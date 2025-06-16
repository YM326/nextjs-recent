'use client';

import { useQueryGetUserInfo } from '@hooks/queries/user/useQueryGetUserInfo';
import Carousel from '@components/common/carousel';

export default function TestView() {
  const { data: userInfo } = useQueryGetUserInfo();

  return (
    <>
      <span>{userInfo?.firstName}</span>
      <span>{userInfo?.lastName}</span>
      <Carousel>
        <div>abc</div>
        <div>efg</div>
      </Carousel>
    </>
  );
}
