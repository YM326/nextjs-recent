import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { userKeys } from '@hooks/queries/user/keys';
// import { ErrorResponse } from '@defines/common/errorResponse';
// import { MemberResponseResultWithGrade } from '@apis/member';
// import { memberKeys } from '@hooks/queries/member/keys';
//
// export type UseQueryGetMemberParams = UseQueryParams<MemberResponseResultWithGrade, ErrorResponse>;
//
// export default function useQueryGetMember(params: UseQueryGetMemberParams) {
//   const { queryOption } = params;
//
//   const getMember = async () => (await member.findMember()).data;
//
//   return useQuery({
//     queryKey: memberKeys.getMemberInfo(),
//     queryFn: getMember,
//     ...queryOption,
//   });
// }

export const useQueryGetUserInfo = (options?: UseQueryOptions) => {
  return useQuery({
    queryKey: userKeys.getUserInfo(),
    queryFn: async () => {
      const response = await fetch(`https://api.example.com/user`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    ...options,
  });
};
