import { getUser } from '@/actions/getUser';
import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';

interface IUser {
  id: string;
  username: string;
  picture?: string;
}

export const useUser = () => {
  const [cookies] = useCookies(['token']);

  const [userId, setUserId] = useState<IUser | undefined>(undefined);

  const [user, setUser] = useState<IUser | undefined>(undefined);

  const { data } = useQuery({
    queryKey: ['user', userId],
    queryFn: ({ queryKey }) => getUser({ userId: queryKey[1] as string }),
    enabled: !!userId,
    refetchInterval: 60000,
  });

  useEffect(() => {
    if (cookies.token) {
      const tokenData: any = jwt.verify(
        cookies.token,
        process.env.NEXT_PUBLIC_JWT_SECRET as string
      );

      if (tokenData.id) {
        setUserId(tokenData.id);
      }
    }
  }, [cookies.token]);

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data]);

  return { user } as const;
};
