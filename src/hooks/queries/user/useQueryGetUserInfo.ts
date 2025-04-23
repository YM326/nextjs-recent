import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { userKeys } from '@hooks/queries/user/keys';
import { UserInfo } from '@defines/user/userDefines';
import { getUserInfo } from '@apis/user/userApi';

export const useQueryGetUserInfo = (options?: Omit<UseQueryOptions<UserInfo, Error>, 'queryKey' | 'queryFn'>) => {
  return useQuery<UserInfo, Error, UserInfo>({
    queryKey: userKeys.getUserInfo(),
    queryFn: () => getUserInfo(),
    ...options,
  });
};
