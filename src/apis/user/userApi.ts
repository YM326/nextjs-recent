import { UserInfo } from '@defines/user/userDefines';

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await fetch(`/api/user`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (err) {
    console.error(err);
  }

  throw 'Failed to fetch user info';
};
