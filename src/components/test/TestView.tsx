'use client';

import { useQueryGetUserInfo } from '@hooks/queries/user/useQueryGetUserInfo';

export default function TestView() {
  const { data: userInfo } = useQueryGetUserInfo();

  return (
    <>
      <span>{userInfo?.firstName}</span>
      <span>{userInfo?.lastName}</span>
    </>
  );
}
