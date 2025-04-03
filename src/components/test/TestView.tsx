'use client';

import { useEffect, useState } from 'react';
import { UserInfo } from '@defines/user/userDefines';

export default function TestView() {
  const [userInfo, setUserInfo] = useState<UserInfo>();

  // const { data: userInfo } = useQueryGetUserInfo();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/api`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      <span>{userInfo?.firstName}</span>
      <span>{userInfo?.lastName}</span>
    </>
  );
}
